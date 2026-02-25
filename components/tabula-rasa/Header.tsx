"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        py-4 xl:py-6 
        sticky top-0 z-50
        backdrop-blur-xl 
        bg-background/70
        transition-all duration-300
        ${scrolled ? "shadow-md" : ""}
      `}
    >
      <div className="mx-auto flex justify-between items-center px-4 md:px-12">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logos/logo-hands.svg" width={50} height={50} alt="Logo" />
          <h1 className="text-4xl md:text-5xl font-smirnow pl-2 pt-2 text-logo text-stroke">
            La Mess
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-6">
          <Navbar />
          <Link href="/contacto">
          <button
              className={`prime-button px-6 py-3 font-bold ${
                pathname === "/contacto" ? "prime-button-hover" : ""
              }`}
            >
              Contacto
            </button>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Nav */}
        <div className="xl:hidden flex items-center gap-4">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
