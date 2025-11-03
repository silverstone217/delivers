import { Kanban, Contact, MapPinHouse, House, Info } from "lucide-react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
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
    label: "Tarifs",
    link: "/tarifs",
    icon: FaMoneyBillTransfer,
  },
  {
    label: "Espace",
    link: "/espace",
    icon: Kanban,
  },

  {
    label: "Nos solutions",
    link: "/a-propos",
    icon: MdOutlineHomeRepairService,
  },

  {
    label: "A propos",
    link: "/a-propos",
    icon: Info,
  },

  {
    label: "Contacts",
    link: "/contacts",
    icon: Contact,
  },
];
