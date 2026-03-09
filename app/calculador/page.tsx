"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";
// Importamos el Toaster desde la carpeta de componentes que creó shadcn
import { Toaster } from "@/components/ui/sonner";

// Importa Calculator dinámicamente para evitar SSR
const Calculator = dynamic(
  () => import('@/components/tabula-rasa/Calculator'),
  { ssr: false }
);

const CalculadoraPage = () => {
  // Scroll al top al montar la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Configuramos el Toaster aquí para que esté disponible en toda la página.
          'richColors' permite que los mensajes de error/éxito tengan color,
          'expand' permite ver varios toasts apilados.
      */}
<Toaster 
  position="top-left" 
  expand={true} 
  richColors 
  closeButton
  className="mt-20 md:mt-28"
  /* Pasamos estas props para que el componente de Shadcn 
     las reciba y las aplique al Sonner original 
  */
  toastOptions={{
    // Forzamos a que el contenedor de los toasts sea ancho en LG
    className: "lg:!w-[750px]", 
  }}
  style={{
    // Esta variable la usa Sonner internamente para el ancho del toast
    "--width": "min(90vw, 750px)", 
  } as React.CSSProperties}
/>
      
      <Calculator />
    </div>
  );
};

export default CalculadoraPage;