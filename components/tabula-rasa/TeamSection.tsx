"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import FadeInSection from "./FadeInSection";

export default function TeamSection() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: false,
      watchDrag: false,
    },
    [
      AutoScroll({
        speed: 0.6,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const team = [
    { name: "Alejandro", src: "/members/Alejandro.jpg" },
    { name: "Isaac", src: "/members/Isaac.jpg" },
    { name: "Kennet", src: "/members/Kennet.jpg" },
    { name: "Kike", src: "/members/Kike.jpg" },
    { name: "Lucas", src: "/members/Lucas.jpg" },
    { name: "Lucia", src: "/members/Lucia.jpg" },
    { name: "Papu", src: "/members/Papu.jpg" },
    { name: "Raul", src: "/members/Raul.jpg" },
    { name: "Sair", src: "/members/Sair.jpg" },
    { name: "Santi", src: "/members/Santi.jpg" },
    { name: "Santiago", src: "/members/Santiago.jpg" },
    { name: "Side", src: "/members/Side.jpg" },
  ];

  return (
    <FadeInSection>
      <section className="relative w-full py-16">
        <div className="mx-auto px-6">

          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* TEXT SIDE */}
            <div className="w-full lg:w-[40%] text-center lg:text-left">
          <div className="mb-6 flex flex-col justify-center items-center lg:justify-start lg:items-start">
          <h2 className="font-gobold text-2xl md:text-5xl xl:text-6xl tracking-[0.2em] uppercase mb-4">
             Nosotros<span className="text-oliva-light"></span>
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-oliva-light to-transparent opacity-50"></div>
        </div>

              <p className="text-muted-foreground text-sm 2xl:text-lg leading-relaxed font-montserrat border-b-2 border-b-oliva pb-4">
                <span className="font-bold">Somos La Mess!</span><br />
                Logística urbana en bicicleta de carga para empresas que necesitan entregas
                directas, cuidadas y puntuales. Trabajamos cada día con productores,
                importadores y artesanos que abastecen a los mejores locales de la ciudad.
              </p>
            </div>

            {/* CAROUSEL SIDE */}
            <div className="w-full lg:w-[60%] relative">

              {/* Left Fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-5 z-10 bg-linear-to-r from-background to-transparent" />

              {/* Right Fade */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-5 z-10 bg-linear-to-l from-background to-transparent" />

              <div className="overflow-hidden pointer-events-none" ref={emblaRef}>
                <div className="flex -mx-4 px-6 lg:px-0">

                  {team.map((member, index) => (
                    <div
                      key={index}
                      className="flex-[0_0_70%] sm:flex-[0_0_45%] lg:flex-[0_0_42%] xl:flex-[0_0_32%] px-4 pointer-events-auto"
                    >
                      <div className="relative h-60 md:h-80 lg:h-60 2xl:h-105 rounded-3xl overflow-hidden shadow-lg group">

                        <Image
                          src={member.src}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Bottom gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Name */}
                        <div className="absolute bottom-6 left-6 text-white">
                          <p className="text-xs md:text-md lg:text-sm 2xl:text-xl font-semibold tracking-wide font-montserrat">
                            {member.name}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </FadeInSection>
  );
}
