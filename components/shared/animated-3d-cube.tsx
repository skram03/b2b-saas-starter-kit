"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Animated3DCubeProps {
  size?: number;
  className?: string;
}

export function Animated3DCube({ size = 120, className }: Animated3DCubeProps) {
  const half = size / 2;

  return (
    <div
      className={cn("relative flex items-center justify-center [perspective:800px]", className)}
      style={{ width: size * 1.5, height: size * 1.5 }}
    >
      <div
        className="relative [transform-style:preserve-3d] animate-[spin-3d_14s_infinite_linear]"
        style={{ width: size, height: size }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center font-black text-cyan-300 font-mono text-xs"
          style={{ transform: `translateZ(${half}px)` }}
        >
          <div className="h-6 w-6 rounded-lg bg-cyan-400/30 flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-indigo-400/60 bg-gradient-to-tr from-indigo-500/20 to-purple-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center font-black text-indigo-300 font-mono text-xs"
          style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
        >
          <span className="text-xs font-mono font-black tracking-wider text-indigo-300 uppercase">RLS</span>
        </div>

        {/* Right */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-purple-400/60 bg-gradient-to-tr from-purple-500/20 to-pink-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center font-black text-purple-300 font-mono text-xs"
          style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
        >
          <span className="text-xs font-mono font-black tracking-wider text-purple-300 uppercase">API</span>
        </div>

        {/* Left */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-sky-400/60 bg-gradient-to-tr from-sky-500/20 to-cyan-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center font-black text-sky-300 font-mono text-xs"
          style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
        >
          <span className="text-xs font-mono font-black tracking-wider text-sky-300 uppercase">DB</span>
        </div>

        {/* Top */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-emerald-400/60 bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center font-black text-emerald-300 font-mono text-xs"
          style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
        >
          <span className="text-xs font-mono font-black tracking-wider text-emerald-300 uppercase">GRID</span>
        </div>

        {/* Bottom */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-blue-400/60 bg-gradient-to-tr from-blue-500/20 to-indigo-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center font-black text-blue-300 font-mono text-xs"
          style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
        >
          <span className="text-xs font-mono font-black tracking-wider text-blue-300 uppercase">SYNC</span>
        </div>
      </div>
    </div>
  );
}
