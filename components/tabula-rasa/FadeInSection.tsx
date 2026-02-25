"use client";
import { useRef, useState, useEffect, ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number; // default 0.2
  delay?: number; // optional delay for stagger
}

export default function FadeInSection({
  children,
  className = "",
  threshold = 0.2,
  delay = 0,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
<div
  ref={ref}
  className={`
    transition-all duration-1100 ease-[cubic-bezier(0.16,1,0.3,1)]
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
    ${delay ? `transition-delay-[${delay}ms]` : ""}
    ${className}
  `}
>
  {children}
</div>

  );
}
