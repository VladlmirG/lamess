// 21-oct · INC-0020 · Preguntas frecuentes del inicio. Las reglas de precio son
// las de la app (las mismas del calculador): si cambian allí, cambiar aquí.

import "./inicio.css";
import Link from "next/link";
import { TELEFONO, URL_REGISTRO } from "@/lib/enlaces";
import { TARIFA_HORA } from "@/lib/precio";

const PREGUNTAS: { pregunta: string; respuesta: React.ReactNode }[] = [
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
    respuesta: `Desde la app se pide a partir de mañana. Para hoy, por WhatsApp o por teléfono (${TELEFONO}), con tarifa express (+50 %).`,
  },
  {
    pregunta: "¿Cómo se calcula el precio?",
    respuesta: <>En Barcelona, 2 € de recogida más la zona de cada entrega. En Madrid, cada punto, recogida y entrega, según su zona. Domingos y festivos, tarifa de festivo. Lo ves antes de pedir, en el <Link href="/calculador">calculador</Link> y en la app.</>,
  },
  {
    pregunta: "¿Y si llueve o pesa mucho?",
    respuesta: "Si ese día llueve, +30 %. Hasta 30 kg va incluido; cada kilo de más, 0,10 €.",
  },
  {
    pregunta: "¿Puedo hacer varias entregas en una ruta?",
    respuesta: "Sí: una recogida y las paradas que necesites, cada una con el precio de su zona.",
  },
  {
    pregunta: "¿Y si la dirección está fuera de vuestras zonas?",
    respuesta: `Se cobra por horas: ${TARIFA_HORA.laborable} €/h, ${TARIFA_HORA.festivo} €/h en festivo y ${TARIFA_HORA.express} €/h en express.`,
  },
];

export default function PreguntasFrecuentes() {
  return (
    <section className="lmi lmi-preguntas" aria-labelledby="lmi-preguntas">
      <h2 id="lmi-preguntas" className="lmi-h2">Preguntas <span>frecuentes</span></h2>
      <div className="lmi-lista">
        {PREGUNTAS.map(q => (
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
