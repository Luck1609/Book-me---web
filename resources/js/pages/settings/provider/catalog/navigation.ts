import { HandPlatter, SlidersHorizontal } from "lucide-react";
import settings from "@/routes/settings";

export enum CatalogPageEnum {
  Categories = 'categories',
  Services = 'services'
}

export const catalogLayoutProps = {
  classNames: {
    aside: "h-36"
  },
  navList: [
    {
      label: "Categories",
      icon: SlidersHorizontal,
      url: settings.catalog.index({
        query: {
          target: CatalogPageEnum.Categories
        }
      }).url
    },
    {
      label: "Services",
      icon: HandPlatter,
      url: settings.catalog.index({
        query: {
          target: CatalogPageEnum.Services
        }
      }).url
    },
  ],
}
