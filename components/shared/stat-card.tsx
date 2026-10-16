"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card3D } from "./card-3d";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
  icon: LucideIcon;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  description,
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <Card3D
      intensity={12}
      className={cn(
        "group relative p-5 glass-panel-3d border border-zinc-700/50 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950/95",
        className
      )}
    >
      {/* 3D Floating Icon Box (Z=40px) */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-mono">
          {title}
        </p>
        <div
          style={{ transform: "translateZ(30px)" }}
          className="h-10 w-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center text-cyan-400 shadow-[0_4px_15px_rgba(0,0,0,0.6)] group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-300"
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* 3D Elevated Metric (Z=35px) */}
      <div
        style={{ transform: "translateZ(35px)" }}
        className="mt-4 flex items-baseline gap-2.5"
      >
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-sm backdrop-blur-md",
              trend === "up" &&
                "text-emerald-300 bg-emerald-950/70 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
              trend === "down" &&
                "text-rose-300 bg-rose-950/70 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]",
              trend === "neutral" &&
                "text-zinc-300 bg-zinc-800/70 border-zinc-600/40"
            )}
          >
            {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
            {trend === "down" && <TrendingDown className="mr-1 h-3 w-3" />}
            {change}
          </span>
        )}
      </div>

      {description && (
        <p
          style={{ transform: "translateZ(20px)" }}
          className="mt-2 text-[11px] text-zinc-400 font-medium flex items-center gap-1.5"
        >
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          {description}
        </p>
      )}
    </Card3D>
  );
}
