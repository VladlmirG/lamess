"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/servicios" },
  { name: "Tarifas", path: "/tarifas" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Calculador", path: "/calculador" },
  // { name: "Contacto", path: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-8">
      {links.map((link) => {
        const isActive = pathname === link.path;

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`
              font-montserrat capitalize font-medium 
              transition-colors duration-200
              ${isActive ? "text-active-link underline underline-offset-4" : "text-foreground hover:text-hover-link"}
            `}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
