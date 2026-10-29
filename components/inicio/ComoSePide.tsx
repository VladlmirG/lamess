// 21-oct · INC-0020 · «¿Cómo se pide?» (Lucas: los clientes no entendían que
// se pide desde la app). Sustituye en el inicio a ComoFunciona, que se queda en
// el proyecto sin usar. Cuatro pasos y la franja para los que ya son clientes.

import "./inicio.css";
import FadeInSection from "@/components/tabula-rasa/FadeInSection";
import { TELEFONO, URL_ENTRAR, URL_REGISTRO } from "@/lib/enlaces";
import PrecioEjemplo from "@/components/inicio/PrecioEjemplo";

const IconoEntrar = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></svg>
);

export default function ComoSePide() {
  return (
    <FadeInSection>
      <section className="lmi lmi-como" aria-labelledby="lmi-como">
        <div className="lmi-cabecera">
          <h2 id="lmi-como" className="lmi-h2">¿<span>Cómo</span> se pide?</h2>
          <span aria-hidden="true" className="lmi-raya" />
          <p className="lmi-intro">Todo se pide desde nuestra app. Cuatro pasos, y el primero lo haces una sola vez.</p>
        </div>

        <ol className="lmi-pasos">
          <li className="lmi-paso">
            <span aria-hidden="true" className="lmi-num">1</span>
            <h3>Crea tu cuenta</h3>
            <p>Los datos de tu empresa y dónde recogemos. Unos minutos, una sola vez.</p>
            <div aria-hidden="true" className="lmi-mini">
              <span className="lmi-mini-titulo">Hazte cliente</span>
              <span className="lmi-mini-campo">Razón social</span>
              <span className="lmi-mini-campo">Email</span>
              <span className="lmi-mini-campo">Teléfono</span>
              <span className="lmi-mini-boton">Enviar</span>
            </div>
            <a className="lmi-enlace" href={URL_REGISTRO}>Hazte cliente →</a>
          </li>
          <li className="lmi-paso">
            <span aria-hidden="true" className="lmi-num">2</span>
            <h3>Te damos acceso</h3>
            <p>Revisamos tu alta y te avisamos por correo en cuanto puedas entrar.</p>
            <div aria-hidden="true" className="lmi-mini lmi-mini-correo">
              <span className="lmi-mini-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </span>
              <span>
                <strong>La Mess · Ya puedes entrar</strong>
                <small>Tu cuenta está lista. Entra en app.lamess.es con este correo.</small>
              </span>
            </div>
          </li>
          <li className="lmi-paso">
            <span aria-hidden="true" className="lmi-num">3</span>
            <h3>Pide desde la app</h3>
            <p>Recogida, entregas y día. Ves el precio antes de pedir.</p>
            <div aria-hidden="true" className="lmi-mini" data-oscura="1">
              <span className="lmi-mini-titulo">Nueva entrega</span>
              <span className="lmi-mini-punto"><i data-r="1">R</i>Carrer de Còrsega, 302</span>
              <span className="lmi-mini-punto"><i>1</i>Carrer de Pujades, 77</span>
              <span className="lmi-mini-precio"><span>Mañana · 9:00–12:00</span><strong><PrecioEjemplo /></strong></span>
              <span className="lmi-mini-boton">Pedir</span>
            </div>
          </li>
          <li className="lmi-paso">
            <span aria-hidden="true" className="lmi-num">4</span>
            <h3>Lo sigues en la app</h3>
            <p>Ves en qué punto está cada entrega y la prueba de que ha llegado.</p>
            <div aria-hidden="true" className="lmi-mini">
              <span className="lmi-mini-barras"><i /><i /><i /></span>
              <span className="lmi-mini-estados"><span>Recogido</span><span>En camino</span><span>Entregado</span></span>
              <span className="lmi-mini-aviso">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" /><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" /></svg>
                En camino a Carrer de Pujades
              </span>
            </div>
          </li>
        </ol>

        <div className="lmi-franja">
          <div>
            <h3>¿Ya eres cliente?</h3>
            <p>Entra con tu correo en <strong>app.lamess.es</strong>. ¿Es para hoy o algo puntual? WhatsApp: {TELEFONO}.</p>
          </div>
          <div className="lmi-franja-botones">
            <a className="lmi-cta" href={URL_ENTRAR}><IconoEntrar />Entrar en la app</a>
            <a className="lmi-cta2" href="/contacto">Escríbenos</a>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}
