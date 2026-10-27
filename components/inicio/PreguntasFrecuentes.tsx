"use client";

// 21-oct · INC-0020 · Preguntas frecuentes del inicio. Las reglas de precio son
// las de la app (las mismas del calculador): si cambian allí, cambiar aquí.
//
// 27-oct · Ya no hay que cambiarlas a mano: los importes (recogida, express,
// lluvia, peso, por horas) llegan de la app por /api/reglas. Mientras llegan,
// o si no llegan, los de respaldo (los de siempre).

import "./inicio.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TELEFONO, URL_REGISTRO } from "@/lib/enlaces";
import { textosReglas } from "@/lib/precio";
import { leerReglas, REGLAS_RESPALDO, type Reglas } from "@/lib/tarifas";

function preguntas(r: Reglas): { pregunta: string; respuesta: React.ReactNode }[] {
  const tx = textosReglas(r);
  return [
    {
      pregunta: "¿Necesito una cuenta para pedir?",
      respuesta: <>Sí: los pedidos se hacen desde la app, con tu cuenta (<a href={URL_REGISTRO}>hazte cliente</a>). Para algo urgente o puntual, escríbenos por WhatsApp.</>,
    },
    {
      pregunta: "¿Cuánto tarda el alta?",
      respuesta: "La revisamos nosotros y te avisamos por correo en cuanto puedas entrar.",
    },
    {
      pregunta: "¿Puedo pedir para hoy?",
      respuesta: `Desde la app se pide a partir de mañana. Para hoy, por WhatsApp o por teléfono (${TELEFONO}), con tarifa express (${tx.express}).`,
    },
    {
      pregunta: "¿Cómo se calcula el precio?",
      respuesta: <>En Barcelona, {tx.recogida} de recogida más la zona de cada entrega. En Madrid, cada punto, recogida y entrega, según su zona. Domingos y festivos, tarifa de festivo. Lo ves antes de pedir, en el <Link href="/calculador">calculador</Link> y en la app.</>,
    },
    {
      pregunta: "¿Y si llueve o pesa mucho?",
      respuesta: `Si ese día llueve, ${tx.lluvia}. Hasta ${tx.kg} kg va incluido; cada kilo de más, ${tx.eurKg}.`,
    },
    {
      pregunta: "¿Puedo hacer varias entregas en una ruta?",
      respuesta: "Sí: una recogida y las paradas que necesites, cada una con el precio de su zona.",
    },
    {
      pregunta: "¿Y si la dirección está fuera de vuestras zonas?",
      respuesta: `Se cobra por horas: ${tx.horaLaborable} €/h, ${tx.horaFestivo} €/h en festivo y ${tx.horaExpress} €/h en express.`,
    },
  ];
}

export default function PreguntasFrecuentes() {
  const [reglas, setReglas] = useState<Reglas>(REGLAS_RESPALDO);

  useEffect(() => {
    let vivo = true;
    fetch("/api/reglas")
      .then(r => (r.ok ? r.json() : null))
      .then((c: { reglas?: unknown } | null) => { if (vivo && c?.reglas) setReglas(leerReglas(c.reglas)); })
      .catch(() => { /* se quedan las de respaldo */ });
    return () => { vivo = false; };
  }, []);

  return (
    <section className="lmi lmi-preguntas" aria-labelledby="lmi-preguntas">
      <h2 id="lmi-preguntas" className="lmi-h2">Preguntas <span>frecuentes</span></h2>
      <div className="lmi-lista">
        {preguntas(reglas).map(q => (
          <details key={q.pregunta} className="lmi-pregunta">
            <summary>
              {q.pregunta}
              <span aria-hidden="true" className="lmi-mas">+</span>
            </summary>
            <p>{q.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
