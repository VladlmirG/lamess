"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Lazy init avoids useEffect entirely
  const [mounted] = useState(typeof window !== "undefined");
  if (!mounted) return null;

  const tooltipText = resolvedTheme === "dark" ? "Enciende las luces" : "Apaga las luces";

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full transition-colors cursor-pointer"
          >
            {resolvedTheme === "dark" ? <Sun className="w-5 h-5 text-[#FAE846] switch-neon" /> : <Moon className="w-5 h-5 text-militar-dark hover:fill-militar-dark" />}
          </button>
        </TooltipTrigger>
        <TooltipContent className="text-sm">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
