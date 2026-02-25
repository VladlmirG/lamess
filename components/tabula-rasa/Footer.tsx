"use client";

import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const Footer: FC = () => {
  return (
    <footer className="w-full mt-32 border-t border-oliva-light/60 bg-militar text-hueso">
      <div className="mx-auto px-4 md:px-12 py-16">

        {/* Top Grid */}
        <div className="grid lg:grid-cols-3 gap-20 lg:gap-12 items-center">

          {/* LEFT: Logo */}
          <div className="flex justify-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/logo-square.svg"
                alt="Logo"
                width={320}
                height={320}
                className="object-contain"
              />
            </Link>
          </div>

          {/* CENTER: Socials and Address */}
          <div className="flex flex-col items-center text-center space-y-8">

            {/* Social Icons with Circle Background */}
            <div className="flex items-center gap-6">
              <Link href="https://www.facebook.com/people/La-Mess/100084871881289/" target="_blank" className="transition-colors">
                <div className="bg-oliva-light p-2 rounded-full flex items-center justify-center">
                  <FaFacebook size={20} className="text-militar" />
                </div>
              </Link>

              <Link href="https://www.linkedin.com/company/fem-ho-amb-bici/" target="_blank" className="hover:text-oliva-light transition-colors">
                <div className="bg-oliva-light p-2 rounded-full flex items-center justify-center">
                  <FaLinkedinIn size={20} className="text-militar" />
                </div>
              </Link>

              <Link href="https://www.instagram.com/lamess_bcn/" target="_blank" className="hover:text-oliva-light transition-colors">
                <div className="bg-oliva-light p-2 rounded-full flex items-center justify-center">
                  <FaInstagram size={20} className="text-militar" />
                </div>
              </Link>

              <Link href="https://x.com/FemhoambBici" target="_blank" className="hover:text-oliva-light transition-colors">
                <div className="bg-oliva-light p-2 rounded-full flex items-center justify-center">
                  <FaXTwitter size={20} className="text-militar" />
                </div>
              </Link>
            </div>

            {/* Address */}
            <Link
              href="https://www.google.com/maps/place/C.+del+Bruc,+63,+Eixample,+08009+Barcelona,+Espa%C3%B1a/@41.393602,2.170156,15z/data=!4m6!3m5!1s0x12a4a2ee860e57ef:0x7b3845b7b87122c9!8m2!3d41.3936024!4d2.170156!16s%2Fg%2F11c3s8_v02?hl=es&entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className="flex items-center gap-3 font-montserrat text-sm tracking-wide hover:text-oliva-light transition-colors"
            >
              <MapPin size={18} />
              <span>Carrer del bruc, 63, Barcelona</span>
            </Link>

            <p>Te recomendamos la mejor opción por zonas, por horas o un servicio a medida.</p>

          </div>

          {/* RIGHT: Contact List */}
          <div className="flex flex-col items-center">
            <h3 className="font-gobold tracking-wider text-2xl mb-8 text-oliva-light">Contáctanos</h3>

            <ul className="space-y-8 font-montserrat text-sm tracking-wide flex flex-col items-start">
              <li>
                <Link
                  href="tel:+34930070113"
                  className="flex items-center gap-3 hover:text-oliva-light transition-colors"
                >
                  <div className="bg-oliva-light p-2 rounded-full flex items-center justify-center">
                    <Phone size={20} className="text-militar" />
                  </div>
                  <span>+34 930 070 113</span>
                </Link>
              </li>

              <li>
                <Link
                  href="mailto:lucas@lamess.es"
                  className="flex items-center gap-3 hover:text-oliva-light transition-colors"
                >
                  <div className="bg-oliva-light p-2 rounded-full flex items-center justify-center">
                    <Mail size={20} className="text-militar" />
                  </div>
                  <span>lucas@lamess.es</span>
                </Link>
              </li>

              <li>
                <Link
                  href="https://wa.me/34930070113"
                  target="_blank"
                  className="flex items-center gap-3 hover:text-oliva-light transition-colors"
                >
                  <div className="bg-oliva-light p-2 rounded-full flex items-center justify-center">
                    <FaWhatsapp size={20} className="text-militar" />
                  </div>
                  <span>WhatsApp</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Links Above Divider + Scroll to Top */}
       <div className="mt-18 xl:mt-12 relative flex justify-center gap-4 md:gap-8 font-montserrat text-xs md:text-sm tracking-wide">

         {/* Legal Links */}
         <Link href="/aviso-legal" className="hover:text-oliva-light transition-colors">
           Aviso legal
         </Link>

         <Link href="/condiciones-de-uso" className="hover:text-oliva-light transition-colors">
           Condiciones de uso
         </Link>

         {/* Scroll to Top Button with Tooltip */}
         <TooltipProvider>
         <Tooltip>
           <TooltipTrigger asChild>
             <button
               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
               className="absolute right-0 xl:right-5 -top-6 w-8 h-8 xl:w-10 xl:h-10 bg-oliva-light text-militar rounded-full flex items-center justify-center shadow-md   hover:scale-105 transition-transform cursor-pointer"
               aria-label="Scroll to top">
              <ArrowUp size={16} className="xl:w-5 xl:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            Hacia arriba
          </TooltipContent>
        </Tooltip>
          </TooltipProvider>
       </div>


        {/* Bottom Divider + Copyright + Small Right Text */}
        <div className="relative mt-6 pt-6 border-t border-oliva-light/20">
          <p className="text-center font-montserrat text-xs tracking-wide text-hueso">
            © {new Date().getFullYear()} <span className="text-oliva-light">La Mess</span> | Todos los derechos reservados.
          </p>
          <span className="absolute right-0 xl:right-5 top-1 xl:top-6 font-montserrat text-[6px] lg:text-[8px] tracking-wide text-hueso/70">
          Website developed by{' '}
          <Link href="https://www.vladimirgotay.com/" target="_blank" className="hover:text-oliva-light">
            VladimirG
          </Link>
        </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

