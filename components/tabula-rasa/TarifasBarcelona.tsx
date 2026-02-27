"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaClock, FaCalculator, FaExclamationCircle } from "react-icons/fa";
import { IoIosBicycle } from "react-icons/io";
import { PiPackageLight } from "react-icons/pi";
import { PiHandCoinsFill } from "react-icons/pi";


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

  return (
    <section className="relative w-full py-16">
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

        {/* Top Cards */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">

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

          {/* Recogida fija */}
          <div className="relative rounded-3xl border border-foreground/40 bg-linear-to-br from-oliva/5 to-oliva/20 backdrop-blur-xl p-10 shadow-sm transition hover:shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="">
                <FaExclamationCircle className="text-3xl text-militar-dark bg-oliva-light p-1 rounded-full"/>
              </div>
              <h3 className="text-xl md:text-lg lg:text-xl font-semibold font-gobold tracking-wider">Recogida fija</h3>
            </div>

            <div className="flex items-baseline gap-3 font-montserrat">
              <span className="text-6xl md:text-5xl lg:text-8xl font-bold tracking-tight">2€</span>
              <span className="text-muted-foreground">por entrega</span>
            </div>

            <p className="mt-6 text-xs lg:text-sm  text-muted-foreground">
              Coste fijo añadido a cada servicio.
            </p>
          </div>
        </div>

        {/* Zonas Table */}
        <div className="rounded-3xl border border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl shadow-xl overflow-hidden mb-20">

          {/* Header Area */}
          <div className="p-6 md:p-10 border-b border-b-foreground/60 flex items-center gap-6 font-montserrat">
            <div className="rounded-xl bg-primary/10 text-primary">
              <PiHandCoinsFill className="text-4xl md:text-5xl text-militar-dark bg-oliva-light p-2 rounded-full"/>
            </div>
            <div>
              <h3 className="text-md md:text-xl font-gobold">Tarifas por zona</h3>
              <p className="text-[9px] md:text-sm text-muted-foreground">Precios según código postal</p>
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

        {/* CTA */}
        <div className="rounded-3xl border bg-linear-to-r from-primary to-primary/80 text-white p-14 text-center shadow-lg">
          <div className="flex justify-center mb-6 text-3xl">
            <FaCalculator />
          </div>
          <h3 className="text-3xl font-bold mb-4">Calcula tu envío</h3>
          <p className="mb-10 max-w-xl mx-auto text-white/80">
            Introduce origen, destino y detalles de carga
            para obtener un precio estimado al instante.
          </p>
          <button className="rounded-xl bg-white text-black px-8 py-4 text-sm font-semibold hover:scale-105 transition">
            Calcular (Barcelona)
          </button>
        </div>

      </div>
    </section>
  );
}
