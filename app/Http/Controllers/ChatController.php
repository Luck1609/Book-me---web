<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\StartConversationRequest;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\ProviderProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(Request $request): Response
    {
        return $this->render($request, null);
    }

    public function show(Request $request, Conversation $conversation): Response
    {
        Gate::authorize('view', $conversation);

        return $this->render($request, $conversation);
    }

    public function store(StartConversationRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();
        Gate::authorize('create', Conversation::class);
        $data = $request->validated();
        $providerProfile = ProviderProfile::query()->findOrFail($data['provider_profile_id']);

        if ($user->hasRole('client')) {
            abort_unless($this->clientCanContact($user, $providerProfile), 403);
            $clientId = $user->id;
        } else {
            $providerProfile = $user->providerProfile()->firstOrFail();
            $clientId = $data['client_id'] ?? null;
            abort_unless($clientId !== null && $this->providerCanContact($providerProfile, $clientId), 403);
        }

        $conversation = Conversation::query()->firstOrCreate([
            'provider_profile_id' => $providerProfile->id,
            'client_id' => $clientId,
        ]);

        return to_route('chats.show', $conversation);
    }

    public function storeMessage(StoreMessageRequest $request, Conversation $conversation): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();
        $body = trim($request->validated('body'));

        Gate::authorize('send', $conversation);

        $message = $conversation->messages()->create([
            'sender_id' => $user->id,
            'body' => $body,
        ]);

        $conversation->update(['last_message_at' => $message->created_at]);
        broadcast(new MessageSent($message))->toOthers();

        return to_route('chats.show', $conversation);
    }

    private function render(Request $request, ?Conversation $conversation): Response
    {
        /** @var User $user */
        $user = $request->user();
        Gate::authorize('viewAny', Conversation::class);

        $conversations = $this->conversationQuery($user)
            ->with([
                'client:id,name',
                'providerProfile:id,user_id,business_name',
                'latestMessage',
            ])
            ->latest('last_message_at')
            ->latest()
            ->get();

        $activeConversation = $conversation ?? $conversations->first();

        if ($activeConversation !== null) {
            Gate::authorize('view', $activeConversation);
            $activeConversation->load([
                'client:id,name',
                'providerProfile:id,user_id,business_name',
                'latestMessage',
                'messages' => fn ($query) => $query
                    ->with('sender:id,name')
                    ->latest()
                    ->limit(100),
            ]);
        }

        $conversationIds = $conversations->keyBy(function (Conversation $item) use ($user): string {
            return $user->hasRole('service_provider')
                ? (string) $item->client_id
                : (string) $item->provider_profile_id;
        });

        return Inertia::render('chats/index', [
            'conversations' => $conversations->map(fn (Conversation $item): array => $this->conversationData($item, $user))->values()->all(),
            'activeConversation' => $activeConversation ? $this->conversationData($activeConversation, $user) : null,
            'messages' => $activeConversation
                ? $activeConversation->messages->sortBy('created_at')->values()->map(fn (Message $message): array => $this->messageData($message))->all()
                : [],
            'contacts' => $this->contacts($user, $conversationIds),
            'realtimeEnabled' => filled(config('broadcasting.connections.pusher.key')),
        ]);
    }

    /** @return Builder<Conversation> */
    private function conversationQuery(User $user): Builder
    {
        if ($user->hasRole('service_provider')) {
            $providerProfile = $user->providerProfile()->firstOrFail();

            return Conversation::query()->whereBelongsTo($providerProfile, 'providerProfile');
        }

        return Conversation::query()->whereBelongsTo($user, 'client');
    }

    /** @return array<string, mixed> */
    private function conversationData(Conversation $conversation, User $user): array
    {
        $isProvider = $user->hasRole('service_provider');
        $name = $isProvider
            ? $conversation->client?->name
            : $conversation->providerProfile?->business_name;

        return [
            'id' => $conversation->id,
            'name' => $name ?? 'Conversation',
            'initials' => $this->initials($name ?? 'Conversation'),
            'last_message' => $conversation->latestMessage?->body,
            'last_message_at' => $conversation->last_message_at?->toIso8601String(),
            'provider_profile_id' => $conversation->provider_profile_id,
            'client_id' => $conversation->client_id,
        ];
    }

    /** @return array<string, mixed> */
    private function messageData(Message $message): array
    {
        return [
            'id' => $message->id,
            'body' => $message->body,
            'sender_id' => $message->sender_id,
            'sender_name' => $message->sender?->name ?? 'User',
            'created_at' => $message->created_at?->toIso8601String(),
        ];
    }

    /** @return array<int, array<string, mixed>> */
    private function contacts(User $user, $conversationIds): array
    {
        if ($user->hasRole('service_provider')) {
            $providerProfile = $user->providerProfile()->firstOrFail();
            $clients = User::query()
                ->where(function (Builder $query) use ($providerProfile): void {
                    $query
                        ->whereHas('clientProviders', fn (Builder $providerQuery) => $providerQuery->whereKey($providerProfile->id))
                        ->orWhereHas('bookings', fn (Builder $bookingQuery) => $bookingQuery->whereBelongsTo($providerProfile, 'providerProfile'));
                })
                ->select(['id', 'name'])
                ->orderBy('name')
                ->get();

            return $clients->map(fn (User $client): array => [
                'id' => $client->id,
                'name' => $client->name,
                'subtitle' => 'Client',
                'provider_profile_id' => $providerProfile->id,
                'client_id' => $client->id,
                'conversation_id' => $conversationIds->get($client->id)?->id,
            ])->all();
        }

        $providers = ProviderProfile::query()
            ->where(function (Builder $query) use ($user): void {
                $query
                    ->whereHas('clients', fn (Builder $clientQuery) => $clientQuery->whereKey($user->id))
                    ->orWhereHas('bookings', fn (Builder $bookingQuery) => $bookingQuery->whereBelongsTo($user));
            })
            ->select(['id', 'business_name'])
            ->orderBy('business_name')
            ->get();

        return $providers->map(fn (ProviderProfile $provider): array => [
            'id' => $provider->id,
            'name' => $provider->business_name,
            'subtitle' => 'Provider',
            'provider_profile_id' => $provider->id,
            'client_id' => $user->id,
            'conversation_id' => $conversationIds->get($provider->id)?->id,
        ])->all();
    }

    private function clientCanContact(User $client, ProviderProfile $providerProfile): bool
    {
        return $providerProfile->clients()->whereKey($client->id)->exists()
            || $providerProfile->bookings()->whereBelongsTo($client)->exists();
    }

    private function providerCanContact(ProviderProfile $providerProfile, string $clientId): bool
    {
        return $providerProfile->clients()->whereKey($clientId)->exists()
            || $providerProfile->bookings()->where('user_id', $clientId)->exists();
    }

    private function initials(string $name): string
    {
        return collect(explode(' ', $name))
            ->filter()
            ->map(fn (string $part): string => strtoupper($part[0]))
            ->take(2)
            ->implode('');
    }
}
