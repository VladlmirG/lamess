"use client";

import React, { useState, useEffect, useCallback } from "react"; // Añadido useEffect
import Link from "next/link";
import { MapContainer, TileLayer, Marker, useMap, Tooltip as LeafletTooltip, Polyline } from "react-leaflet";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner"; // <--- Importación de Sonner
import { CiCalculator2 } from "react-icons/ci";
import { FaRegCircleDot, FaPlus, FaTrashCan, FaCloudRain, FaWeightHanging, FaBolt, FaClock } from "react-icons/fa6";
import { IoBicycle, IoLocationSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip as ShadTooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { IoMdRefreshCircle } from "react-icons/io";
import { FaCity, FaExclamationCircle, FaCheckCircle, FaWhatsapp, FaPhone, FaEnvelope, FaLeaf } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { BiMapPin } from "react-icons/bi";
import { AiOutlineRise } from "react-icons/ai";

type Zona = { zona: string; lab: string; fes: string; codes: string[] };

type Address = {
  tipoVia: string;
  nombre: string;
  numero: string;
  cp: string;
  id: number;
};

type CityType = "Barcelona" | "Madrid";

const WAY_TYPES: Record<CityType, string[]> = {
  Barcelona: ["Carrer", "Avinguda", "Plaça", "Passeig", "Ronda", "Travessera", "Via"],
  Madrid: ["Calle", "Avenida", "Plaza", "Paseo", "Ronda", "Glorieta", "Carretera"]
};

const dayNames = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

const tarifasBarcelona: Zona[] = [
  { zona: "Zona 1", lab: "5,5", fes: "9", codes: ["08006", "08007", "08008", "08009", "08010", "08011", "08012", "08013", "08021", "08025", "08036", "08037"] },
  { zona: "Zona 2", lab: "7,5", fes: "11", codes: ["08001", "08002", "08003", "08015", "08018", "08026", "08029"] },
  { zona: "Zona 3", lab: "9", fes: "12", codes: ["08004", "08005", "08014", "08016", "08019", "08020", "08027", "08028", "08030", "08041"] },
  { zona: "Zona 4", lab: "10", fes: "13", codes: ["08017", "08022", "08023", "08024", "08031", "08032", "08033", "08034", "08035", "08042"] },
];

const tarifasMadrid: Zona[] = [
  { zona: "Zona 1", lab: "5,5", fes: "8,5", codes: ["28001", "28004", "28005", "28008", "28012", "28013", "28014", "28015"] },
  { zona: "Zona 2", lab: "7,5", fes: "10,5", codes: ["28002", "28003", "28006", "28007", "28009", "28010", "28011", "28017", "28019", "28045"] },
  { zona: "Zona 3", lab: "10", fes: "13,5", codes: ["28016", "28018", "28020", "28025", "28027", "28028", "28029", "28030", "28039", "28040"] },
  { zona: "Zona 4", lab: "13", fes: "16,5", codes: ["28022", "28031", "28032", "28033", "28034", "28035", "28036", "28037", "28038", "28041"] },
  { zona: "Zona 5", lab: "15", fes: "18,5", codes: ["28043", "28044", "28047", "28048"] },
];

const OriginIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const DestinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});


