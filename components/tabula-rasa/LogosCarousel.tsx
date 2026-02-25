"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

// ShadCN Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FadeInSection from "./FadeInSection";

type Logo = {
  src: string;
  name: string;   // Tooltip text
  link: string;   // Clickable URL
  invert?: boolean; // only invert in dark mode if true
};

export default function LogosCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 0.8,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const root = document.documentElement;

    const updateDarkMode = () => setIsDark(root.classList.contains("dark"));

    updateDarkMode();
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const logos: Logo[] = [
    { src: "/clientes/AnimalCoffee.png", name: "Animal Coffee", link: "https://animalcoffee.es/", invert: true },
    { src: "/clientes/ArcticCrab.png", name: "Arctic Crab", link: "https://www.arcticcrab.com/en/", invert: true },
    { src: "/clientes/BAUMFest.png", name: "BAUM Fest", link: "https://baumfest.com/", invert: false },
    { src: "/clientes/BokaVerde.png", name: "Boka Verde", link: "https://www.instagram.com/bokaverdebcn/", invert: false },
    { src: "/clientes/Bosabe.png", name: "Bosabe", link: "https://www.facebook.com/bosabe/", invert: false },
    { src: "/clientes/CalRosset.png", name: "Cal Rosset", link: "https://calrosset.com/", invert: true },
    { src: "/clientes/Canal.png", name: "Canal", link: "https://canal.es/", invert: true },
    { src: "/clientes/CapProblema.png", name: "Cap Problema", link: "https://www.capproblema.com/", invert: true },
    { src: "/clientes/Cinderella21.png", name: "Cinderella 21", link: "https://bylidiac21.com/en", invert: true },
    { src: "/clientes/Crois.png", name: "Crois", link: "https://www.facebook.com/Crois.Barcelona/", invert: true },
    { src: "/clientes/Delacrem.png", name: "Delacrem", link: "https://delacrem.cat/", invert: true },
    { src: "/clientes/DotzeGraus.png", name: "Dotze Graus", link: "https://www.facebook.com/profile.php?id=100044345964747", invert: true },
    { src: "/clientes/DTSPrinting.png", name: "DTS Printing", link: "https://dtsprinting.com/", invert: true },
    { src: "/clientes/Espaibici.png", name: "Espaibici", link: "https://espaibici.com/", invert: true },
    { src: "/clientes/FlordeGracia.png", name: "Flor de Gracia", link: "https://www.instagram.com/flor.de.gracia/", invert: true },
    { src: "/clientes/FloristeriaParis.png", name: "Floristeria Paris", link: "https://floristeriaparis.com/", invert: true },
    { src: "/clientes/FormaLibera.png", name: "Forma Libera", link: "https://www.formalibera.com/", invert: true },
    { src: "/clientes/Frutal.png", name: "Mercat Frutal", link: "https://www.instagram.com/mercatfrutal/", invert: true },
    { src: "/clientes/Glutery.png", name: "Glutery", link: "https://www.glutery.com/", invert: true },
    { src: "/clientes/GrupKibuka.png", name: "Grup Kibuka", link: "https://www.kibuka.com/", invert: true },
    { src: "/clientes/HildaBloom.png", name: "Hilda Bloom", link: "https://www.hildabloom.com/", invert: true },
    { src: "/clientes/LaFuga.png", name: "La Fuga", link: "https://lafugabcn.com/", invert: true },
    { src: "/clientes/LaQuesera.png", name: "La Quesera", link: "https://www.instagram.com/laqueserabarcelona/", invert: true },
    { src: "/clientes/LaSuegradelJardinero.png", name: "La Suegra del Jardinero", link: "https://www.instagram.com/lasuegradeljardinero/", invert: true },
    { src: "/clientes/LletCrua.png", name: "Llet Crua", link: "https://www.lletcrua.cat/", invert: true },
    { src: "/clientes/Lukumas.png", name: "Lukumas", link: "https://www.facebook.com/lukumas/", invert: true },
    { src: "/clientes/MadreGelats.png", name: "Holy Madre Gelats", link: "https://holy-madre.com/", invert: true },
    { src: "/clientes/MannaGelats.png", name: "Manna Gelats", link: "https://mannagelats.com/#", invert: true },
    { src: "/clientes/MondoIntegral.png", name: "Mondo Integral", link: "https://www.facebook.com/mondointegral/", invert: true },
    { src: "/clientes/Norte.png", name: "Norte", link: "https://www.instagram.com/norterestaurante/", invert: true },
    { src: "/clientes/Oatly.png", name: "Oatly", link: "https://www.oatly.com/es-es", invert: true },
    { src: "/clientes/PanaMa.png", name: "Pana Ma", link: "https://www.instagram.com/pan_a_ma/", invert: true },
    { src: "/clientes/PollosPlanes.png", name: "Pollos Planes", link: "https://www.pollosplanes.com/Home", invert: true },
    { src: "/clientes/Rare.png", name: "Rare", link: "https://www.rareburgersandmore.com/", invert: true },
    { src: "/clientes/SabordoBrasil.png", name: "Sabor do Brasil", link: "https://www.sabordobrasil.es/", invert: true },
    { src: "/clientes/SolerCapella.png", name: "Soler Capella", link: "https://www.boqueria.barcelona/soler-capella-p-813-es", invert: true },
    { src: "/clientes/SweetLima.png", name: "Sweet Lima", link: "#", invert: true },
  ];

  return (
    <FadeInSection>
    <TooltipProvider>
      <div className="relative w-full py-12">
        {/* Left Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-linear-to-r from-background to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-linear-to-l from-background to-transparent" />

        {/* Embla Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Embla Container */}
          <div className="flex gap-6 items-center">
            {logos.map((logo, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <a
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[0_0_auto] flex items-center justify-center px-8"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={160}
                      height={80}
                      className={`object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${
                        isDark && logo.invert ? "invert" : ""
                      }`}
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{logo.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
    </FadeInSection>
  );
}
