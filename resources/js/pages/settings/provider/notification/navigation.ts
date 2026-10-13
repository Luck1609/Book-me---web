import { MailClock, NotebookPen } from "lucide-react";
import settings from "@/routes/settings";


export enum NotificationLayoutEnum {
  Automation = 'automation',
  Booking = 'booking'
}



export const notificationLayoutProps = {
  classNames: {
    aside: 'h-32',
  },
  navList: [
    {
      label: 'Booking',
      icon: NotebookPen,
      url: settings.notifications.index({
        query: {
          target: NotificationLayoutEnum.Booking
        }
      }).url,
    },
    {
      label: 'Automation',
      icon: MailClock,
      url: settings.notifications.index({
        query: {
          target: NotificationLayoutEnum.Automation
        }
      }).url,
    },
  ],
}
