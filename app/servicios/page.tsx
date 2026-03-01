"use client";

import { useEffect } from "react";
import ServiciosComponent from "@/components/tabula-rasa/Servicios";

export default function Servicios() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ServiciosComponent />
    </div>
  );
}
