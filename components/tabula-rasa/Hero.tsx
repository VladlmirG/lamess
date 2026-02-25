"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";


import Image from "next/image";
// import { Button } from "../ui/button";

const slides = [
  "/hero/hero2.webp",
  "/hero/hero3.webp",
  "/hero/hero4.webp",
];

export default function Hero() {
  return (
<section className="relative h-[80vh] overflow-hidden max-w-none mt-8 rounded-3xl hero-shadow">
  {/* relative -mx-4 md:-mx-12 h-[90vh] overflow-hidden max-w-none */}


  {/* Swiper */}
  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    loop
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    className="absolute inset-0 w-full h-full"
  >
    {slides.map((src, i) => (
      <SwiperSlide key={i}>
        <Image
          src={src}
          alt={`Hero ${i}`}
          fill
          className="object-cover"
          priority
        />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Overlay */}
  <div className="absolute inset-0 bg-militar-dark/70 z-10" />

  {/* Content */}
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 md:px-12">
    <h1 className="text-4xl md:text-5xl text-white mb-8 tracking-wider font-gobold">
      Entregas directas B2B en bicicleta de carga
    </h1>
    <p className="text-lg md:text-2xl font-montserrat text-hueso mb-8 max-w-3xl font-montserrat-light tracking-wider">
      Recogemos y entregamos sin puntos intermedios. Rápidos, fiables y sostenibles en ciudad
    </p>
    <div className="flex gap-8">
      <button className="prime-button py-4 px-6 text-xl font-gobold">Get Started</button>
      <button className="second-button py-4 px-6 text-xl font-gobold">Learn More</button>
    </div>
  </div>
</section>
  );
}
