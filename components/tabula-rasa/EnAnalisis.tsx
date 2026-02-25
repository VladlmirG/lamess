"use client";

import { Eye } from "lucide-react";

export default function EnAnalisis() {
  return (
    <section className="h-150 w-full flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center space-y-6">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center">
          <Eye className="w-10 h-10 text-red-600" />
        </div>

        {/* Text */}
        <h1 className="text-3xl md:text-5xl font-gobold tracking-widest">
          ACTUALMENTE EN ANÁLISIS...
        </h1>

        {/* Optional subtle subtitle */}
        <p className="text-sm md:text-base font-montserrat tracking-wide">
          Estamos trabajando en ello
        </p>

      </div>
    </section>
  );
}
