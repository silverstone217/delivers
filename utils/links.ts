import {
  Kanban,
  Contact,
  MapPinHouse,
  House,
  BanknoteArrowUp,
  AppWindow,
  Users,
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
    label: "API",
    link: "integration/credentials",
    icon: AppWindow,
  },

  {
    label: "Nos solutions",
    link: "https://servi-group.vercel.app",
    icon: MdOutlineHomeRepairService,
  },

  {
    label: "Contacts",
    link: "#contact",
    icon: Contact,
  },
];

export const AdminsLinks = [
  {
    label: "Accueil",
    link: "/",
    icon: House,
  },

  {
    label: "Services",
    link: "/admin/services",
    icon: Kanban,
  },

  {
    label: "Membres",
    link: "/admin/users",
    icon: Users,
  },

  {
    label: "Compagnies",
    link: "/admin/compagnies",
    icon: BanknoteArrowUp,
  },

  {
    label: "Contacts",
    link: "/admin/contacts",
    icon: Contact,
  },
];

export const AdminsLinkServices = [
  {
    label: "Service et info",
    link: "/admin/services/:id",
  },
  {
    label: "Zones",
    link: "/admin/services/:id/zones",
  },
  {
    label: "Tarifs",
    link: "/admin/services/:id/tarifs",
  },
  {
    label: "Contacts",
    link: "/admin/services/:id/contacts",
  },
];
