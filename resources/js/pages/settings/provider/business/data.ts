import { CalendarClock, ClockAlert, Landmark, MapPin } from "lucide-react";
import settings from "@/routes/settings";
import { BusinessProfileRoutes } from "@/types/enums";

export const businessData = {
  classNames: {
    aside: "h-60"
  },
  navList: [
    {
      label: "Business details",
      icon: Landmark,
      url: settings.businessProfile.edit(BusinessProfileRoutes.Details).url
    },
    {
      label: "Business location",
      icon: MapPin,
      url: settings.businessProfile.edit(BusinessProfileRoutes.Location).url
    },
    {
      label: "Opening hours",
      icon: CalendarClock,
      url: settings.businessProfile.edit(BusinessProfileRoutes.OpeningHours).url
    },
    {
      label: "Break & time off",
      icon: ClockAlert,
      url: settings.businessProfile.edit(BusinessProfileRoutes.Breaks).url
    },
  ],
};
