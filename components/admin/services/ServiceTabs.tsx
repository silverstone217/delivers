"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminsLinkServices = [
  { label: "Service & Info", link: (id: string) => `/admin/services/${id}` },
  { label: "Zones", link: (id: string) => `/admin/services/${id}/zones` },
  { label: "Tarifs", link: (id: string) => `/admin/services/${id}/tarifs` },
  // { label: "Contacts", link: (id: string) => `/admin/services/${id}/contacts` },
];

interface ServiceTabsProps {
  serviceId: string;
}

export default function ServiceTabs({ serviceId }: ServiceTabsProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b pb-2 overflow-x-auto no-scrollbar">
      <ul className="flex gap-2 min-w-max">
        {/* FIRST PAGE */}
        {AdminsLinkServices.filter((i) =>
          i.label.includes("Service & Info")
        ).map((item, idx) => {
          const href = item.link(serviceId);
          const isActive = pathname === href;

          return (
            <li
              key={item.label}
              className={`flex-1 min-w-max ${idx === 0 ? "mr-4" : ""}`} // petit espacement après le premier
            >
              <Link
                href={href}
                className={`
                  px-6 py-2 rounded-md text-sm font-medium whitespace-nowrap text-center
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }
                  hover:bg-primary/20 hover:text-primary
                  block
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        {/* OTHER PAGES */}
        {AdminsLinkServices.filter(
          (i) => !i.label.includes("Service & Info")
        ).map((item, idx) => {
          const href = item.link(serviceId);
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <li
              key={item.label}
              className={`flex-1 min-w-max ${idx === 0 ? "mr-4" : ""}`} // petit espacement après le premier
            >
              <Link
                href={href}
                className={`
                  px-6 py-2 rounded-md text-sm font-medium whitespace-nowrap text-center
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  }
                  hover:bg-primary/20 hover:text-primary
                  block
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
