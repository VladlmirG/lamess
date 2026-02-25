"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { Star } from "lucide-react";
import FadeInSection from "./FadeInSection";

type Review = {
  title: string;
  text: string;
  rating: number; // 1–5 stars
};

export default function ReviewsCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
    },
    [
      AutoScroll({
        speed: -0.8, // 🔹 negative for reversed direction
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const reviews: Review[] = [
    {
      title: "Jordi Rivera Jové",
      text: "Molt bon servei per a transportar productes refrigerats en bicicletes elèctriques! 🤗💪 Moltes gràcies per fer un Món millor Companys! 🌿💝✨",
      rating: 5,
    },
    {
      title: "Xavier Miró",
      text: "Ja fa més d'un any que faig servir els serveis de \"Fem-ho amb bici\". Estem encantats. Són súper eficients. Les entregues arriben alhora i en bon estat.",
      rating: 5,
    },
    {
      title: "Miguel Santalices Redondo",
      text: "Más que eficientes y serios.",
      rating: 5,
    },
    {
      title: "Santiago Cabrera",
      text: "Buen servicio, rápido y eficiente.",
      rating: 5,
    },
    {
      title: "Regina Felix",
      text: "Excelente servicio de entregas en Barcelona! Siempre entregan a tiempo",
      rating: 5,
    },
    {
      title: "Espai Bici",
      text: "Servicio de entrega en bicicleta rápido y eficiente, grandes profesionales, mejores personas. Mejor que en furgoneta.",
      rating: 5,
    },
    {
      title: "Jorge Serna",
      text: "Espectacular el servicio. Puntualidad, cuidado del producto y excelente trato. Para lo que tengas que mover del punto A al B, ellos se encargan!",
      rating: 5,
    },
    {
      title: "Animal Coffee",
      text: "Hacemos los repartos en Barcelona a nuestros clientes de hostelería con estos chicos y los recomendamos ampliamente. Super responsables y además disponibles en todo momento.",
      rating: 5,
    },
    {
      title: "Isabella C.",
      text: "Servicio resolutivo: cuando hay un problema, lo solucionan. Muy amables y profesionales, recomendable 100%.",
      rating: 5,
    },
  ];

  return (
    <FadeInSection>
  <div className="w-full py-12 font-montserrat">

  {/* Section Header */}
  <div className="mx-auto text-center mb-20 px-4">
    <h2 className="text-lg md:text-4xl text-foreground mb-4 font-peckhampress tracking-wider">
      Lo que dicen nuestros <span className="text-oliva-light text-stroke">clientes</span>
    </h2>
    <p className="text-foreground/70 text-sm md:text-lg font-montserrat tracking-wide">
      Empresas y profesionales que confían en nuestro servicio de entrega sostenible.
    </p>
  </div>

  {/* Carousel Wrapper (relative ONLY here) */}
  <div className="relative">

    {/* Left Fade */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-linear-to-r from-background to-transparent" />

    {/* Right Fade */}
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-linear-to-l from-background to-transparent" />

    {/* Embla Viewport */}
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex-[0_0_auto] max-w-xs p-6 bg-background rounded-lg text-center flex flex-col justify-between"
          >
            <h3 className="font-semibold text-lg mb-2 text-foreground/80">
              {review.title}
            </h3>

            <p className="text-sm text-foreground/65 mb-4">
              {review.text}
            </p>

            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-yellow-500 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</div>
</FadeInSection>
  );
}
