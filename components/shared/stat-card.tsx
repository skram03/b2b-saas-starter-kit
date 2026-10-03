import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className={cn("overflow-hidden border border-border/60 hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
          {change && (
            <span
              className={cn(
                "inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded",
                trend === "up" && "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50",
                trend === "down" && "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/50",
                trend === "neutral" && "text-muted-foreground bg-muted"
              )}
            >
              {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
              {trend === "down" && <TrendingDown className="mr-1 h-3 w-3" />}
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
