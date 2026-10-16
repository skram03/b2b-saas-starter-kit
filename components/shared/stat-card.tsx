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
      intensity={14}
      className={cn(
        "group relative p-6 glass-panel-3d",
        className
      )}
    >
      {/* 3D Floating Icon Box (Z=35px) */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-bold text-slate-300 tracking-wider uppercase font-mono">
          {title}
        </p>
        <div
          style={{ transform: "translateZ(35px)" }}
          className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-300 shadow-[0_4px_15px_rgba(2,6,23,0.7)] group-hover:border-cyan-400/50 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300"
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* 3D Elevated Metric (Z=40px) */}
      <div
        style={{ transform: "translateZ(40px)" }}
        className="mt-4 flex flex-wrap items-baseline gap-3"
      >
        <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-black px-3 py-1 rounded-full border shadow-sm backdrop-blur-md font-mono",
              trend === "up" &&
                "text-emerald-300 bg-emerald-950/80 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
              trend === "down" &&
                "text-rose-300 bg-rose-950/80 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
              trend === "neutral" &&
                "text-slate-300 bg-slate-800/80 border-slate-600/50"
            )}
          >
            {trend === "up" && <TrendingUp className="mr-1 h-3.5 w-3.5" />}
            {trend === "down" && <TrendingDown className="mr-1 h-3.5 w-3.5" />}
            {change}
          </span>
        )}
      </div>

      {description && (
        <p
          style={{ transform: "translateZ(25px)" }}
          className="mt-3 text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-2 font-mono"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          {description}
        </p>
      )}
    </Card3D>
  );
}
