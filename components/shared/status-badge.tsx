import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType =
  | "active"
  | "pending"
  | "completed"
  | "canceled"
  | "archived"
  | "trialing"
  | "in_progress";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; className: string; dotColor: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_14px_rgba(16,185,129,0.3)]",
    dotColor: "bg-emerald-400",
  },
  completed: {
    label: "Completed",
    className: "bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-[0_0_14px_rgba(6,182,212,0.3)]",
    dotColor: "bg-cyan-400",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-[0_0_14px_rgba(245,158,11,0.3)]",
    dotColor: "bg-amber-400",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-indigo-950/80 text-indigo-300 border-indigo-500/50 shadow-[0_0_14px_rgba(99,102,241,0.3)]",
    dotColor: "bg-indigo-400",
  },
  canceled: {
    label: "Canceled",
    className: "bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-[0_0_14px_rgba(244,63,94,0.3)]",
    dotColor: "bg-rose-400",
  },
  archived: {
    label: "Archived",
    className: "bg-slate-800/90 text-slate-300 border-slate-700/80",
    dotColor: "bg-slate-400",
  },
  trialing: {
    label: "Trialing",
    className: "bg-purple-950/80 text-purple-300 border-purple-500/50 shadow-[0_0_14px_rgba(168,85,247,0.3)]",
    dotColor: "bg-purple-400",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(" ", "_");
  const config = statusConfig[normalized] || {
    label: status,
    className: "bg-slate-800 text-slate-300 border-slate-700",
    dotColor: "bg-slate-400",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center gap-1.5 font-bold text-xs sm:text-[13px] px-3.5 py-1 rounded-full border font-mono tracking-wide backdrop-blur-md",
        config.className,
        className
      )}
    >
      <span className={cn("h-2 w-2 rounded-full animate-pulse", config.dotColor)} />
      {config.label}
    </Badge>
  );
}
