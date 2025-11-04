"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { roboto } from "@/lib/fonts";
import { HomeLinks } from "@/utils/links";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { SITE_NAME } from "@/lib/env";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div className="flex flex-col space-y-3">
          <h2
            className={cn(
              "text-2xl font-bold text-white uppercase",
              roboto.className
            )}
          >
            {SITE_NAME}
          </h2>
          <p className="text-gray-400 text-sm">
            Comparez facilement les tarifs de livraison au Congo. Trouvez le
            meilleur service pour vos colis.
          </p>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Servi-Group. Tous droits réservés.
          </p>
        </div>

        {/* Liens utiles */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold mb-2">Liens utiles</h3>
          <ul className="space-y-1">
            {HomeLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className="hover:text-white transition-colors text-gray-300 flex items-center gap-2"
                  target={item.link.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    item.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact rapide */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">
            Email:{" "}
            <a
              href="mailto:contact@servi-group.com"
              className="hover:text-white"
            >
              contact@servi-group.com
            </a>
          </p>
          <p className="text-gray-400 text-sm">Tél: +243 970 123 456</p>
          <p className="text-gray-400 text-sm">Kinshasa, RDC</p>
          {/* 🌐 Icônes sociales */}
          <div className="flex items-center gap-3 mt-2">
            <Link
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </Link>

            <Link
              href="https://www.youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-gray-500 text-xs">
        Créé avec par Servi-Group
      </div>
    </footer>
  );
};

export default Footer;
