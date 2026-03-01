"use client";

import { useEffect } from "react";
import EnDesarrollo from '@/components/tabula-rasa/EnDesarrollo';
import React from 'react';

export default function Contacto() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <EnDesarrollo />
    </div>
  );
}
