"use client";

import dynamic from "next/dynamic";
import React, { useEffect } from "react";

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
      <Calculator />
    </div>
  );
};

export default CalculadoraPage;
