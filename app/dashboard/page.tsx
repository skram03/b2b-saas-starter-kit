"use client";

import React, { useState } from "react";
import { StatCard } from "@/components/shared/stat-card";
import {
  Users,
  DollarSign,
  Activity,
  PackageCheck,
  ArrowUpRight,
  Plus,
  Download,
  Sparkles,
  Server,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardOverviewPage() {
  const [activities, setActivities] = useState([
    { id: 1, action: "New enterprise license purchased", entity: "Apex Civil ($1,450/mo)", user: "LemonSqueezy Webhook", status: "completed", time: "Just now" },
    { id: 2, action: "Postgres RLS Policy verified", entity: "128 Tenant DB partitions", user: "Supabase Guard", status: "active", time: "12 mins ago" },
    { id: 3, action: "Inventory asset deployed", entity: "Hydraulic Boom Lift #EQ-802", user: "Marcus Vance", status: "in_progress", time: "1 hour ago" },
    { id: 4, action: "Weekly CSV backup archived", entity: "tenant_audit_logs.csv", user: "Automated Cron", status: "completed", time: "4 hours ago" },
  ]);

  const handleDownloadReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Event,Entity,Initiator,Status,Timestamp"]
        .concat(activities.map((a) => `"${a.action}","${a.entity}","${a.user}",${a.status},"${a.time}"`))
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `executive_kpi_report_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInjectEvent = () => {
    const events = [
      { action: "API token generated", entity: "Production Read/Write Key", user: "John Doe", status: "active" },
      { action: "New customer invoice billed", entity: "Invoice #INV-2026-099 ($2,800)", user: "Stripe Engine", status: "completed" },
      { action: "Database sync check passed", entity: "All 3 regions healthy", user: "Postgres Cluster", status: "completed" },
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const newEntry = {
      id: Date.now(),
      action: randomEvent.action,
      entity: randomEvent.entity,
      user: randomEvent.user,
      status: randomEvent.status,
      time: "Just now",
    };
    setActivities([newEntry, ...activities]);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header with 3D Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <Zap className="h-3.5 w-3.5" /> 3D Realtime Analytics
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-50">Control Center</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time multi-tenant telemetry, billing throughput, and system health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadReport}
            className="border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 gap-1.5 shadow-md"
          >
            <Download className="h-4 w-4" /> Export CSV
          </Button>

          <Button
            size="sm"
            onClick={handleInjectEvent}
            className="bg-gradient-to-r from-primary to-indigo-600 font-bold shadow-lg shadow-primary/25 gap-1.5"
          >
            <Sparkles className="h-4 w-4" /> Test Live Event
          </Button>

          <Button size="sm" variant="secondary" asChild className="border-zinc-700 bg-zinc-800 text-zinc-200">
            <Link href="/dashboard/data-manager">
              <Plus className="h-4 w-4" /> Add Record
            </Link>
          </Button>
        </div>
      </div>

      {/* 3D KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Recurring Revenue"
          value="$48,290.00"
          change="+14.2%"
          trend="up"
          description="vs last 30 days"
          icon={DollarSign}
        />
        <StatCard
          title="Active Tenant Orgs"
          value="128"
          change="+8"
          trend="up"
          description="verified enterprise accounts"
          icon={Users}
        />
        <StatCard
          title="DB Query Efficiency"
          value="99.8%"
          change="+0.4%"
          trend="up"
          description="RLS partition index hits"
          icon={Activity}
        />
        <StatCard
          title="Pending Queue Jobs"
          value="14"
          change="-6"
          trend="down"
          description="scheduled cron triggers"
          icon={PackageCheck}
        />
      </div>

      {/* 3D Interactive Live Feed Showcase */}
      <div className="relative rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-zinc-950 p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Top Specular Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-glow" />
            <h3 className="font-bold text-base text-zinc-100">Live PostgreSQL Stream</h3>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/50">
              realtime-channel-01
            </span>
          </div>
          <Link
            href="/dashboard/data-manager"
            className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            Open Data Manager Workbench <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-800/60 mt-2">
          {activities.map((act) => (
            <div
              key={act.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-800/30 px-3 rounded-xl transition-colors"
            >
              <div className="space-y-0.5">
                <p className="font-semibold text-sm text-zinc-100">{act.action}</p>
                <p className="text-xs text-zinc-400">
                  <span className="font-mono text-primary">{act.entity}</span> &bull; By{" "}
                  <span className="font-medium text-zinc-300">{act.user}</span>
                </p>
              </div>
              <div className="flex items-center gap-4 self-end sm:self-center">
                <StatusBadge status={act.status} />
                <span className="text-xs text-zinc-500 font-mono">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
