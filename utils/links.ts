import {
  Kanban,
  Contact,
  MapPinHouse,
  House,
  // Info,
  BanknoteArrowUp,
  AppWindow,
} from "lucide-react";

import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";

export const EspacesLinks = [
  {
    label: "Accueil",
    link: "/",
    icon: House,
  },

  {
    label: "Espace",
    link: "/espace",
    icon: Kanban,
  },

  {
    label: "Zones",
    link: "/espace/zones",
    icon: MapPinHouse,
  },

  {
    label: "Tarifs",
    link: "/espace/tarifs",
    icon: BanknoteArrowUp,
  },

  {
    label: "Contacts",
    link: "/espace/contacts",
    icon: Contact,
  },
];

export const HomeLinks = [
  {
    label: "Accueil",
    link: "/",
    icon: House,
  },
  {
    label: "Tarifs",
    link: "/tarifs",
    icon: RiMoneyDollarBoxLine,
  },
  {
    label: "Espace",
    link: "/espace",
    icon: Kanban,
  },

  {
    label: "API et integration",
    link: "integration",
    icon: AppWindow,
  },

  {
    label: "Nos solutions",
    link: "https://servi-group.vercel.app",
    icon: MdOutlineHomeRepairService,
  },

  // {
  //   label: "A propos",
  //   link: "/a-propos",
  //   icon: Info,
  // },

  {
    label: "Contacts",
    link: "#contact",
    icon: Contact,
  },
];
