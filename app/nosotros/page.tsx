"use client";

import { useEffect } from "react";
import HistoriaSection from "@/components/tabula-rasa/HistoriaSection";
import NosotrosMisc1 from "@/components/tabula-rasa/NosotrosMisc1";
import TeamSection from "@/components/tabula-rasa/TeamSection";

export default function Nosotros() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <TeamSection />
      <HistoriaSection />
      <NosotrosMisc1 />
    </div>
  );
}
