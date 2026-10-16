"use client";

import React, { useState } from "react";
import { StatCard } from "@/components/shared/stat-card";
import { Card3D } from "@/components/shared/card-3d";
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
  ShieldCheck,
  Clock,
  Radio,
} from "lucide-react";
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
    link.download = `nexus_telemetry_report_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInjectEvent = () => {
    const events = [
      { action: "API token generated", entity: "Production Read/Write Key", user: "skram03", status: "active" },
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
      {/* 3D Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>3D Realtime Telemetry Grid</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Command Center
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
            Multi-tenant data isolation, billing throughput, and PostgreSQL kernel telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadReport}
            className="btn-3d border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 gap-2 text-xs font-bold shadow-md"
          >
            <Download className="h-4 w-4 text-cyan-400" /> Export CSV
          </Button>

          <Button
            size="sm"
            onClick={handleInjectEvent}
            className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            <Sparkles className="h-4 w-4" /> Inject Live Event
          </Button>

          <Button size="sm" asChild className="btn-3d bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-bold">
            <Link href="/dashboard/data-manager">
              <Plus className="h-4 w-4 text-cyan-400" /> Add Record
            </Link>
          </Button>
        </div>
      </div>

      {/* 3D KPI Cards with Interactive Cursor Tilt */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Monthly Recurring Revenue"
          value="$48,290.00"
          change="+14.2%"
          trend="up"
          description="vs last 30 days billing"
          icon={DollarSign}
        />
        <StatCard
          title="Active Tenant Orgs"
          value="128"
          change="+8"
          trend="up"
          description="RLS isolated databases"
          icon={Users}
        />
        <StatCard
          title="Query Cache Hit Rate"
          value="99.8%"
          change="+0.4%"
          trend="up"
          description="Postgres partition index"
          icon={Activity}
        />
        <StatCard
          title="Async Worker Queue"
          value="14"
          change="-6"
          trend="down"
          description="background cron jobs"
          icon={PackageCheck}
        />
      </div>

      {/* 3D Interactive Telemetry Stream */}
      <Card3D intensity={8} className="p-6 glass-panel-3d relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            <h3 className="font-black text-base text-white tracking-wide">
              Live PostgreSQL Kernel Events
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
              realtime-channel-01
            </span>
          </div>
          <Link
            href="/dashboard/data-manager"
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-bold transition-colors"
          >
            Open Data Workbench <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-800/60 mt-2">
          {activities.map((act) => (
            <div
              key={act.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-800/40 px-3 rounded-xl transition-all duration-200"
            >
              <div className="space-y-1">
                <p className="font-bold text-sm text-zinc-100 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  {act.action}
                </p>
                <p className="text-xs text-zinc-400 font-mono">
                  <span className="text-cyan-400 font-bold">{act.entity}</span> &bull; Triggered by{" "}
                  <span className="text-zinc-300 font-semibold">{act.user}</span>
                </p>
              </div>
              <div className="flex items-center gap-4 self-end sm:self-center">
                <StatusBadge status={act.status} />
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {act.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card3D>
    </div>
  );
}
