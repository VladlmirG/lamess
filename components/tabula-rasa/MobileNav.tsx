"use client";

import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { CAMPANAS_PUBLICAS } from "@/lib/campanas";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/servicios" },
  // 21-oct · INC-0020 · Campañas: solo cuando sea pública (ver lib/campanas).
  ...(CAMPANAS_PUBLICAS ? [{ name: "Campañas", path: "/campanas" }] : []),
  { name: "Tarifas Barcelona", path: "/tarifas-barcelona" },
  { name: "Tarifas Madrid", path: "/tarifas-madrid" },
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

      <SheetContent className="flex flex-col p-8 overflow-y-auto">
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Link href="/">
            <Image src="/logos/panot.svg" width={70} height={70} alt="Logo" className="dark:invert"/>
          </Link>
        </div>

        {/* 21-oct · INC-0020 · Primero, lo de la app: los pedidos se hacen allí. */}
        <div className="flex flex-col gap-3 items-stretch mb-8">
          <a href="https://app.lamess.es/registro" className="prime-button px-6 py-3 font-bold">
            Hazte cliente
          </a>
          <a href="https://app.lamess.es/login" className="second-button inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap">
            <LogIn className="w-4 h-4" aria-hidden="true" />
            Entrar en la app
          </a>
          <p className="text-center text-xs text-foreground/70 font-montserrat">Los pedidos se hacen desde la app.</p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-7 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`xs:text-sm sm:text-md md:text-lg uppercase font-montserrat tracking-widest font-bold transition-colors duration-300 border-b-2 border-transparent ${
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
