"use client";

import { useEffect } from "react";
import ContactoMain from "@/components/tabula-rasa/ContactoMain";

export default function Contacto() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ContactoMain/>
    </div>
  );
}
