import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "relative group overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:[transform:translateY(-4px)] hover:border-zinc-700 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.25)]",
        className
      )}
    >
      {/* 3D Specular Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Subtle radial ambient glow */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none" />

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">{title}</p>
        <div className="h-10 w-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-50">{value}</span>
        {change && (
          <span
            className={cn(
              "inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full border shadow-sm",
              trend === "up" && "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
              trend === "down" && "text-rose-400 bg-rose-950/60 border-rose-800/60",
              trend === "neutral" && "text-zinc-400 bg-zinc-800/60 border-zinc-700/60"
            )}
          >
            {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
            {trend === "down" && <TrendingDown className="mr-1 h-3 w-3" />}
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-zinc-500 font-medium">{description}</p>
      )}
    </div>
  );
}
