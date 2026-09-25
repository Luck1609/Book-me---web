<?php

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function (User $user, string $id): bool {
    return $user->id === $id;
});

Broadcast::channel('chat.{conversation}', function (User $user, string $conversation): bool {
    $chat = Conversation::find($conversation);

    return $chat !== null && $user->can('view', $chat);
});
