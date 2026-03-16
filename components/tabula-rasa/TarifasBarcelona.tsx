"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaClock, FaExclamationCircle, FaBolt, FaCloudRain, FaWeightHanging } from "react-icons/fa";
import { IoIosBicycle } from "react-icons/io";
import { PiPackageLight, PiHandCoinsFill } from "react-icons/pi";
import { CiCalculator2 } from "react-icons/ci";
import Link from "next/link";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; 

export default function TarifasBarcelona() {
  const zonas = [
    {
      zona: "Zona 1",
      lab: "5,5€",
      fes: "9€",
      codes: [
        "08006", "08007", "08008", "08009", "08010",
        "08011", "08012", "08013", "08021", "08025",
        "08036", "08037",
      ],
    },
    {
      zona: "Zona 2",
      lab: "7,5€",
      fes: "11€",
      codes: ["08001", "08002", "08003", "08015", "08018", "08026", "08029"],
    },
    {
      zona: "Zona 3",
      lab: "9€",
      fes: "12€",
      codes: ["08004", "08005", "08014", "08016", "08019", "08020"],
    },
    {
      zona: "Zona 4",
      lab: "10€",
      fes: "13€",
      codes: ["08017", "08022", "08023", "08024", "08031", "08032"],
    },
  ];


  const [isDark, setIsDark] = useState(false);

useEffect(() => {
  const root = document.documentElement;
  const updateDarkMode = () => setIsDark(root.classList.contains("dark"));
  updateDarkMode();

  const observer = new MutationObserver(updateDarkMode);
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });

  return () => observer.disconnect();
}, []);


  return (
   <section className="relative w-full py-16 overflow-hidden">

    {/* Background PNG like Servicios */}
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Image
        src="/hero/markstest4.png"
        alt="Background graphic"
        fill
        priority
        className={`hidden lg:block object-contain opacity-2 ${
          isDark ? "invert" : ""
        } translate-x-0/4 lg:translate-x-1/4 scale-320 lg:scale-220 xl:scale-150 rotate-40 transition-all duration-200 ease-in-out`}
      />
    </div>

     {/* Top, Bottom, Left, Right Fades */}
     <div className="absolute top-0 left-0 w-full h-10 z-0 pointer-events-none bg-linear-to-b from-background to-transparent" />
     <div className="absolute bottom-0 left-0 w-full h-15 z-0 pointer-events-none bg-linear-to-t from-background to-transparent" />
     <div className="absolute top-0 left-0 h-full w-0 lg:w-10 xl:w-20 z-0 pointer-events-none bg-linear-to-r from-background to-transparent" />
     <div className="absolute top-0 right-0 h-full w-0 lg:w-10 xl:w-20 z-0 pointer-events-none bg-linear-to-l from-background to-transparent" />


      <div className="mx-auto max-w-6xl px-1 md:px-12">
        {/* Header */}
        <div className="mb-16 space-y-6 lg:space-y-1">
          {/* City + bike */}
          <div className="flex items-center gap-3 text-primary">
            <IoIosBicycle className="text-5xl text-militar-dark bg-oliva-light p-2 rounded-full" />
            <span className="uppercase text-sm font-medium font-montserrat tracking-wide">
              Barcelona
            </span>
          </div>

          {/* Heading with right icon */}
          <div className="flex items-center">
            <h2 className="text-md md:text-3xl lg:text-4xl flex-1 uppercase font-montserrat font-bold tracking-wide">
              Tarifas transparentes.
              <span className="block text-oliva-light">Sin sorpresas.</span>
            </h2>

            <PiPackageLight className="text-5xl mr-5 md:mr-0 md:text-7xl lg:text-9xl text-oliva-light ml-6 bg-militar-dark border border-foreground/40 p-2 md:p-3 rounded-full"/>
          </div>

          <p className="text-muted-foreground max-w-3xl text-xs lg:text-md xl:text-lg font-montserrat">
            Precios por zona y opción por horas para múltiples paradas
            o servicios fuera de ciudad.
          </p>
        </div>

                {/* Zonas Table */}
        <div className="rounded-3xl border border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl shadow-xl overflow-hidden mb-10">

          {/* Header Area */}
          <div className="p-6 md:p-10 border-b border-b-foreground/60 flex items-center gap-6 font-montserrat">
            <div className="rounded-xl bg-primary/10 text-primary">
              <PiHandCoinsFill className="text-4xl md:text-5xl text-militar-dark bg-oliva-light p-2 rounded-full"/>
            </div>
<div className="flex items-start justify-between w-full gap-4">

  <div>
    <h3 className="text-md md:text-xl font-gobold">
      Tarifas por zona
    </h3>
    <p className="text-[9px] md:text-sm text-muted-foreground">
      Precios según código postal
    </p>
  </div>

  <span className="text-[9px] md:text-xs font-semibold whitespace-nowrap mt-5">
    +2€ recogida única
  </span>

</div>
          </div>

          <div className="overflow-x-auto font-montserrat">
            <Table className="text-[8px] md:text-[10px] lg:text-sm text-center">
              <TableHeader>
                <TableRow className="bg-militar-dark">
                  <TableHead className="px-4 py-3 md:px-8 md:py-5 font-semibold uppercase text-oliva-light text-center">Zona</TableHead>
                  <TableHead className="px-4 py-3 md:px-8 md:py-5 font-semibold uppercase text-oliva-light text-center">Laborables</TableHead>
                  <TableHead className="px-4 py-3 md:px-8 md:py-5 font-semibold uppercase text-oliva-light text-center">Festivos</TableHead>
                  <TableHead className="px-4 py-3 md:px-8 md:py-5 font-semibold uppercase text-oliva-light">Códigos postales</TableHead>
                </TableRow>
              </TableHeader> 

              <TableBody>
                {zonas.map((z, i) => (
                  <TableRow key={i} className="hover:bg-muted/40 transition">
                    <TableCell className="px-4 py-3 md:px-8 md:py-6 font-medium text-[8px] md:text-[10px] lg:text-base bg-militar-dark text-oliva-light">{z.zona}</TableCell>
                    <TableCell className="px-4 py-3 md:px-8 md:py-6 text-[8px] md:text-[10px] lg:text-base">{z.lab}</TableCell>
                    <TableCell className="px-4 py-3 md:px-8 md:py-6 text-[8px] md:text-[10px] lg:text-base">{z.fes}</TableCell>

                    {/* Accordion inside TableCell */}
                    <TableCell className="px-4 py-3 md:px-8 md:py-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`item-${i}`}>
                          <AccordionTrigger className="p-0 font-medium hover:no-underline hover:text-foreground/60 text-[8px] md:text-[10px] lg:text-base cursor-pointer">
                            Ver códigos
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="rounded-xl bg-muted/30 mt-2">
                              <ScrollArea className="h-full pr-4">
                                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                                  {z.codes.map((code) => (
                                    <span
                                      key={code}
                                      className="px-1 lg:px-3 py-1 rounded-md bg-militar-dark text-oliva-light border-0 md:border border-oliva-light/40 text-[7px] md:text-[8px] lg:text-xs"
                                    >
                                      {code}
                                    </span>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>


        {/* NUEVA CAJA: EXTRAS DE SERVICIO */}
          <div className="group relative rounded-3xl border border-oliva-light/40  bg-militar-dark/90 p-8 shadow-2xl transition hover:border-oliva-light md:col-span-2 lg:columns-2xs">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-oliva-light p-1.5 rounded-full">
                <PiPackageLight className="text-2xl text-militar-dark" />
              </div>
              <h3 className="text-xl font-gobold tracking-wider uppercase text-hueso">Suplementos y extras</h3>
            </div>
            
            <ul className="space-y-4 font-montserrat text-[11px] lg:text-xs">
              <li className="flex items-center gap-3 text-hueso/90">
                <FaBolt className="text-orange-500 text-lg shrink-0" />
                <span><strong className="text-orange-500 uppercase">Express:</strong> +50% s/base</span>
              </li>
              <li className="flex items-center gap-3 text-hueso/90">
                <FaCloudRain className="text-blue-400 text-lg shrink-0" />
                <span><strong className="text-blue-400 uppercase">Lluvia:</strong> +30% s/base</span>
              </li>
              <li className="flex items-center gap-3 text-hueso/90">
                <FaClock className="text-yellow-300 text-lg shrink-0" />
                <span><strong className="text-yellow-300 uppercase">Espera:</strong> 0,20€/min</span>
              </li>
              <li className="flex items-center gap-3 text-hueso/90">
                <FaWeightHanging className="text-slate-400 text-lg shrink-0" />
                <span><strong className="text-slate-400 uppercase">Peso:</strong> +0,10€/kg <span className="text-[9px] opacity-60">(+30kg)</span></span>
              </li>
            </ul>
          </div>



        {/* Top Cards */}
        <div className="grid md:grid-cols-2 gap-10 my-10">

          {/* Tarifa por hora */}
          <div className="group relative rounded-3xl border border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl p-10 shadow-sm transition hover:shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="">
                <FaClock  className="text-3xl text-militar-dark bg-oliva-light p-1 rounded-full"/>
              </div>
              <h3 className="text-xl md:text-lg lg:text-xl font-semibold font-gobold tracking-wider">Tarifa por hora</h3>
            </div>

            <div className="space-y-8 font-montserrat">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-muted-foreground">Días laborables</p>
                  <p className="text-4xl font-bold mt-1 tracking-tight">22€</p>
                </div>
                <span className="text-sm text-muted-foreground mb-1">/ hora</span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-muted-foreground">Domingos y festivos</p>
                  <p className="text-4xl font-bold mt-1 tracking-tight">30€</p>
                </div>
                <span className="text-sm text-muted-foreground mb-1">/ hora</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t text-xs lg:text-sm text-muted-foreground leading-relaxed">
              Usamos la tarifa por hora para entregas con múltiples
              direcciones o fuera de Barcelona.
            </div>
          </div>

{/* Ejemplo de cálculo */}
<div className="group relative rounded-3xl border border-foreground/40 bg-linear-to-br from-oliva/5 to-oliva/20 backdrop-blur-xl p-10 shadow-sm transition hover:shadow-xl">

  <div className="flex items-center gap-4 mb-8">
    <div>
      <FaExclamationCircle className="text-3xl text-militar-dark bg-oliva-light p-1 rounded-full"/>
    </div>
    <h3 className="text-xl md:text-lg lg:text-xl font-semibold font-gobold tracking-wider">
      Ejemplo de cálculo
    </h3>
  </div>

  <div className="space-y-6 font-montserrat">

    <div className="flex justify-between border-b border-foreground/20 pb-2">
      <span className="text-sm text-muted-foreground">1 Recogida</span>
      <span className="text-lg font-semibold">2€</span>
    </div>

    <div className="flex justify-between border-b border-foreground/20 pb-2">
      <span className="text-sm text-muted-foreground">Entrega Zona 1</span>
      <span className="text-lg font-semibold">5,5€</span>
    </div>

    <div className="flex justify-between border-b border-foreground/20 pb-2">
      <span className="text-sm text-muted-foreground">Entrega Zona 3</span>
      <span className="text-lg font-semibold">9€</span>
    </div>

    <div className="flex justify-between pt-4 text-2xl font-bold">
      <span>Total</span>
      <span className="font-bold">16,5€</span>
    </div>

  </div>

  <div className="mt-8 pt-6 border-t text-xs lg:text-sm text-muted-foreground leading-relaxed">
    En Barcelona, cada servicio incluye un coste fijo de recogida (2€)
    más el precio correspondiente a la zona de entrega.
  </div>

</div>




        </div>




      {/* CTA */}
      <div className="rounded-3xl px-10 py-6 shadow-lg border border-foreground/40 bg-militar-dark">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left Side (Icon + Text) */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="text-xl">
              <CiCalculator2 className="text-oliva-light text-6xl border border-oliva-light/40 p-3 rounded-full"/>
            </div>

            <div>
              <h3 className="text-md lg:text-2xl font-bold text-hueso font-gobold tracking-widest mb-2">
                Calcula tu envío
              </h3>
              <p className="text-hueso/70 text-xs lg:text-sm max-w-md font-montserrat">
                Introduce origen, destino y detalles de carga
                para obtener un precio estimado al instante.
              </p>
            </div>
          </div>

          <Link href="/calculador" >
          <button className="calc-button text-xs lg:text-sm font-semibold">
            Calcular (Barcelona)
          </button>
          </Link>


        {/* <TooltipProvider>
          <Tooltip>
           <TooltipTrigger asChild>
          <button className="calc-button text-xs lg:text-sm font-semibold">
            Calcular (Barcelona)
          </button>
        </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-center border border-foreground/40 text-hueso">
             Este servicio actualmente no está disponible debido a mantenimiento y mejoras.
          </TooltipContent>
            </Tooltip>
        </TooltipProvider> */}
        </div>
      </div>


      </div>
    </section>
  );
}
