import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const key = import.meta.env.VITE_PUSHER_APP_KEY;
const csrfToken =
  typeof document === 'undefined'
    ? null
    : document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');

export const echo = key
  ? new Echo({
      broadcaster: 'pusher',
      key,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      client: new Pusher(key, {
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: '/broadcasting/auth',
        auth: {
          headers: {
            'X-CSRF-TOKEN': csrfToken ?? '',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      }),
    })
  : null;
