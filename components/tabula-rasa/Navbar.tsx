"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const pathname = usePathname();

  const isTarifasActive =
    pathname === "/tarifas-barcelona" ||
    pathname === "/tarifas/madrid";

  return (
    <nav className="hidden md:flex gap-8 items-center">
      
      <NavLink name="Inicio" path="/" pathname={pathname} />
      <NavLink name="Servicios" path="/servicios" pathname={pathname} />

      {/* Tarifas Dropdown (3rd position) */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`group flex items-center gap-1
            font-montserrat capitalize font-medium 
            transition-colors duration-200
            ${isTarifasActive
              ? "text-active-link underline underline-offset-4"
              : "text-foreground hover:text-hover-link"}
            focus:outline-none focus:ring-0`}
        >
          Tarifas
          <FaChevronDown
            className="text-xs transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          className="mt-2 flex flex-col justify-center items-center border border-foreground/40 bg-background"
        >
          <DropdownMenuItem
            asChild
            className="bg-transparent text-foreground hover:text-hover-link focus:bg-transparent focus:text-hover-link"
          >
            <Link href="/tarifas-barcelona" className="cursor-pointer">
              Barcelona
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="bg-transparent text-foreground hover:text-hover-link focus:bg-transparent focus:text-hover-link"
          >
            <Link href="/tarifas/madrid" className="cursor-pointer">
              Madrid
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NavLink name="Nosotros" path="/nosotros" pathname={pathname} />
      <NavLink name="Calculador" path="/calculador" pathname={pathname} />
    </nav>
  );
}

/* ---------- Typed NavLink ---------- */

type NavLinkProps = {
  name: string;
  path: string;
  pathname: string;
};

function NavLink({ name, path, pathname }: NavLinkProps) {
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`font-montserrat capitalize font-medium transition-colors duration-200
        ${isActive
          ? "text-active-link underline underline-offset-4"
          : "text-foreground hover:text-hover-link"}
      `}
    >
      {name}
    </Link>
  );
}
