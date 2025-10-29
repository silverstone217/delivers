import { Kanban, Contact, MapPinHouse } from "lucide-react";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

export const EspacesLinks = [
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
