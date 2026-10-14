import { Head, useForm } from '@inertiajs/react';
import { Bell, BellRing, CalendarCheck, Check, Clock3, HeartHandshake, Mail, MessageCircle, Repeat2, Smartphone, Users } from 'lucide-react';

import SubmitButton from '@/components/form/submit-button';
import { Textarea } from '@/components/form/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import settings from '@/routes/settings';
import { notificationLayoutProps } from './navigation';

type DeliveryChannel = 'email' | 'sms' | 'whatsapp' | 'push' | 'in_app';
type Automation = { id: string; key: string; title: string; description: string; timing: string; message: string; enabled: boolean; channels: DeliveryChannel[] };
type Group = { category: string; items: Automation[] };
type Props = { automations?: Group[] };
const icons = [Bell, CalendarCheck, Clock3, Users, Repeat2, HeartHandshake, MessageCircle];
const deliveryChannels: { key: DeliveryChannel; label: string; icon: typeof Mail }[] = [
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'sms', label: 'SMS', icon: Smartphone },
  { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { key: 'push', label: 'Push', icon: BellRing },
  { key: 'in_app', label: 'In-app', icon: Bell },
];

function AutomationCard({ automation, index }: { automation: Automation; index: number }) {
  const form = useForm({ enabled: automation.enabled, message: automation.message, channels: automation.channels });
  const Icon = icons[index % icons.length];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.put(settings.notifications.update(automation.id).url, { preserveScroll: true });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col rounded-2xl border border-[#dceae4] bg-white p-5 shadow-[0_8px_25px_rgba(23,52,60,0.04)] dark:border-white/10 dark:bg-[#17221f]">
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#f0edff] text-[#6559c5] dark:bg-[#6559c5]/15 dark:text-[#c0b8ec]"><Icon aria-hidden="true" className="size-5" /></span>
        <Switch aria-label={`${form.data.enabled ? 'Disable' : 'Enable'} ${automation.title}`} checked={form.data.enabled} onCheckedChange={(enabled) => form.setData('enabled', enabled)} />
      </div>
      <h3 className="mt-5 text-sm font-bold text-[#17343c] dark:text-white">{automation.title}</h3>
      <p className="mt-2 min-h-10 text-xs leading-5 text-[#70908a] dark:text-[#9cb8b1]">{automation.description}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-[#41645a] dark:text-[#c4d8d1]"><Clock3 aria-hidden="true" className="size-3.5" />{automation.timing}</div>
      <div className={cn('mt-5 space-y-3 border-t border-[#e7f0ec] pt-4 dark:border-white/8', !form.data.enabled && 'opacity-75')}>
        <Textarea form={form} name="message" label="Message to clients" rows={4} maxLength={2000} disabled={!form.data.enabled} placeholder="Write the message your clients should receive..." />
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#70908a] dark:text-[#9cb8b1]">Delivery channels</p>
          <div className="flex flex-wrap gap-2">
            {deliveryChannels.map(({ key, label, icon: ChannelIcon }) => {
              const selected = form.data.channels.includes(key);

              return <button key={key} type="button" disabled={!form.data.enabled} onClick={() => form.setData('channels', selected ? form.data.channels.filter((channel) => channel !== key) : [...form.data.channels, key])} className={cn('flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors', selected ? 'border-[#0f8a62] bg-[#e9f8f0] text-[#0f6b4d] dark:bg-[#0f8a62]/15 dark:text-[#8fe0bb]' : 'border-[#dceae4] text-[#70908a] dark:border-white/10 dark:text-[#9cb8b1]')}><ChannelIcon aria-hidden="true" className="size-3.5" />{label}</button>;
            })}
          </div>
          <SubmitButton form={form} label="Save" size="sm" className="rounded-lg bg-[#0f8a62] text-white hover:bg-[#0b7653]" />
        </div>
        {form.recentlySuccessful && <p className="flex items-center gap-1 text-xs font-medium text-[#0f8a62] dark:text-[#8fe0bb]"><Check aria-hidden="true" className="size-3.5" /> Saved</p>}
      </div>
    </form>
  );
}

export default function Automation({ automations = [] }: Props) {
  const enabledCount = automations.flatMap((group) => group.items).filter((item) => item.enabled).length;

  return (
    <><Head title="Automations" /><div className="space-y-8">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold tracking-[0.16em] text-[#0f8a62] uppercase dark:text-[#8fe0bb]">Client experience</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-[#17343c] dark:text-white">Automations</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#70908a] dark:text-[#9cb8b1]">Keep clients informed at the moments that matter. Turn on an automation, choose one or more delivery channels, and tailor the message they receive.</p></div><div className="flex items-center gap-2 rounded-xl bg-[#f4fbf7] px-4 py-3 text-xs font-semibold text-[#0f6b4d] dark:bg-[#0f8a62]/10 dark:text-[#8fe0bb]"><Check aria-hidden="true" className="size-4" />{enabledCount} active</div></header>
      <section className="flex items-start gap-3 rounded-2xl border border-[#d9d4ff] bg-[#f7f5ff] p-4 text-sm text-[#51499a] dark:border-[#6559c5]/30 dark:bg-[#6559c5]/10 dark:text-[#c0b8ec]"><MessageCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" /><p>Use <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">{'{client_name}'}</code>, <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">{'{appointment_date}'}</code>, and other placeholders to personalize messages automatically.</p></section>
      <div className="space-y-8">{automations.map((group) => <section key={group.category}><div className="mb-4"><h2 className="text-lg font-bold text-[#17343c] dark:text-white">{group.category}</h2><p className="mt-1 text-sm text-[#70908a] dark:text-[#9cb8b1]">Messages triggered by your clients’ activity.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{group.items.map((automation, index) => <AutomationCard key={automation.key} automation={automation} index={index} />)}</div></section>)}</div>
    </div></>
  );
}

Automation.layout = { ...notificationLayoutProps };
