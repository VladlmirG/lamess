"use client";

import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaArrowRight } from "react-icons/fa";
import React, { useState } from "react";

// ---------------------------
// MAIN CONTACT + FAQ SECTION
// ---------------------------
export default function ContactoMain() {
  return (
    <div>
      <section className="py-14 px-2 md:px-6">
        {/* Title & Subtitle Centered */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 font-gobold tracking-wide">
            <span className="text-oliva-light">Hablemos</span> de tu próximo envío
          </h2>
          <p className="text-foreground/75 text-sm md:text-lg mb-2 font-montserrat">
            Atención directa, sin intermediarios. Escríbenos o llámanos y te responderemos lo antes posible.
          </p>
          <p className="text-xs text-foreground/60 font-montserrat">
            Disponible de lunes a viernes · 8:00 – 18:00 | Sabados y Domingos . 6:00 - 20:00
          </p>
        </div>

        {/* Grid: Contact Card + FAQ */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Contact Card */}
          <div className="bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl rounded-3xl shadow-lg pt-8 pb-8 pl-4 xl:pl-8 pr-4 xl:pr-8 space-y-6 border border-foreground/40">
            <ContactItem
              icon={<Phone size={20} />}
              label="Teléfono"
              value="+34 930 070 113"
              href="tel:+34930070113"
            />
            <ContactItem
              icon={<Mail size={20} />}
              label="Correo electrónico"
              value="lucas@lamess.es"
              href="mailto:lucas@lamess.es"
            />
            <ContactItem
              icon={<FaWhatsapp size={20} />}
              label="WhatsApp"
              value="Enviar mensaje"
              href="https://wa.me/34930070113"
            />
            <ContactItem
              icon={<MapPin size={20} />}
              label="Ubicación"
              value="Carrer del bruc, 63, Barcelona"
              href="https://www.google.com/maps/place/C.+del+Bruc,+63,+Eixample,+08009+Barcelona"
            />

            {/* Social Icons */}
            <div className="pt-6 border-t border-t-foreground/40 flex gap-6 text-muted-foreground">
              <a href="https://www.instagram.com/lamess_bcn/" target="_blank" className="hover:text-primary transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/fem-ho-amb-bici/" target="_blank" className="hover:text-primary transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* RIGHT: FAQ */}
          <div className="space-y-4">
            <FaqSection />
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------
// CONTACT ITEM
// ---------------------------
interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="flex items-start gap-4 group transition hover:translate-x-1 cursor-pointer rounded-xl p-1 md:p-3"
    >
      {/* Icon Circle */}
      <div className="p-3 rounded-full bg-militar-dark text-oliva-light flex items-center justify-center border border-foreground/40">
        {icon}
      </div>

      <div className="flex flex-1 justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground font-montserrat">{label}</p>
          <p className="font-medium transition-all duration-200 font-montserrat text-sm md:text-base">{value}</p>
        </div>

        {/* Arrow */}
        <div className="ml-4 p-1 md:p-2 rounded-full bg-militar-dark text-oliva-light flex items-center justify-center text-xs opacity-90 border border-foreground/40">
          <FaArrowRight size={12} />
        </div>
      </div>
    </Wrapper>
  );
}

// ---------------------------
// FAQ SECTION
// ---------------------------
function FaqSection() {
  const faqs = [
    { question: "¿Qué significa entrega directa B2B?", answer: "Recogemos y entregamos sin puntos intermedios..." },
    { question: "¿Trabajáis solo en Barcelona?", answer: "Operamos en Barcelona y Madrid..." },
    { question: "¿Cuándo se aplica la tarifa por horas?", answer: "Utilizamos la tarifa por horas cuando hay múltiples entregas..." },
    { question: "¿Qué tipo de carga podéis transportar?", answer: "Transportamos alimentación, producto delicado, documentación..." },
    { question: "¿Cómo confirmáis las entregas?", answer: "Una vez realizada la entrega, confirmamos la finalización del servicio..." },
    { question: "¿Es realmente más eficiente que una furgoneta?", answer: "En entornos urbanos, sí. La bicicleta de carga evita atascos..." },
    { question: "¿Ofrecéis servicios recurrentes para empresas?", answer: "Sí. Diseñamos servicios planificados y recurrentes para clientes B2B..." },
  ];

  return (
    <div className="space-y-3"> {/* reduced gap from 4 to 2 */}
      {faqs.map((faq, index) => (
        <AccordionItem key={index} {...faq} />
      ))}
    </div>
  );
}

// ---------------------------
// FAQ ACCORDION ITEM
// ---------------------------
function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-b-foreground/40 transition">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer" // reduced padding from p-6 → p-4
      >
        <span className="font-medium font-montserrat text-foreground/90 text-xs md:text-base lg:text-xs xl:text-base">{question}</span>
        <ChevronDown
          className={`transition-transform duration-300 text-foreground/80 ${open ? "rotate-180" : ""}`}
          size={18} // slightly smaller than before
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-72 pb-4 px-4" : "max-h-0"}`} // reduced padding & max height
      >
        <p className="text-foreground font-montserrat text-xs md:text-sm">{answer}</p> {/* smaller text to save space */}
      </div>
    </div>
  );
}
