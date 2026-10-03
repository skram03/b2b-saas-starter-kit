"use client";

import React from "react";
import { StatCard } from "@/components/shared/stat-card";
import { Users, DollarSign, Activity, PackageCheck, ArrowUpRight, Plus, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardOverviewPage() {
  const recentActivities = [
    { id: 1, action: "New order recorded", entity: "Hydraulic Pump x4", user: "Sarah Connor", status: "completed", time: "10 mins ago" },
    { id: 2, action: "Inventory adjusted", entity: "Steel Barrels", user: "Michael Scott", status: "in_progress", time: "1 hour ago" },
    { id: 3, action: "Member joined", entity: "David Miller (Staff)", user: "Admin", status: "active", time: "3 hours ago" },
    { id: 4, action: "Invoice generated", entity: "#INV-2026-081", user: "Automated System", status: "pending", time: "5 hours ago" },
  ];

  const handleDownloadReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Event,Entity,Initiator,Status,Timestamp"]
        .concat(recentActivities.map((a) => `"${a.action}","${a.entity}","${a.user}",${a.status},"${a.time}"`))
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `executive_kpi_report_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Overview</h1>
          <p className="text-sm text-muted-foreground">
            Real-time business performance, team activity, and operational throughput.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadReport} className="gap-1.5">
            <Download className="h-4 w-4" /> Download Report
          </Button>
          <Button size="sm" asChild className="gap-1.5">
            <Link href="/dashboard/data-manager">
              <Plus className="h-4 w-4" /> Create New Entry
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Monthly Revenue"
          value="$48,290.00"
          change="+14.2%"
          trend="up"
          description="vs last month"
          icon={DollarSign}
        />
        <StatCard
          title="Active Accounts"
          value="128"
          change="+4"
          trend="up"
          description="enterprise clients"
          icon={Users}
        />
        <StatCard
          title="Operational Efficiency"
          value="98.4%"
          change="+0.8%"
          trend="up"
          description="on-time fulfillment"
          icon={Activity}
        />
        <StatCard
          title="Pending Dispatches"
          value="18"
          change="-5"
          trend="down"
          description="scheduled for today"
          icon={PackageCheck}
        />
      </div>

      {/* Activity Log and System Feed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Live Operational Stream</CardTitle>
          <Link href="/dashboard/data-manager" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
            View full data grid <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {recentActivities.map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-foreground">{act.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {act.entity} &bull; Triggered by <span className="font-medium text-foreground">{act.user}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={act.status} />
                  <span className="text-xs text-muted-foreground">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
