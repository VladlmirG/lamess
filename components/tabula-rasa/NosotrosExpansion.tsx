"use client";

import Link from "next/link";
import { FaCalendarAlt, FaBox, FaComments, FaUserClock } from "react-icons/fa";

const NosotrosExpansion = () => {
  const features = [
    {
      icon: <FaCalendarAlt className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Servicio planificado y recurrente para clientes B2B.",
    },
    {
      icon: <FaBox className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Entregas directas por zona o por horas según necesidad.",
    },
    {
      icon: <FaComments className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Comunicación y confirmación de entregas.",
    },
    {
      icon: <FaUserClock className="text-militar-dark w-12 h-12 shrink-0 p-2 bg-oliva-light rounded-full" />,
      text: "Servicios especiales para eventos o necesidades puntuales.",
    },
  ];

  return (
    <section className="pt-14 pb-16 md:pt-24 md:pb-16 xl:pt-14 xl:pb-16 2xl:pt-24 2xl:pb-16">
      <div className="w-full px-2 md:px-6 mx-auto flex flex-col xl:flex-row gap-12">

        {/* LEFT SIDE - TEXT CARD */}
        <div className="w-full xl:w-[60%] flex flex-col justify-center">
          <div className="flex flex-col bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl rounded-3xl shadow-lg p-8 md:p-10 2xl:p-12">
            <h3 className="text-xl lg:text-2xl xl:text-xl 2xl:text-2xl font-gobold tracking-wide mb-6">
              Crecemos con la ciudad: Barcelona y Madrid
            </h3>
            <p className="font-montserrat text-foreground/80 leading-relaxed text-xs md:text-lg xl:text-sm 2xl:text-lg mb-4">
              Barcelona está en evolución constante, y nosotros evolucionamos con ella. Ajustamos nuestra operativa a las necesidades de cada cliente y a la realidad urbana: horarios, zonas, accesos, picos de trabajo y tipos de carga.
            </p>
            <p className="font-montserrat text-foreground/80 leading-relaxed text-xs md:text-lg xl:text-sm 2xl:text-lg">
              Hoy estamos también en Madrid, replicando el mismo enfoque: entrega directa, atención B2B y adaptación a la operativa del cliente.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - ICON LIST */}
        <div className="w-full xl:w-[40%] flex flex-col gap-6">
          <h4 className="text-xl lg:text-2xl xl:text-xl 2xl:text-2xl font-gobold mb-6">
            Cómo trabajamos
          </h4>
          <ul className="flex flex-col gap-8">
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

      </div>

      {/* CTA BLOCK */}
      <div className="max-w-6xl mx-auto mt-24 text-center space-y-6 bg-militar-dark rounded-3xl p-8 border border-foreground/40">
        <h4 className="text-xl lg:text-2xl xl:text-xl 2xl:text-2xl font-gobold text-hueso tracking-wide">
          ¿Quieres que lo adaptemos a tu operativa?
        </h4>
        <p className="font-montserrat text-hueso/80 text-sm xl:text-lg leading-relaxed">
          Cuéntanos qué mueves, qué ventanas horarias tienes y cuántas entregas haces al día. Te proponemos la opción más eficiente (por zonas, por horas o servicio a medida).
        </p>
        <div>
          <Link href="/contacto">
          <button className="mt-6 px-10 py-4 calc-button font-montserrat">
            Solicitar propuesta
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NosotrosExpansion;
