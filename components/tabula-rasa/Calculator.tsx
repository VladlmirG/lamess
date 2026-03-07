"use client";

import React from "react"; // <<< ADD THIS
import { useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, useMap, Tooltip as LeafletTooltip } from "react-leaflet";
import L, { LatLngExpression, LatLng } from "leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { CiCalculator2 } from "react-icons/ci";
import { FaRegCircleDot, FaArrowTrendUp } from "react-icons/fa6";
import { IoBicycle, IoLocationSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip as ShadTooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { IoMdRefreshCircle } from "react-icons/io";

import { FaCity, FaExclamationCircle, FaCheckCircle, FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import {  FaCalendarDay } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { BiMapPin } from "react-icons/bi";


type Zona = { zona: string; lab: string; fes: string; codes: string[] };

const tarifasBarcelona: Zona[] = [
  { zona:"Zona 1", lab:"5,5", fes:"9", codes:["08006","08007","08008","08009","08010","08011","08012","08013","08021","08025","08036","08037"]},
  { zona:"Zona 2", lab:"7,5", fes:"11", codes:["08001","08002","08003","08015","08018","08026","08029"]},
  { zona:"Zona 3", lab:"9", fes:"12", codes:["08004","08005","08014","08016","08019","08020","08027","08028","08030","08041"]},
  { zona:"Zona 4", lab:"10", fes:"13", codes:["08017","08022","08023","08024","08031","08032","08033","08034","08035","08042"]},
];

const tarifasMadrid: Zona[] = [
  { zona:"Zona 1", lab:"5,5", fes:"8,5", codes:["28001","28004","28005","28008","28012","28013","28014","28015"]},
  { zona:"Zona 2", lab:"7,5", fes:"10,5", codes:["28002","28003","28006","28007","28009","28010","28011","28017","28019","28045"]},
  { zona:"Zona 3", lab:"10", fes:"13,5", codes:["28016","28018","28020","28025","28027","28028","28029","28030","28039","28040"]},
  { zona:"Zona 4", lab:"13", fes:"16,5", codes:["28022","28031","28032","28033","28034","28035","28036","28037","28038","28041"]},
  { zona:"Zona 5", lab:"15", fes:"18,5", codes:["28043","28044","28047","28048"]},
];

const OriginIcon = new L.DivIcon({
  className:"",
  html:ReactDOMServer.renderToString(<FaRegCircleDot style={{color:"#456FFF", fontSize:"24px"}} />),
  iconSize:[24,24],
  iconAnchor:[14,28],
});

const DestinationIcon = new L.DivIcon({
  className:"",
  html:ReactDOMServer.renderToString(<IoLocationSharp style={{color:"#e94235", fontSize:"38px"}} />),
  iconSize:[38,38],
  iconAnchor:[14,28],
});

const ChangeView = ({center}:{center:LatLngExpression})=>{
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};



const extractPostcode = (address: string) => {
  const match = address.match(/\b\d{5}\b/);
  return match ? match[0] : undefined;
};

export default function Calculator(){

  const [city, setCity] = useState<"Barcelona"|"Madrid">("Barcelona");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [markerOrigin, setMarkerOrigin] = useState<LatLng|null>(null);
  const [markerDest, setMarkerDest] = useState<LatLng|null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>(new L.LatLng(41.3851,2.1734));
  const [dayOfWeek, setDayOfWeek] = useState<number>(new Date().getDay());
  const [price, setPrice] = useState<number|null>(null);
  const [receipt, setReceipt] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [holidayNotice, setHolidayNotice] = useState<string|null>(null);

  const originPlaceholder =
    city === "Barcelona"
      ? "Ej: Passeig de Gràcia 60, 08007 Barcelona"
      : "Ej: Calle de Alcalá 45, 28014 Madrid";

  const destinationPlaceholder =
    city === "Barcelona"
      ? "Ej: Avinguda Diagonal 420, 08037 Barcelona"
      : "Ej: Paseo de la Castellana 95, 28046 Madrid";

  const handleCityChange = (newCity: "Barcelona" | "Madrid") => {
    setCity(newCity);
    setOrigin("");
    setDestination("");
    setMapCenter(newCity === "Barcelona" ? new L.LatLng(41.3851,2.1734) : new L.LatLng(40.4168,-3.7038));
    setPrice(null);
    setReceipt([]);
    setMarkerOrigin(null);
    setMarkerDest(null);
    setErrorMsg(null);
    setHolidayNotice(null);
  };

  const geocode = async(address:string):Promise<LatLng|null>=>{
    try{
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data:Array<{lat:string;lon:string}> = await res.json();
      if(data.length>0) return new L.LatLng(parseFloat(data[0].lat),parseFloat(data[0].lon));
      return null;
    }catch{
      return null;
    }
  };

  const findZone = (postcode:string|undefined)=>{
    if(!postcode) return undefined;
    const tarifas = city==="Barcelona"? tarifasBarcelona: tarifasMadrid;
    return tarifas.find(z => z.codes.includes(postcode));
  };

  const calculatePrice = async()=>{
    if(!destination) return;

    setLoading(true);
    setErrorMsg(null);

    try{
      const originCoords = origin ? await geocode(origin) : null;
      const destCoords = await geocode(destination);

      if(!destCoords){
        setErrorMsg("Destino no encontrado");
        setLoading(false);
        return;
      }

      setMarkerDest(destCoords);
      if(originCoords) setMarkerOrigin(originCoords);
      setMapCenter(destCoords);

      const originPost = origin ? extractPostcode(origin) : undefined;
      const destPost = extractPostcode(destination);

      const originZone = findZone(originPost);
      const destZone = findZone(destPost);

      const isSunday = dayOfWeek === 0;
      const isFestive = isSunday;

      const steps:string[] = [];
      let total = 0;

      const dayNames = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
      const dayName = dayNames[dayOfWeek];

      steps.push(`Ciudad: ${city}`);
      steps.push(`Día de entrega: ${dayName}`);

      if(origin){
        steps.push(`Origen: ${origin}`);
        steps.push(`CP origen: ${originPost??"no detectado"}`);
        steps.push(`Zona origen: ${originZone?.zona??"fuera de zona"}`);
      }

      steps.push(`Destino: ${destination}`);
      steps.push(`CP destino: ${destPost??"no detectado"}`);
      steps.push(`Zona destino: ${destZone?.zona??"fuera de zona"}`);

      if(city==="Barcelona"){
        if(destZone){
          const base = parseFloat((isFestive ? destZone.fes : destZone.lab).replace(",", "."));
          steps.push(`Tarifa ${isFestive?"festiva":"laborable"}: ${base.toFixed(2)}€`);
          steps.push(`Recogida fija: +2.00€`);
          total = base + 2;
        }else{
          const hourly = isFestive ? 30 : 22;
          steps.push("Destino fuera de zonas");
          steps.push(`Tarifa por hora aplicada: ${hourly}€`);
          total = hourly;
        }
      }else{
        if(destZone){
          const base = parseFloat((isFestive ? destZone.fes : destZone.lab).replace(",", "."));
          steps.push(`Tarifa ${isFestive?"festiva":"laborable"}: ${base.toFixed(2)}€`);
          total = base;
        }else{
          const base = isFestive ? 30 : 19;
          steps.push("Destino fuera de zonas");
          steps.push(`Tarifa mínima aplicada: ${base}€`);
          total = base;
        }
      }

      steps.push(`TOTAL: ${total.toFixed(2)}€`);
      setReceipt(steps);

      setPrice(total);
      setHolidayNotice(`Nota: si el día es festivo, se aplicará la tarifa ${city === "Barcelona" ? "festiva de Barcelona" : "de Madrid"}.`);

    }catch{
      setErrorMsg("Error calculando precio");
    }
    finally{
      setLoading(false);
    }
  };

  const dayNames = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

const isButtonDisabled = !origin.trim() || !destination.trim();
const buttonText = loading 
  ? "Calculando..." 
  : isButtonDisabled 
    ? "Introduce las direcciones" 
    : "Calcular";

  return (
    <TooltipProvider>
    <section className="max-w-380 mx-auto py-8 px-0 md:px-4">
             {/* Title & Subtitle Centered */}
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 font-gobold tracking-wide">
            <span className="text-oliva-light">Calculador</span> de precio

          </h2>
          <p className="text-foreground/75 text-sm md:text-lg mb-2 font-montserrat">
            Calcula un precio estimado en segundos. Selecciona ciudad, origen, destino y detalles de la entrega.
          </p>
          <p className="text-xs text-foreground/60 font-montserrat">
            Disponible de Lunes a Sabado · 6:00 – 20:00 | Domingos . 6:00 - 16:00
          </p>
        </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-3/5 flex flex-col gap-4 p-6 border rounded-lg shadow-m border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl shadow-sm transition hover:shadow-xl">

          <div className="flex gap-4 items-center mb-2">
            <div className="bg-militar-dark rounded-full p-2 border border-oliva-light">
               <IoBicycle className="text-4xl text-oliva-light" />
            </div>
            <Select value={city} onValueChange={handleCityChange}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Selecciona ciudad" />
              </SelectTrigger>
              <SelectContent className="p-3 font-bold font-montserrat">
                <SelectItem value="Barcelona" className="cursor-pointer">Barcelona</SelectItem>
                <SelectItem value="Madrid" className="cursor-pointer">Madrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-10 text-xs">
              <span className="text-foreground/60">Para un cálculo más preciso, ingresa las direcciones siguiendo el formato de los ejemplos de los campos.</span>
          </div>

          <div className="mb-6">
            <Label className="font-gobold tracking-wide mb-2">Origen</Label>
            <Input placeholder={originPlaceholder} value={origin} onChange={(e)=>setOrigin(e.target.value)} />
          </div>

          <div className="mb-8">
            <Label className="font-gobold tracking-wide mb-2">Destino</Label>
            <Input placeholder={destinationPlaceholder} value={destination} onChange={(e)=>setDestination(e.target.value)} />
          </div>

          <div className="mb-10">
            <Label className="font-gobold tracking-wide mb-2">Día de entrega</Label>
<Select value={dayOfWeek.toString()} onValueChange={(v)=>setDayOfWeek(parseInt(v))}>
  <SelectTrigger className="w-full cursor-pointer">
    <SelectValue placeholder="Selecciona día" />
  </SelectTrigger>

  <SelectContent className="p-4 font-bold font-montserrat">
    {dayNames.map((d,i)=>(
      <SelectItem key={i} value={i.toString()} className="cursor-pointer">
        {d.charAt(0).toUpperCase() + d.slice(1)}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

<p className="text-xs text-foreground/70 mt-3 leading-relaxed">
  {city === "Barcelona" ? (
    <>
      En Barcelona, cada servicio incluye un coste fijo de recogida (2€) más el precio correspondiente a la zona de entrega. Ver{" "}
      <Link
        href="/tarifas-barcelona"
        className="text-oliva hover:text-oliva/60 underline"
      >
         tarifas Barcelona
      </Link>{" "}
      para entender el sistema.
    </>
  ) : (
    <>
      En Madrid no existe un suplemento fijo de recogida. El precio se aplica por cada punto, ya sea recogida o entrega. Ver{" "}
      <Link
        href="/tarifas-madrid"
        className="text-oliva hover:text-oliva/60 underline"
      >
         tarifas Madrid
      </Link>{" "}
      para entender el sistema.
    </>
  )}
</p>

{holidayNotice && (
  <p className="text-orange-500 text-sm mt-1">{holidayNotice}</p>
)}

</div>


<div className="mt-4 flex gap-4 items-center">
  <button
    onClick={calculatePrice}
    className={`flex gap-1 justify-center items-center w-full cursor-pointer calc-button text-xs md:text-base ${isButtonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
    disabled={isButtonDisabled || loading}
  >
    {loading ? (
      buttonText
    ) : (
      <>
        <CiCalculator2 className="text-2xl" /> {buttonText}
      </>
    )}
  </button>

  <ShadTooltip>
    <TooltipTrigger asChild>
      <button
        onClick={() => {
          setOrigin("");
          setDestination("");
          setMarkerOrigin(null);
          setMarkerDest(null);
          setPrice(null);
          setReceipt([]);
          setErrorMsg(null);
          setHolidayNotice(null);
          setMapCenter(city === "Barcelona" ? new L.LatLng(41.3851, 2.1734) : new L.LatLng(40.4168, -3.7038));
        }}
        className="text-foreground/90 border border-foreground/60 hover:text-oliva text-4xl p-1 rounded-full cursor-pointer"
      >
        <IoMdRefreshCircle />
      </button>
    </TooltipTrigger>
    <TooltipContent>Limpiar campos</TooltipContent>
  </ShadTooltip>
</div>

  {errorMsg && <p className="text-red-600 font-bold mt-2">{errorMsg}</p>}

{price !== null && (
  <div className="mt-4 space-y-3">
    <div className="text-xl font-bold flex items-center gap-2">
      <FaCheckCircle className="text-green-500" /> Precio estimado: {price.toFixed(2)}€
    </div>

    <div className="bg-militar-dark text-hueso p-4 rounded-md font-mono text-[9px] md:text-xs shadow-inner border border-oliva-light">
      {(() => {
        const iconMap: Record<string, React.JSX.Element> = {
          "Ciudad": <FaCity className="inline text-hueso mr-1" />,
          "Día de entrega": <FaCalendarDay className="inline text-hueso mr-1" />,
          "Origen": <FaRegCircleDot className="inline text-blue-500 mr-1" />,
          "CP origen": <GoPackage className="inline text-hueso mr-1" />,
          "Zona origen": <BiMapPin className="inline text-hueso mr-1" />,
          "Destino": <IoLocationSharp className="inline text-red-500 mr-1" />,
          "CP destino": <GoPackage className="inline text-hueso mr-1" />,
          "Zona destino": <BiMapPin className="inline text-hueso mr-1" />,
          "Tarifa festiva": <FaArrowTrendUp className="inline text-orange-500 mr-1" />,
          "Recogida fija": <FaExclamationCircle className="inline text-yellow-600 mr-1" />,
          "TOTAL": <FaCheckCircle className="inline text-green-600 mr-1" />,
        };

return receipt.map((line, i) => {
  const hasColon = line.includes(":");
  const [key, value] = hasColon ? line.split(":") : [line, ""];
  const cleanKey = key.trim();
  const cleanValue = value?.trim();

  const isHeaderSpacing =
    cleanKey === "Día de entrega";

  const showDivider = cleanKey === "Destino";

  const isImportant =
    cleanValue?.toLowerCase().includes("fuera de zonas") ||
    cleanValue?.toLowerCase().includes("mínima") ||
    cleanValue?.toLowerCase().includes("festiva");

  const isSpecialWarning =
    cleanKey === "Destino fuera de zonas" ||
    cleanKey === "Tarifa por hora aplicada";

  return (
    <div key={i}>
      {showDivider && (
        <div className="border-t border-oliva-light my-3"></div>
      )}

      <div
        className={`flex items-start gap-1 ${
          isImportant || isSpecialWarning ? "text-white" : ""
        } ${isHeaderSpacing ? "mb-8" : "mb-4"}`}
      >
        <span className={`font-bold flex items-center gap-1 font-montserrat text-[9px] md:text-xs ${
          isSpecialWarning ? "text-red-400" : "text-oliva-light"
        }`}>
          {iconMap[cleanKey] ?? null}
          {cleanKey}
          {hasColon && ":"}
        </span>

        {hasColon && <span>{cleanValue}</span>}
      </div>
    </div>
  );
});
      })()}
    </div>
  </div>
)}

</div>

<div className="flex flex-col space-y-6 w-full">
  {/* Mapa */}
  <div className="w-full h-125 rounded-md overflow-hidden border shadow-md z-10">
    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom className="w-full h-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ChangeView center={mapCenter} />

      {markerOrigin && (
        <Marker position={markerOrigin} icon={OriginIcon}>
          <LeafletTooltip permanent direction="top" offset={[0, -30]}>
            Origen
          </LeafletTooltip>
        </Marker>
      )}

      {markerDest && (
        <Marker position={markerDest} icon={DestinationIcon}>
          <LeafletTooltip permanent direction="top" offset={[0, -30]}>
            Destino
          </LeafletTooltip>
        </Marker>
      )}
    </MapContainer>
  </div>

  {/* CTA debajo del mapa */}
  <div className="w-full rounded-3xl px-10 py-6 shadow-lg border border-foreground/40 bg-militar-dark">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left side */}
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
        <div>
          <h3 className="text-md lg:text-2xl  font-bold text-hueso font-gobold tracking-widest mb-2">
            ¿Necesitas ayuda con tu envío?
          </h3>
          <p className="text-hueso/70 text-xs lg:text-sm max-w-md font-montserrat">
            Si tienes dudas o necesitas un presupuesto personalizado,
            puedes contactarnos directamente.
          </p>
        </div>
      </div>

      {/* Right side: iconos con tooltip */}
      <div className="flex items-center gap-6">
        <TooltipProvider>
          <ShadTooltip>
            <TooltipTrigger asChild>
              <a
                href="https://wa.me/34930070113"
                target="_blank"
                className="text-3xl border border-oliva-light/40 p-3 rounded-full text-oliva-light hover:bg-oliva/20 transition"
              >
                <FaWhatsapp />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>WhatsApp</p>
            </TooltipContent>
          </ShadTooltip>

          <ShadTooltip>
            <TooltipTrigger asChild>
              <a
                href="tel:+34930070113"
                className="text-3xl border border-oliva-light/40 p-3 rounded-full text-oliva-light hover:bg-oliva/20 transition"
              >
                <FaPhone />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Llamar</p>
            </TooltipContent>
          </ShadTooltip>

          <ShadTooltip>
            <TooltipTrigger asChild>
              <a
                href="mailto:administracion@lamess.es"
                target="_blank"
                className="text-3xl border border-oliva-light/40 p-3 rounded-full text-oliva-light hover:bg-oliva/20 transition"
              >
                <FaEnvelope />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Email</p>
            </TooltipContent>
          </ShadTooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</div>

      </div>
    </section>
    </TooltipProvider>
  );
}
