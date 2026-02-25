"use client";

import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/servicios" },
  { name: "Tarifas", path: "/tarifas" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Calculador", path: "/calculador" },
  { name: "Contacto", path: "/contacto" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center xl:hidden">
        <Menu className="w-8 h-8 text-foreground" />
      </SheetTrigger>

      <SheetContent className="flex flex-col p-8">
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>

        {/* Logo */}
        <div className="mb-22 flex justify-center">
          <Link href="/">
            <Image src="/logos/panot.svg" width={70} height={70} alt="Logo" className="dark:invert"/>
          </Link>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-xl uppercase font-montserrat tracking-widest font-bold transition-colors duration-300 border-b-2 border-transparent ${
                pathname === link.path ? "border-accent" : ""
              } text-foreground hover:text-accent`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
