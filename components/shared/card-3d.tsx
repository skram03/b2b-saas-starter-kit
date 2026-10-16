"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export function Card3D({
  children,
  className,
  intensity = 15,
  glare = true,
  ...props
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);

    if (glare) {
      const glX = (x / rect.width) * 100;
      const glY = (y / rect.height) * 100;
      setGlarePos({ x: glX, y: glY, opacity: 0.45 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative transition-all duration-300"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px) scale3d(1.015, 1.015, 1.015)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.45s ease-out",
        }}
        className={cn(
          "relative overflow-hidden rounded-3xl glass-panel-3d shadow-2xl",
          className
        )}
        {...props}
      >
        {/* Dynamic Specular Caustic Glare */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.35) 0%, rgba(168, 85, 247, 0.15) 30%, transparent 65%)`,
            }}
          />
        )}

        {/* Ambient Top Specular Rim */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-30" />

        {/* Inner Content with 3D Layer Elevation */}
        <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
