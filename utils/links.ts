import { Kanban, Contact, MapPinHouse, House } from "lucide-react";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

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
    icon: RiMoneyDollarBoxLine,
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
    label: "Espace",
    link: "/espace",
    icon: Kanban,
  },

  {
    label: "Nos solutions",
    link: "/a-propos",
    icon: Contact,
  },

  {
    label: "A propos",
    link: "/a-propos",
    icon: Contact,
  },

  {
    label: "Contacts",
    link: "/contacts",
    icon: Contact,
  },
];
