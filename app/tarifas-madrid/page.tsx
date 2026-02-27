"use client";

import { useEffect } from "react";
import TarifasMadrid from '@/components/tabula-rasa/TarifasMadrid'

export default function TarifasM() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <TarifasMadrid/>
    </div>
  )
}


