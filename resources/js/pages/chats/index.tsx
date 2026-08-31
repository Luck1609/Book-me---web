import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, MessageCircle, Send, Wifi, WifiOff } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
  store,
  show,
  storeMessage,
} from '@/actions/App/Http/Controllers/ChatController';
import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import { echo } from '@/lib/echo';

type Conversation = {
  id: string;
  name: string;
  initials: string;
  last_message: string | null;
  last_message_at: string | null;
  provider_profile_id: string;
  client_id: string;
};

type Message = {
  id: string;
  body: string;
  sender_id: string;
  sender_name: string;
  created_at: string | null;
};

type Contact = {
  id: string;
  name: string;
  subtitle: string;
  provider_profile_id: string;
  client_id: string;
  conversation_id?: string;
};

type ChatPageProps = {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  contacts: Contact[];
  realtimeEnabled: boolean;
};

type StartConversationData = {
  provider_profile_id: string;
  client_id: string | null;
};

type MessageFormData = {
  body: string;
};

type BroadcastMessage = {
  message: Message;
};

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatTime(value: string | null): string {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-GH', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatDate(value: string | null): string {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-GH', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

export default function ChatsIndex({
  conversations,
  activeConversation,
  messages: initialMessages,
  contacts,
  realtimeEnabled,
}: ChatPageProps) {
  const { user } = usePage().props as { user?: { id: string | number } };
  const currentUserId = String(user?.id ?? '');
  const [messageState, setMessageState] = useState({
    conversationId: activeConversation?.id ?? null,
    messages: initialMessages,
  });
  const messageListRef = useRef<HTMLDivElement>(null);
  const messageForm = useForm<MessageFormData>({ body: '' });
  const startForm = useForm<StartConversationData>({
    provider_profile_id: '',
    client_id: null,
  });
  const activeConversationId = activeConversation?.id;
  const messages =
    messageState.conversationId === activeConversationId
      ? messageState.messages
      : initialMessages;
  const conversationIds = useMemo(
    () => new Set(conversations.map((conversation) => conversation.id)),
    [conversations],
  );

  // Keep useForm out: its object identity changes on every render.
  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    messageForm.reset();
    messageForm.withPrecognition(storeMessage(activeConversationId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversationId]);

  useEffect(() => {
    const activeEcho = echo;

    if (!activeConversationId || !activeEcho) {
      return;
    }

    activeEcho
      .private(`chat.${activeConversationId}`)
      .listen('.message.sent', (event: BroadcastMessage) => {
        setMessageState((currentState) => {
          const currentMessages =
            currentState.conversationId === activeConversationId
              ? currentState.messages
              : initialMessages;

          return currentMessages.some(
            (message) => message.id === event.message.id,
          )
            ? currentState
            : {
                conversationId: activeConversationId,
                messages: [...currentMessages, event.message],
              };
        });
      });

    return () => {
      activeEcho.leave(`chat.${activeConversationId}`);
    };
  }, [activeConversationId, initialMessages]);

  useEffect(() => {
    const messageList = messageListRef.current;

    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages.length, activeConversationId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeConversationId || !messageForm.data.body.trim()) {
      return;
    }

    messageForm.post(storeMessage.url(activeConversationId), {
      preserveScroll: true,
      onSuccess: (page) => {
        const nextMessages = (page.props as unknown as { messages?: Message[] })
          .messages;

        if (nextMessages) {
          setMessageState({
            conversationId: activeConversationId,
            messages: nextMessages,
          });
        }

        messageForm.reset();
      },
    });
  };

  const startConversation = (contact: Contact) => {
    if (
      contact.conversation_id &&
      conversationIds.has(contact.conversation_id)
    ) {
      router.visit(show(contact.conversation_id));

      return;
    }

    startForm.transform(() => ({
      provider_profile_id: contact.provider_profile_id,
      client_id: contact.client_id,
    }));
    startForm.post(store.url());
  };

  return (
    <>
      <Head title="Chats" />
      <main className="min-h-[calc(100vh-3rem)] bg-[#f6faf8] px-4 py-6 text-[#17343c] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#101917] dark:text-[#e6f1ed]">
        <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
          <section className="flex flex-col gap-5 rounded-3xl bg-[#17343c] px-6 py-7 text-white shadow-[0_20px_55px_rgba(23,52,60,0.14)] sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-[#8fe0bb] uppercase">
                <MessageCircle aria-hidden="true" className="size-4" />
                Direct conversations
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your chats
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8c9c7] sm:text-base">
                Keep every booking conversation in one calm, private place.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-[#d9f7e8] lg:self-auto">
              {realtimeEnabled && echo ? (
                <>
                  <Wifi aria-hidden="true" className="size-3.5" />
                  Live updates on
                </>
              ) : (
                <>
                  <WifiOff aria-hidden="true" className="size-3.5" />
                  Live updates unavailable
                </>
              )}
            </div>
          </section>

          <section className="grid min-h-[620px] overflow-hidden rounded-3xl border border-[#dceae4] bg-white shadow-[0_12px_35px_rgba(23,52,60,0.06)] lg:grid-cols-[320px_minmax(0,1fr)] dark:border-white/10 dark:bg-[#17221f]">
            <aside className="border-b border-[#e7f0ec] lg:border-r lg:border-b-0 dark:border-white/8">
              <div className="border-b border-[#e7f0ec] px-5 py-5 dark:border-white/8">
                <p className="text-xs font-bold tracking-[0.14em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">
                  Conversations
                </p>
                <p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">
                  {conversations.length} active thread
                  {conversations.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="max-h-[290px] overflow-y-auto p-3 lg:max-h-[390px]">
                {conversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href={show(conversation.id)}
                    className={`flex items-center gap-3 rounded-2xl p-3 transition ${activeConversationId === conversation.id ? 'bg-[#e9f8f0] dark:bg-[#0f8a62]/15' : 'hover:bg-[#f4fbf7] dark:hover:bg-white/5'}`}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#d9f7e8] text-sm font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]">
                      {conversation.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-bold text-[#17343c] dark:text-white">
                          {conversation.name}
                        </span>
                        <span className="shrink-0 text-[10px] text-[#91aaa2]">
                          {formatDate(conversation.last_message_at)}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-xs text-[#70908a] dark:text-[#9cb8b1]">
                        {conversation.last_message ?? 'Start a conversation'}
                      </span>
                    </span>
                  </Link>
                ))}
                {conversations.length === 0 && (
                  <div className="px-3 py-8 text-center">
                    <MessageCircle className="mx-auto size-7 text-[#0f8a62]" />
                    <p className="mt-3 text-sm font-bold text-[#17343c] dark:text-white">
                      No conversations yet
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
                      Choose someone below to start one.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-[#e7f0ec] p-4 dark:border-white/8">
                <p className="px-2 text-[10px] font-bold tracking-[0.14em] text-[#91aaa2] uppercase">
                  People you can message
                </p>
                <div className="mt-2 space-y-1">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => startConversation(contact)}
                      disabled={startForm.processing}
                      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[#f4fbf7] disabled:opacity-60 dark:hover:bg-white/5"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#f3f0ff] text-xs font-bold text-[#685bb4] dark:bg-[#685bb4]/15 dark:text-[#c0b8ec]">
                        {initials(contact.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-[#41645a] dark:text-[#c4d8d1]">
                          {contact.name}
                        </span>
                        <span className="block text-[11px] text-[#91aaa2]">
                          {contact.subtitle}
                        </span>
                      </span>
                    </button>
                  ))}
                  {contacts.length === 0 && (
                    <p className="px-2 py-3 text-xs leading-5 text-[#91aaa2]">
                      Your eligible booking relationships will appear here.
                    </p>
                  )}
                </div>
              </div>
            </aside>

            <div className="flex min-w-0 flex-col">
              {activeConversation ? (
                <>
                  <header className="flex items-center gap-3 border-b border-[#e7f0ec] px-5 py-4 sm:px-7 dark:border-white/8">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-[#d9f7e8] text-sm font-bold text-[#0f6b4d] dark:bg-[#0f8a62]/20 dark:text-[#8fe0bb]">
                      {activeConversation.initials}
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-bold text-[#17343c] dark:text-white">
                        {activeConversation.name}
                      </h2>
                      <p className="text-xs text-[#70908a] dark:text-[#9cb8b1]">
                        Private conversation
                      </p>
                    </div>
                  </header>

                  <div
                    ref={messageListRef}
                    className="flex min-h-[390px] flex-1 flex-col gap-4 overflow-y-auto bg-[#fbfefc] px-5 py-6 sm:px-7 dark:bg-[#14201d]"
                  >
                    {messages.length > 0 ? (
                      messages.map((message) => {
                        const isMine = message.sender_id === currentUserId;

                        return (
                          <div
                            key={message.id}
                            className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[min(75%,520px)] ${isMine ? 'items-end' : 'items-start'} flex flex-col gap-1`}
                            >
                              <div
                                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${isMine ? 'rounded-br-md bg-[#0f8a62] text-white' : 'rounded-bl-md border border-[#e7f0ec] bg-white text-[#41645a] dark:border-white/8 dark:bg-[#1c2c27] dark:text-[#c4d8d1]'}`}
                              >
                                {message.body}
                              </div>
                              <span className="px-1 text-[10px] text-[#91aaa2]">
                                {isMine ? 'You' : message.sender_name} ·{' '}
                                {formatTime(message.created_at)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="m-auto max-w-sm px-6 text-center">
                        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                          <MessageCircle className="size-5" />
                        </span>
                        <p className="mt-4 text-sm font-bold text-[#17343c] dark:text-white">
                          Start the conversation
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">
                          Send a note about an appointment, a service, or
                          anything your partner needs to know.
                        </p>
                      </div>
                    )}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="border-t border-[#e7f0ec] bg-white p-4 sm:p-5 dark:border-white/8 dark:bg-[#17221f]"
                  >
                    <div className="flex items-end gap-3">
                      <Textarea
                        name="body"
                        form={messageForm}
                        rows={2}
                        placeholder="Write a message..."
                        aria-label="Message"
                        classNames={{ wrapper: 'flex-1', error: 'px-1' }}
                        className="min-h-12 resize-none rounded-2xl border-[#dceae4] bg-[#fbfefc] py-3 dark:border-white/10 dark:bg-[#14201d]"
                      />
                      <SubmitButton
                        form={messageForm}
                        label={<Send aria-hidden="true" className="size-4" />}
                        aria-label="Send message"
                        className="size-12 shrink-0 rounded-2xl bg-[#0f8a62] p-0 text-white hover:bg-[#0d7955]"
                        isIconButton
                      />
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center p-8 text-center">
                  <div className="max-w-sm">
                    <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#d9f7e8] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]">
                      <MessageCircle className="size-6" />
                    </span>
                    <h2 className="mt-5 text-lg font-bold text-[#17343c] dark:text-white">
                      Your conversations live here
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">
                      Select a conversation or choose a contact to begin.
                    </p>
                    <Link
                      href="/dashboard"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0f8a62]"
                    >
                      <ArrowLeft className="size-4" />
                      Back to dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
