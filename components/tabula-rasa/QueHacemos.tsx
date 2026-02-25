import { Apple, Package, FileText, Box } from "lucide-react";

export default function QueHacemos() {
  return (
    <section
      className="relative w-full h-[90vh] xl:h-[70vh] flex items-center justify-center bg-fixed bg-center bg-cover rounded-3xl overflow-hidden"
      style={{
        backgroundImage: "url('/misc/foto-3.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-militar/60 backdrop-blur-xs" />

      {/* Content */}
      <div className="relative z-10 mx-auto px-4 md:px-12 text-hueso w-full max-w-6xl">

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-center font-gobold tracking-wider">
          Mensajería urbana pensada para empresas
        </h2>

        {/* Paragraph below title */}
        <p className="text-sm md:text-2xl opacity-90 leading-relaxed text-center font-montserrat tracking-wider max-w-3xl mx-auto mb-12 md:mb-16">
          Trabajamos con productores, artesanos, importadores y negocios 
          que necesitan entregas puntuales y cuidadas.
        </p>

{/* Icons grid (2x2) */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto place-items-center text-md md:text-2xl font-montserrat font-semibold">

  <div className="w-full max-w-xs flex items-center gap-4">
    <Apple className="w-12 h-12 shrink-0 text-militar-dark bg-oliva-light p-2 rounded-full" />
    <span>Alimentación</span>
  </div>

  <div className="w-full max-w-xs flex items-center gap-4">
    <Package className="w-12 h-12 shrink-0 text-militar-dark bg-oliva-light p-2 rounded-full" />
    <span>Producto delicado</span>
  </div>

  <div className="w-full max-w-xs flex items-center gap-4">
    <FileText className="w-12 h-12 shrink-0 text-militar-dark bg-oliva-light p-2 rounded-full" />
    <span>Documentación</span>
  </div>

  <div className="w-full max-w-xs flex items-center gap-4">
    <Box className="w-12 h-12 shrink-0 text-militar-dark bg-oliva-light p-2 rounded-full" />
    <span>Carga voluminosa</span>
  </div>

</div>


      </div>
    </section>
  );
}
