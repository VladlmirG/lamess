"use client";

import { useState } from "react";
import Link from "next/link";

export default function TempModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Open modal when a "service" button is clicked
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent default navigation
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Example buttons */}
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-oliva-light text-white rounded-lg shadow hover:bg-oliva-dark transition"
      >
        Servicio No Disponible
      </button>

      <button
        onClick={handleClick}
        className="px-6 py-3 bg-foreground text-white rounded-lg shadow hover:bg-gray-700 transition"
      >
        Otro Servicio en Mantenimiento
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-2xl p-8 max-w-sm w-full text-center shadow-lg space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              Servicio No Disponible
            </h3>
            <p className="text-sm text-muted-foreground">
              Este servicio actualmente no está disponible debido a mantenimiento y mejoras.
            </p>
            <Link href="/contacto">
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2 bg-oliva-light text-white rounded-lg shadow hover:bg-oliva-dark transition"
              >
                Contactar
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