const ChangeView = ({ coords }: { coords: LatLng[] }) => {
  const map = useMap();
  if (coords.length > 0) {
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function Calculator() {
  const [city, setCity] = useState<CityType>("Barcelona");
  const [origin, setOrigin] = useState<Address>({ tipoVia: city === "Barcelona" ? "Carrer" : "Calle", nombre: "", numero: "", cp: "", id: Date.now() });
  const [destinations, setDestinations] = useState<Address[]>([{ tipoVia: city === "Barcelona" ? "Carrer" : "Calle", nombre: "", numero: "", cp: "", id: Date.now() + 1 }]);
  const [markerOrigin, setMarkerOrigin] = useState<LatLng | null>(null);
  const [markerDests, setMarkerDests] = useState<LatLng[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState<number>(new Date().getDay());
  const [price, setPrice] = useState<number | null>(null);
  const [impact, setImpact] = useState<{ km: number; co2: number } | null>(null);
  const [receipt, setReceipt] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [holidayNotice, setHolidayNotice] = useState<string | null>(null);

  const [isRainy, setIsRainy] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const [weight, setWeight] = useState<string>("");
  const [waitTime, setWaitTime] = useState<string>("");

// --- NUEVA LÓGICA DE TOAST (SONNER) ---
  const showGuia = useCallback(() => {
    const TOAST_ID = "guia-tarifas-mess";
    toast.custom((t) => (
      <div className="border border-foreground/40 bg-linear-to-br from-militar/80 to-oliva/50 backdrop-blur-xl p-5 lg:p-8 rounded-2xl w-full font-montserrat shadow-2xl animate-in fade-in slide-in-from-left-4 ml-0 md:ml-8 mt-[18vh] lg:mt-[12vh] h-auto max-h-[85vh] overflow-y-auto">
        
        {/* CABECERA: Reducida en pantallas medianas */}
        <div className="flex items-center gap-3 mb-4 lg:mb-6 border-b-2 border-militar-dark/90 pb-3 lg:pb-4">
          <div className="bg-militar-dark text-oliva-light p-2 lg:p-3 rounded-full animate-pulse shrink-0">
            <CiCalculator2 className="text-lg lg:text-2xl" />
          </div>
          <h3 className="font-gobold tracking-widest text-md lg:text-xl text-oliva-light uppercase">
            Guía de Tarifas {city}
          </h3>
        </div>

        {/* SECCIÓN DINÁMICA: Texto más balanceado */}
        <div className="mb-4 lg:mb-6 space-y-2 lg:space-y-3">
          <h4 className="text-[10px] lg:text-[12px] font-montserrat text-oliva-light uppercase font-semibold tracking-wider">
            Sistema en {city}:
          </h4>
          <div className="text-[11px] lg:text-[14px] text-hueso/80 space-y-2">
            {city === "Barcelona" ? (
              <>
                <p>• <span className="font-bold uppercase text-[9px] lg:text-[11px] text-hueso">Recogida Fija:</span> 2,00€ por servicio.</p>
                <p>• <span className="font-bold uppercase text-[9px] lg:text-[11px] text-hueso">Entrega:</span> Según zona (de 5,5€ a 10€). Zonas basadas en códigos postales periféricos.</p>
              </>
            ) : (
              <>
                <p>• <span className="font-bold uppercase text-[9px] lg:text-[11px] text-hueso">Puntos:</span> Se suma la tarifa de Origen + Destino.</p>
                <p>• <span className="font-bold uppercase text-[9px] lg:text-[11px] text-hueso">Zonas:</span> 5 anillos concéntricos (de 5,5€ a 15€ por punto). Rutas transversales se calculan por suma de zonas.</p>
              </>
            )}
          </div>
        </div>

        <div className="h-px bg-militar-dark/90 w-full mb-4 lg:mb-5"></div>

        {/* EXTRAS: Tu texto original con iconos escalados */}
        <h4 className="text-[10px] lg:text-[12px] font-montserrat text-oliva-light uppercase font-semibold tracking-wider mb-2 lg:mb-3">
          Extras de Servicio:
        </h4>
        <ul className="space-y-2 lg:space-y-3 text-[11px] lg:text-[14px] text-hueso/80">
          <li className="flex items-start gap-2">
            <FaBolt className="text-orange-500 mt-0.5 shrink-0 lg:text-lg" />
            <span><strong className="text-orange-500 uppercase">Express:</strong> +50% (Prioridad absoluta).</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCloudRain className="text-blue-500 mt-0.5 shrink-0 lg:text-lg" />
            <span><strong className="text-blue-500 uppercase">Lluvia:</strong> +30% (Seguridad y clima).</span>
          </li>
          <li className="flex items-start gap-2">
            <FaClock className="text-yellow-300 mt-0.5 shrink-0 lg:text-lg" />
            <span><strong className="text-yellow-300 uppercase">Espera:</strong> 0,20€/min (Tras cortesía).</span>
          </li>
          <li className="flex items-start gap-2">
            <FaWeightHanging className="text-slate-300 mt-0.5 shrink-0 lg:text-lg" />
            <span><strong className="text-slate-300 uppercase">Peso:</strong> +0,10€/kg (A partir de 30kg).</span>
          </li>
        </ul>

        {/* NOTA: Más pequeña para ahorrar espacio vertical */}
        <div className="mt-4 lg:mt-6 p-2 lg:p-3 bg-oliva-light/40 rounded-md border border-militar-dark/40 text-[9px] lg:text-[11px] italic text-militar-dark/80 font-montserrat tracking-wide">
          * Los precios base mostrados en el calculador son estimaciones sujetas a condiciones finales de tráfico y carga.
        </div>

        {/* BOTÓN: Altura reducida */}
        <button
          onClick={() => toast.dismiss(t)}
          className="w-full mt-4 lg:mt-6 bg-militar-dark text-hueso py-3 lg:py-4 rounded-xl font-gobold text-[11px] lg:text-[13px] tracking-[0.2em] uppercase hover:bg-oliva-light hover:text-militar-dark transition-all active:scale-95 cursor-pointer shadow-xl"
        >
          Lo tengo, empezar
        </button>
      </div>
    ), {
      id: TOAST_ID,
      duration: Infinity,
      position: "top-left",
    });
  }, [city]); // <-- Añadimos [city] aquí porque la función depende de la ciudad

  useEffect(() => {
    const timer = setTimeout(() => {
      showGuia();
    }, 1500);

    return () => {
      clearTimeout(timer);
      toast.dismiss("guia-tarifas-mess");
    };
  }, [showGuia]); // <-- Ahora el useEffect depende de showGuia


   {/* conectado a el scroll a resultados despues de calcular */}
  const resultRef = React.useRef<HTMLDivElement>(null);


  const handleCityChange = (newCity: CityType) => {
    setCity(newCity);
    const defaultVia = newCity === "Barcelona" ? "Carrer" : "Calle";
    setOrigin({ tipoVia: defaultVia, nombre: "", numero: "", cp: "", id: Date.now() });
    setDestinations([{ tipoVia: defaultVia, nombre: "", numero: "", cp: "", id: Date.now() + 1 }]);
    setPrice(null);
    setImpact(null);
    setReceipt([]);
    setMarkerOrigin(null);
    setMarkerDests([]);
    setErrorMsg(null);
    setHolidayNotice(null);
    setIsRainy(false);
    setIsExpress(false);
    setWeight("");
    setWaitTime("");
  };

  const addDestination = () => {
    const defaultVia = city === "Barcelona" ? "Carrer" : "Calle";
    setDestinations([...destinations, { tipoVia: defaultVia, nombre: "", numero: "", cp: "", id: Date.now() }]);
  };

  const removeDestination = (id: number) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter(d => d.id !== id));
      setMarkerDests([]);
      setMarkerOrigin(null);
      setPrice(null);
      setImpact(null);
      setReceipt([]);
    }
  };

  const updateDestination = (id: number, field: keyof Address, value: string) => {
    setDestinations(destinations.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const formatAddress = (addr: Address | undefined, currentCity: string) => {
    if (!addr || !addr.nombre || !addr.numero || !addr.cp) return "";
    return `${addr.tipoVia} ${addr.nombre} ${addr.numero}, ${addr.cp} ${currentCity}`;
  };

  const geocode = async (address: string): Promise<LatLng | null> => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await res.json();
      if (data.length > 0) return new L.LatLng(parseFloat(data[0].lat), parseFloat(data[0].lon));
      return null;
    } catch { return null; }
  };

  const findZone = (postcode: string | undefined) => {
    if (!postcode) return undefined;
    const tarifas = city === "Barcelona" ? tarifasBarcelona : tarifasMadrid;
    return tarifas.find(z => z.codes.includes(postcode));
  };

  const isFullAddress = (addr: Address) => addr.nombre.trim() !== "" && addr.numero.trim() !== "" && addr.cp.trim().length >= 5;

  const calculatePrice = async () => {
    if (!isFullAddress(origin) || destinations.some(d => !isFullAddress(d))) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const originCoords = await geocode(formatAddress(origin, city));
      if (!originCoords) throw new Error("No hemos podido localizar la dirección de origen.");
      const destCoordsPromises = destinations.map(d => geocode(formatAddress(d, city)));
      const destCoordsResults = await Promise.all(destCoordsPromises);
      if (destCoordsResults.some(c => c === null)) throw new Error("Una o más direcciones de destino no son válidas.");

      setMarkerOrigin(originCoords);
      setMarkerDests(destCoordsResults as LatLng[]);

      const isFestive = dayOfWeek === 0;
      const steps: string[] = [];
      let total = 0;

      steps.push(`Ciudad: ${city}`);
      steps.push(`Día de entrega: ${dayNames[dayOfWeek]}`);
      steps.push(`Origen: ${formatAddress(origin, city)}`);
      steps.push(`CP origen: ${origin.cp}`);

      if (city === "Barcelona") {
        total = 2;
        steps.push(`Recogida fija: +2.00€`);
        destinations.forEach((d, idx) => {
          const dZone = findZone(d.cp);
          steps.push(`Destino ${idx + 1}: ${formatAddress(d, city)}`);
          steps.push(`CP destino ${idx + 1}: ${d.cp}`);
          if (dZone) {
            const base = parseFloat((isFestive ? dZone.fes : dZone.lab).replace(",", "."));
            steps.push(`${isFestive ? "Tarifa base festivo" : "Tarifa base"} ${idx + 1}: ${base.toFixed(2)}€`);
            steps.push(`Zona entrega ${idx + 1}: ${dZone.zona}`);
            total += base;
          } else {
            const hourly = isFestive ? 30 : 22;
            steps.push(`${isFestive ? "Entrega festiva" : "Entrega"} ${idx + 1} (Fuera de zona): ${hourly.toFixed(2)}€`);
            total += hourly;
          }
        });
      } else {
        const hourlyRate = isFestive ? 30 : 19;
        const originZone = findZone(origin.cp);
        const originPrice = originZone ? parseFloat((isFestive ? originZone.fes : originZone.lab).replace(",", ".")) : hourlyRate;
        steps.push(`Zona origen: ${originZone?.zona || "Fuera de zona"}`);
        steps.push(`${isFestive ? "Recogida festiva" : "Recogida"} (${originZone?.zona || "Fuera"}): ${originPrice.toFixed(2)}€`);
        total += originPrice;
        destinations.forEach((d, idx) => {
          const dZone = findZone(d.cp);
          const dPrice = dZone ? parseFloat((isFestive ? dZone.fes : dZone.lab).replace(",", ".")) : hourlyRate;
          steps.push(`Destino ${idx + 1}: ${formatAddress(d, city)}`);
          steps.push(`CP destino ${idx + 1}: ${d.cp}`);
          steps.push(`Zona destino ${idx + 1}: ${dZone?.zona || "Fuera de zona"}`);
          steps.push(`${isFestive ? "Tarifa base festivo" : "Tarifa base"} ${idx + 1}: ${dPrice.toFixed(2)}€`);
          total += dPrice;
        });
      }

      const baseSubtotal = total;
      if (isExpress) { const ex = baseSubtotal * 0.5; total += ex; steps.push(`Extra Express (+50%): ${ex.toFixed(2)}€`); }
      if (isRainy) { const rain = baseSubtotal * 0.3; total += rain; steps.push(`Extra Lluvia (+30%): ${rain.toFixed(2)}€`); }
      const weightVal = parseFloat(weight) || 0;
      if (weightVal > 30) { const extraW = weightVal * 0.1; total += extraW; steps.push(`Extra Peso (${weightVal}kg): ${extraW.toFixed(2)}€`); }
      const waitVal = parseInt(waitTime) || 0;
      if (waitVal > 0) { const extraT = waitVal * 0.2; total += extraT; steps.push(`Extra Espera (${waitVal}min): ${extraT.toFixed(2)}€`); }

      steps.push(`TOTAL: ${total.toFixed(2)}€`);
      setReceipt(steps);
      setPrice(total);

      // Bloque responsable del scroll automatico a los resultados despues de calcular
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 150);

      let totalKm = 0;
      let lastCoord = originCoords;
      destCoordsResults.forEach((coord) => { if (coord) { totalKm += calculateDistance(lastCoord.lat, lastCoord.lng, coord.lat, coord.lng); lastCoord = coord; } });
      const realKm = totalKm * 1.3;
      setImpact({ km: realKm, co2: realKm * 0.150 });
      setHolidayNotice(isFestive ? "Nota: Se está aplicando la tarifa festiva de domingo." : "Nota: Si el día de entrega es festivo oficial, se aplicará la tarifa festiva correspondiente.");
    } catch (e: unknown) { setErrorMsg(e instanceof Error ? e.message : "Error"); } finally { setLoading(false); }
  };

  return (
    <TooltipProvider>
      <section className="max-w-380 mx-auto py-8 px-0 md:px-4">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 font-gobold tracking-wide"><span className="text-oliva-light">Calculador</span> de precio</h2>
          <p className="text-foreground/75 text-sm md:text-lg mb-2 font-montserrat">Calcula un precio estimado en segundos. Selecciona ciudad, origen, destino y detalles de la entrega.</p>
          <p className="text-xs text-foreground/60 font-montserrat">Disponible de Lunes a Sabado · 6:00 – 20:00 | Domingos . 6:00 - 16:00</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <div className="xl:w-3/5 flex flex-col gap-4 p-6 border rounded-lg shadow-m border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl shadow-sm transition hover:shadow-xl">
            
            <div className="flex gap-4 items-center mb-6">
              <div className="bg-militar-dark rounded-full p-2 border border-oliva-light"><IoBicycle className="text-4xl text-oliva-light" /></div>
              <Select value={city} onValueChange={(v: CityType) => handleCityChange(v)}>
                <SelectTrigger className="w-full cursor-pointer"><SelectValue placeholder="Selecciona ciudad" /></SelectTrigger>
                <SelectContent className="p-3 font-bold font-montserrat"><SelectItem value="Barcelona">Barcelona</SelectItem><SelectItem value="Madrid">Madrid</SelectItem></SelectContent>
              </Select>
            </div>

            {/* ORIGEN */}
            <div className="mb-6">
              <Label className="font-montserrat font-semibold tracking-wide mb-2 flex items-center justify-between uppercase">Origen {(!isFullAddress(origin) || destinations.some(d => !isFullAddress(d))) && <span className="text-red-400 text-[10px] font-montserrat font-normal">*Incompleto</span>}</Label>
              <div className="grid grid-cols-12 gap-2">
                <Select value={origin.tipoVia} onValueChange={(v) => setOrigin({ ...origin, tipoVia: v })}>
                  <SelectTrigger className="col-span-4 md:col-span-3 cursor-pointer"><SelectValue /></SelectTrigger>
                  <SelectContent>{WAY_TYPES[city].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                <Input className="col-span-8 md:col-span-5" placeholder="Nombre vía" value={origin.nombre} onChange={(e) => setOrigin({ ...origin, nombre: e.target.value })} />
                <Input className="col-span-6 md:col-span-2" placeholder="Núm" value={origin.numero} onChange={(e) => setOrigin({ ...origin, numero: e.target.value })} />
                <Input className="col-span-6 md:col-span-2" placeholder="CP" maxLength={5} value={origin.cp} onChange={(e) => setOrigin({ ...origin, cp: e.target.value })} />
              </div>
            </div>

            {/* DESTINOS MULTIPLES */}
            {destinations.map((dest, idx) => (
              <div key={dest.id} className="mb-4 animate-in fade-in slide-in-from-left-2">
                <Label className="font-montserrat font-semibold tracking-wide mb-2 flex items-center justify-between uppercase">
                  <span>Destino #{idx + 1} {!isFullAddress(dest) && <span className="text-red-400 text-[10px] font-montserrat font-normal ml-2">*Incompleto</span>}</span>
                  {destinations.length > 1 && <button onClick={() => removeDestination(dest.id)} className="text-red-400 hover:text-red-500 p-1 cursor-pointer"><FaTrashCan /></button>}
                </Label>
                <div className="grid grid-cols-12 gap-2">
                  <Select value={dest.tipoVia} onValueChange={(v) => updateDestination(dest.id, "tipoVia", v)}>
                    <SelectTrigger className="col-span-4 md:col-span-3 cursor-pointer"><SelectValue /></SelectTrigger>
                    <SelectContent>{WAY_TYPES[city].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input className="col-span-8 md:col-span-5" placeholder="Nombre vía" value={dest.nombre} onChange={(e) => updateDestination(dest.id, "nombre", e.target.value)} />
                  <Input className="col-span-6 md:col-span-2" placeholder="Núm" value={dest.numero} onChange={(e) => updateDestination(dest.id, "numero", e.target.value)} />
                  <Input className="col-span-6 md:col-span-2" placeholder="CP" maxLength={5} value={dest.cp} onChange={(e) => updateDestination(dest.id, "cp", e.target.value)} />
                </div>
              </div>
            ))}

            <button onClick={addDestination} className="flex items-center justify-center gap-2 py-2 border-2 border-dashed border-foreground/30 rounded-lg text-foreground/70 hover:text-oliva hover:bg-oliva-light/5 transition-all font-bold text-xs uppercase cursor-pointer mb-10"><FaPlus /> Añadir Parada de Entrega</button>

            {/* SECCIÓN DE EXTRAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <Label className="font-montserrat font-semibold tracking-wide mb-2 block uppercase">Día de entrega</Label>
                <Select value={dayOfWeek.toString()} onValueChange={(v) => setDayOfWeek(parseInt(v))}>
                  <SelectTrigger className="w-full cursor-pointer font-montserrat font-normal"><SelectValue /></SelectTrigger>
                  <SelectContent className="font-montserrat font-bold">{dayNames.map((d, i) => <SelectItem key={i} value={i.toString()}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>)}</SelectContent>
                </Select>
                <p className="text-xs text-foreground/70 mt-3 font-montserrat">{city === "Barcelona" ? (<>En Barcelona: Recogida fija (2€) + Tarifa de zona. <Link href="/tarifas-barcelona" className="text-green-500 underline">Ver tarifas</Link></>) : (<>En Madrid: Precio por punto. <Link href="/tarifas-madrid" className="text-green-500 underline">Ver tarifas</Link></>)}</p>

                {/* ESTE ES EL NUEVO BOTÓN PARA INVOCAR EL TOAST */}
                <button 
                  type="button"
                  onClick={showGuia}
                  className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors text-[10px] font-gobold uppercase tracking-widest my-2 cursor-pointer"
                >
                  <FaExclamationCircle className="text-[12px]" /> Ver guía rapida de tarifas
                </button>

                {holidayNotice && <p className="text-orange-500 text-[11px] mt-1 italic font-montserrat">{holidayNotice}</p>}
              </div>

              <div className="space-y-4">
                <Label className="font-montserrat font-semibold tracking-wide mb-2 block uppercase">Extras del servicio</Label>
                <div className="flex gap-4">
                  <button onClick={() => setIsRainy(!isRainy)} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded border text-[10px] font-bold uppercase transition-all cursor-pointer ${isRainy ? 'bg-blue-500/20 border-blue-500 text-blue-500 shadow-inner' : 'bg-foreground/5 border-foreground/20 text-foreground/50'}`}><FaCloudRain /> Lluvia</button>
                  <button onClick={() => setIsExpress(!isExpress)} className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded border text-[10px] font-bold uppercase transition-all cursor-pointer ${isExpress ? 'bg-orange-500/10 border-orange-500 text-orange-500 shadow-inner' : 'bg-foreground/5 border-foreground/20 text-foreground/50'}`}><FaBolt /> Express</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative"><FaWeightHanging className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" /><Input type="number" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)} className="pl-8 text-xs font-bold" /></div>
                  <div className="relative"><FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 text-xs" /><Input type="number" placeholder="min" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} className="pl-8 text-xs font-bold" /></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <button onClick={calculatePrice} disabled={loading} className={`flex gap-1 justify-center items-center w-full cursor-pointer calc-button text-xs md:text-base ${loading ? "opacity-50" : ""}`}>{loading ? "Calculando..." : <><CiCalculator2 className="text-2xl" /> Calcular Trayecto</>}</button>
              <ShadTooltip><TooltipTrigger asChild><button onClick={() => handleCityChange(city)} className="text-foreground/90 border border-foreground/60 hover:text-oliva text-4xl p-1 rounded-full cursor-pointer"><IoMdRefreshCircle /></button></TooltipTrigger><TooltipContent>Limpiar campos</TooltipContent></ShadTooltip>
            </div>

            {/* <p className="text-center">Lorem ipsum dolor sit amet.</p> */}

            {errorMsg && <div className="text-red-500 text-xs font-bold mt-2 p-2 bg-red-500/10 rounded border border-red-500/20 font-montserrat">{errorMsg}</div>}

            {/* RECIBO RETRO */}
            {price !== null && (
              <div className="mt-4 space-y-3 scroll-mt-32 md:scroll-mt-40" ref={resultRef}>
                <div className="text-xl font-bold flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Precio estimado: {price.toFixed(2)}€</div>
                <div className="bg-militar-dark text-hueso p-4 rounded-md font-mono text-[9px] md:text-xs shadow-inner border border-oliva-light">
                  {receipt.map((line, i) => {
                    const hasColon = line.includes(":");
                    const parts = line.split(":");
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(":").trim();
                    const isTotal = key === "TOTAL";
                    
                    const iconMap: Record<string, React.ReactNode> = {
                      "Ciudad": <FaCity className="text-oliva-light" />, 
                      "Día de entrega": <FaCalendarDay className="text-oliva-light" />, 
                      "Origen": <FaRegCircleDot className="text-blue-500" />,
                      "CP origen": <GoPackage className="text-oliva-light" />, 
                      "Zona origen": <BiMapPin className="text-oliva-light" />, 
                      "TOTAL": <FaCheckCircle className="text-green-500" />,
                      "Recogida fija": <FaExclamationCircle className="text-orange-400" />, 
                      "Zona entrega": <BiMapPin className="text-oliva-light" />, 
                      "CP destino": <GoPackage className="text-oliva-light" />
                    };

                    let currentIcon = iconMap[key];
                    if (key.includes("CP")) currentIcon = <GoPackage className="text-oliva-light" />;
                    if (!currentIcon) {
                  if (key.includes("Express")) {
    currentIcon = <FaBolt className="text-orange-500" />;
  } else if (key.includes("Lluvia")) {
    currentIcon = <FaCloudRain className="text-blue-500" />;
  } else if (key.includes("Peso")) {
    currentIcon = <FaWeightHanging className="text-slate-300" />;
  } else if (key.includes("Espera")) {
    currentIcon = <FaClock className="text-yellow-300" />;
  } else if (key.includes("Tarifa base") || key.includes("Recogida") || key.includes("Entrega") || key.includes("Extra")) {
    currentIcon = <AiOutlineRise className={key.includes("festiv") ? "text-orange-400" : "text-oliva-light"} />;
  } else if (key.startsWith("Destino")) {
    currentIcon = <IoLocationSharp className="text-red-500" />;
  } else {
    currentIcon = <BiMapPin className="text-oliva-light" />;
  }
}

                    const isFirstExtra = key.startsWith("Extra") && !receipt[i-1].startsWith("Extra");
                    const isDividerAfterRecogida = key.startsWith("Destino 1") || key === "Recogida fija"; 

                    return (
                      <React.Fragment key={i}>
                        {(key === "Origen" || isDividerAfterRecogida || (key.startsWith("Destino") && key !== "Destino 1") || isFirstExtra) && (
                          <div className="border-t border-oliva-light/30 my-3"></div>
                        )}
                        <div className={`flex items-start gap-1 mb-3 ${isTotal ? "text-oliva-light font-bold border-t border-oliva-light/50 pt-2" : ""}`}>
                          <span className={`font-bold flex items-center gap-1 font-montserrat text-[9px] md:text-xs ${line.includes("Fuera") ? "text-red-400" : key.includes("festiv") ? "text-orange-400" : "text-hueso"}`}>
                            {currentIcon} {key}{hasColon && ":"}
                          </span>
                          {hasColon && <span className="font-montserrat text-hueso/90">{value}</span>}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            {/* IMPACTO ECO */}
            {impact && (
              <div className="mt-6 pt-6 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-px bg-oliva/60 grow"></div>
                  <span className="text-[18px] font-gobold tracking-[0.2em] text-foreground/80 uppercase">Impacto Sostenible</span>
                  <div className="h-px bg-oliva/60 grow"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-militar-dark/70 border border-oliva-light/60 p-4 rounded-lg relative overflow-hidden group transition-all hover:border-oliva-light/80">
                    <IoBicycle className="absolute top-1 right-1 text-5xl text-oliva-light opacity-80" />
                    <p className="text-[9px] uppercase text-oliva-light/90 font-bold mb-1 font-montserrat">Recorrido Estimado</p>
                    <p className="text-2xl font-bold font-montserrat text-hueso italic">{impact.km.toFixed(1)} <span className="text-xs italic font-normal text-hueso/60 uppercase">km</span></p>
                  </div>
                  <div className="bg-oliva-light p-4 rounded-lg relative overflow-hidden group transition-all neon-pulse2">
                    <FaLeaf className="absolute top-1 right-1 text-5xl text-militar-dark opacity-70" />
                    <p className="text-[9px] uppercase text-militar-dark font-bold mb-1 font-montserrat">Ahorro CO2 vs Furgón</p>
                    <p className="text-2xl font-bold font-montserrat text-militar-dark italic">-{impact.co2.toFixed(2)} <span className="text-xs italic font-normal text-militar-dark/80 uppercase">kg</span></p>
                  </div>
                </div>
                <p className="text-[12px] text-center mt-10 text-foreground/60 font-montserrat leading-tight uppercase">Gracias por elegir logística <span className="text-oliva-light">Zero Emisiones</span> con La Mess</p>
              </div>
            )}
          </div>

{/* MAPA Y CONTACTO */}
<div className="lg:col-span-1 space-y-6 lg:sticky lg:top-38 lg:self-start lg:h-fit w-full relative z-0">
  <div className="w-full h-125 rounded-md overflow-hidden border shadow-md z-10">
    {/* HEMOS AÑADIDO 'city' a la key para que el mapa se destruya y recree al cambiar de Barcelona a Madrid */}
    <MapContainer 
      key={`map-${city}-${markerDests.length}-${markerOrigin ? 'o' : 'n'}`} 
      center={city === "Barcelona" ? [41.3851, 2.1734] : [40.4168, -3.7038]} 
      zoom={13} 
      className="w-full h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Si hay marcadores, ChangeView moverá la cámara para que se vean todos.
          Si NO hay marcadores (como al cambiar de ciudad), pasamos un array vacío.
      */}
      <ChangeView coords={markerOrigin ? [markerOrigin, ...markerDests] : []} />
      
      {markerOrigin && markerDests.length > 0 && (
        <Polyline 
          positions={[markerOrigin, ...markerDests]} 
          pathOptions={{ color: '#207ac9', weight: 4, dashArray: '10, 10' }} 
        />
      )}
      
      {markerOrigin && (
        <Marker position={markerOrigin} icon={OriginIcon}>
          <LeafletTooltip permanent direction="right" className="font-montserrat">
            <div className="flex flex-col">
              <span className="font-bold text-blue-600 uppercase text-[10px]">Origen</span>
              <span className="text-[9px] text-gray-700">{formatAddress(origin, city)}</span>
            </div>
          </LeafletTooltip>
        </Marker>
      )}
      
      {markerDests.map((pos, i) => (
        <Marker key={i} position={pos} icon={DestinationIcon}>
          <LeafletTooltip permanent direction="right" className="font-montserrat">
            <div className="flex flex-col">
              <span className="font-bold text-red-600 uppercase text-[10px]">Parada {i + 1}</span>
              <span className="text-[9px] text-gray-700">{destinations[i] ? formatAddress(destinations[i], city) : ""}</span>
            </div>
          </LeafletTooltip>
        </Marker>
      ))}
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