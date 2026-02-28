"use client";

import Image from "next/image";
import { FaCheckCircle, FaShieldAlt, FaBolt, FaRegClock } from "react-icons/fa";

export default function NosotrosMisc1() {
  const features = [
    {
      icon: <FaCheckCircle className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Menos manipulación del producto (menos riesgos).",
    },
    {
      icon: <FaBolt className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Más rapidez en ciudad.",
    },
    {
      icon: <FaShieldAlt className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Más control sobre la entrega.",
    },
    {
      icon: <FaRegClock className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Más previsibilidad para operaciones recurrentes.",
    },
  ];

  return (
    <section className="py-14 md:py-24">
      <div className="w-full px-2 md:px-6 mx-auto flex flex-col xl:flex-row gap-12">

        {/* LEFT SIDE: ICON LIST */}
        <div className="w-full xl:w-[40%] flex flex-col gap-1 md:gap-4 mt-0 ml-0 md:ml-4 xl-ml-0 xl:mt-5 2xl:mt-10">
          <h3 className="text-xl md:text-4xl xl:text-2xl 2xl:text-5xl font-gobold mb-6 tracking-wide">
            Entregas directas, menos errores
          </h3>
          <p className="text-foreground/80 font-montserrat tracking-wide leading-relaxed text-xs md:text-lg xl:text-sm 2xl:text-lg mb-12 max-w-x">
            Nuestro servicio está diseñado para reducir fricción y asegurar resultados:
          </p>
          <ul className="flex flex-col gap-12">
            {features.map((item, index) => (
              <li key={index} className="flex items-center gap-4 py-1">
                {item.icon}
                <span className="text-muted-foreground font-montserrat tracking-wide font-semibold text-xs md:text-lg xl:text-sm 2xl:text-lg leading-relaxed">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE: TWO HORIZONTAL CARDS */}
        <div className="w-full xl:w-[60%] flex flex-col gap-8">

          {/* Card 1 */}
          <div className="flex flex-col md:flex-row bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden">
            <div className=" md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/misc/foto-6.webp"
                alt="Compromiso y servicio"
                fill
                className="object-cover"
              />
            </div>
            <div className=" md:w-1/2 p-8 flex flex-col justify-center">
              <h4 className="text-xl lg:text-2xl xl:text-xl 2xl:text-2xl mb-4 font-gobold tracking-wide">
                Compromiso y servicio
              </h4>
              <p className="text-foreground/80 font-montserrat leading-relaxed text-xs xl:text-md 2xl:text-lg">
                Estamos comprometidos con un servicio rápido y eficiente, pero sobre todo fiable. Transportamos
                desde alimentos frescos hasta documentación, producto delicado o carga voluminosa. Nuestra forma
                de trabajar se basa en: comunicación clara, resolución de problemas y adaptación real a cada
                cliente. Si hay un imprevisto, lo gestionamos; si un cliente necesita una solución especial,
                la diseñamos.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col md:flex-row-reverse bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src="/misc/foto-9.webp"
                alt="Enfoque B2B y experiencia"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h4 className="text-xl lg:text-2xl xl:text-xl 2xl:text-2xl mb-4 font-gobold tracking-wide">
                Enfoque B2B y experiencia
              </h4>
              <p className="text-foreground/80 font-montserrat leading-relaxed text-xs xl:text-md 2xl:text-lg">
                Llevamos más de 10 años en el sector y nuestro foco es el B2B. Colaboramos con artesanos,
                productores e importadores que distribuyen a locales de alta exigencia. Conocemos el ritmo de
                la ciudad y el ritmo del negocio: ventanas horarias, producto sensible, picos de demanda y
                necesidad de flexibilidad sin perder control.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
