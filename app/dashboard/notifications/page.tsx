"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  ShieldAlert,
  CreditCard,
  Rocket,
  Users,
  Webhook,
  Sparkles,
  ExternalLink,
  Filter,
  Send,
  Sliders,
  AlertCircle,
  FileText,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card3D } from "@/components/shared/card-3d";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "billing" | "security" | "deployment" | "team" | "webhook";
  timestamp: string;
  isRead: boolean;
  priority: "p0" | "p1" | "p2";
  actionLabel?: string;
  actionPayload?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Postgres RLS Cross-Tenant Violation Blocked",
    message:
      "A query attempting to access organization data without proper auth.uid() token was intercepted and rejected by PostgreSQL Row Level Security.",
    category: "security",
    timestamp: "Just now",
    isRead: false,
    priority: "p0",
    actionLabel: "Inspect Security Log",
    actionPayload: "SELECT * FROM audit_logs WHERE incident_id = 'SEC-9921'",
  },
  {
    id: "notif-2",
    title: "LemonSqueezy Invoice #INV-2026-003 Generated",
    message:
      "Monthly subscription invoice for $149.00 USD (Pro Enterprise License) was charged and settled successfully.",
    category: "billing",
    timestamp: "18 minutes ago",
    isRead: false,
    priority: "p1",
    actionLabel: "View Invoice Details",
    actionPayload: "Invoice: INV-2026-003 | Amount: $149.00 | Card: •••• 4242",
  },
  {
    id: "notif-3",
    title: "Production Release v1.4.2 Deployed to Vercel",
    message:
      "Edge runtime bundle compiled in 1,240ms with 100% static cache hit ratio on regional CDN nodes.",
    category: "deployment",
    timestamp: "1 hour ago",
    isRead: false,
    priority: "p2",
    actionLabel: "View Deployment Logs",
    actionPayload: "Deployment ID: dpl_88f921a | Status: Ready | Regions: IAD1, FRA1",
  },
  {
    id: "notif-4",
    title: "New Team Member Invitation Accepted",
    message:
      "Sarah Connor (s.connor@cyberdyne.io) has joined the organization under the Admin role.",
    category: "team",
    timestamp: "4 hours ago",
    isRead: true,
    priority: "p2",
    actionLabel: "Manage Permissions",
    actionPayload: "User: s.connor@cyberdyne.io | Assigned Role: admin",
  },
  {
    id: "notif-5",
    title: "Webhook Payload Processed: subscription_updated",
    message:
      "Inbound LemonSqueezy webhook payload verified with HMAC-SHA256 signature and synced to organizations table.",
    category: "webhook",
    timestamp: "Yesterday",
    isRead: true,
    priority: "p1",
    actionLabel: "Inspect Webhook Payload",
    actionPayload: "Webhook ID: wh_7721a | Signature: 2b90ff... Verified",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );
  const [activeTab, setActiveTab] = useState<
    "all" | "unread" | "billing" | "security" | "deployment" | "webhook"
  >("all");
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);
  const [bannerToast, setBannerToast] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedNotification(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Preference switches
  const [prefs, setPrefs] = useState({
    emailSummary: true,
    slackWebhook: true,
    smsAlerts: false,
    browserPush: true,
  });

  const showToast = (msg: string) => {
    setBannerToast(msg);
    setTimeout(() => setBannerToast(null), 3500);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "all") return true;
    return n.category === activeTab;
  });

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast("All notifications marked as read.");
  };

  const handleClearAll = () => {
    setNotifications([]);
    showToast("All notifications cleared from feed.");
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("Notification deleted.");
  };

  const handleSimulateAlert = () => {
    const alertTypes = [
      {
        title: "Realtime Webhook Received: invoice_paid",
        message: "Payment of $149.00 confirmed from Stripe webhook handler.",
        category: "billing" as const,
        priority: "p1" as const,
        actionLabel: "View Receipt",
        actionPayload: "Receipt #REC-8891 generated and emailed to billing admin.",
      },
      {
        title: "RLS Audit Warning: High Frequency Read Request",
        message: "Tenant Acme Corp executed 450 items queries in under 5 seconds.",
        category: "security" as const,
        priority: "p0" as const,
        actionLabel: "Review Traffic",
        actionPayload: "Client IP: 198.51.100.44 | Origin: api.client.internal",
      },
      {
        title: "Automated Backup Completed",
        message: "PostgreSQL WAL archive snapshot uploaded to secure cold storage.",
        category: "deployment" as const,
        priority: "p2" as const,
        actionLabel: "View Snapshot",
        actionPayload: "Snapshot: pg_snap_20261003_1200.tar.gz (42.8 MB)",
      },
    ];

    const randomAlert =
      alertTypes[Math.floor(Math.random() * alertTypes.length)];

    const newNotif: NotificationItem = {
      id: `sim-${Date.now()}`,
      title: randomAlert.title,
      message: randomAlert.message,
      category: randomAlert.category,
      timestamp: "Just now",
      isRead: false,
      priority: randomAlert.priority,
      actionLabel: randomAlert.actionLabel,
      actionPayload: randomAlert.actionPayload,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`🔔 New Live Alert: ${newNotif.title}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <ShieldAlert className="h-4 w-4 text-rose-400" />;
      case "billing":
        return <CreditCard className="h-4 w-4 text-emerald-400" />;
      case "deployment":
        return <Rocket className="h-4 w-4 text-blue-400" />;
      case "team":
        return <Users className="h-4 w-4 text-amber-400" />;
      case "webhook":
        return <Webhook className="h-4 w-4 text-purple-400" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const getPriorityBadge = (priority: "p0" | "p1" | "p2") => {
    switch (priority) {
      case "p0":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-950/70 border border-rose-800 text-rose-300 flex items-center gap-1.5 font-mono">
            <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
            CRITICAL P0
          </span>
        );
      case "p1":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/70 border border-amber-800 text-amber-300 font-mono">
            HIGH P1
          </span>
        );
      case "p2":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 font-mono">
            INFO P2
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {bannerToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl border border-cyan-500/40 glass-panel-3d text-white text-xs font-semibold shadow-[0_20px_50px_rgba(2,6,23,0.8)] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 font-mono">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>{bannerToast}</span>
        </div>
      )}

      {/* 3D Header & Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Bell className="h-3.5 w-3.5" /> Realtime Event Stream Hub
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-md">
            Notification Center
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Audit logs, billing events, security triggers, and multi-tenant webhook streams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleSimulateAlert}
            className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)] gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Simulate Alert
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs gap-1.5 font-mono"
          >
            <CheckCheck className="h-3.5 w-3.5 text-cyan-400" />
            Mark all read
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            className="border-slate-700/80 bg-slate-800/80 hover:bg-rose-950/50 hover:text-rose-300 text-slate-400 text-xs gap-1.5 font-mono"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-300 text-xs" style={{ transform: "translateZ(15px)" }}>
            <span className="font-mono uppercase font-bold text-xs">Total Logged</span>
            <Bell className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2 font-mono" style={{ transform: "translateZ(25px)" }}>
            {notifications.length}
          </div>
          <span className="text-xs text-slate-300 font-mono mt-1 inline-block" style={{ transform: "translateZ(10px)" }}>Recorded events</span>
        </Card3D>

        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-300 text-xs" style={{ transform: "translateZ(15px)" }}>
            <span className="font-mono uppercase font-bold text-xs">Unread Attention</span>
            <AlertCircle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 mt-2 font-mono" style={{ transform: "translateZ(25px)" }}>
            {unreadCount}
          </div>
          <span className="text-xs text-amber-300/90 font-mono mt-1 inline-block" style={{ transform: "translateZ(10px)" }}>Pending review</span>
        </Card3D>

        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-300 text-xs" style={{ transform: "translateZ(15px)" }}>
            <span className="font-mono uppercase font-bold text-xs">P0 Security</span>
            <ShieldAlert className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400 mt-2 font-mono" style={{ transform: "translateZ(25px)" }}>
            {notifications.filter((n) => n.priority === "p0").length}
          </div>
          <span className="text-xs text-slate-300 font-mono mt-1 inline-block" style={{ transform: "translateZ(10px)" }}>Zero breaches</span>
        </Card3D>

        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-300 text-xs" style={{ transform: "translateZ(15px)" }}>
            <span className="font-mono uppercase font-bold text-xs">Stream Health</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-2 font-mono" style={{ transform: "translateZ(25px)" }}>99.98%</div>
          <span className="text-xs text-emerald-300/90 font-mono mt-1 inline-block" style={{ transform: "translateZ(10px)" }}>Live sync active</span>
        </Card3D>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-700/80">
        {[
          { key: "all", label: "All Events", count: notifications.length },
          { key: "unread", label: "Unread", count: unreadCount },
          {
            key: "security",
            label: "Security & RLS",
            count: notifications.filter((n) => n.category === "security").length,
          },
          {
            key: "billing",
            label: "Billing",
            count: notifications.filter((n) => n.category === "billing").length,
          },
          {
            key: "deployment",
            label: "Deployments",
            count: notifications.filter((n) => n.category === "deployment").length,
          },
          {
            key: "webhook",
            label: "Webhooks",
            count: notifications.filter((n) => n.category === "webhook").length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold ${
                activeTab === tab.key
                  ? "bg-white/25 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notification Stream Feed */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-700/80 glass-panel-3d">
            <CheckCheck className="h-10 w-10 text-cyan-400/60 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">All caught up!</h3>
            <p className="text-sm text-slate-300 mt-1">
              No notifications found matching the active filter.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl border p-5 transition-all backdrop-blur-xl ${
                item.isRead
                  ? "border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70"
                  : "border-cyan-500/40 bg-gradient-to-r from-cyan-950/20 via-slate-900/80 to-slate-950 shadow-[0_4px_25px_rgba(6,182,212,0.1)]"
              }`}
            >
              {/* Unread Glow Dot */}
              {!item.isRead && (
                <div className="absolute top-5 left-2 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-3">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-sm font-bold text-white">
                      {item.title}
                    </span>
                    {getPriorityBadge(item.priority)}
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono font-medium">
                      <Clock className="h-3.5 w-3.5 text-cyan-400" /> {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.message}
                  </p>

                  {item.actionLabel && (
                    <div className="pt-1">
                      <button
                        onClick={() => setSelectedNotification(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
                      >
                        <span>{item.actionLabel}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-1 shrink-0 self-end sm:self-start opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleToggleRead(item.id)}
                    className="p-1.5 rounded-lg border border-slate-700/80 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title={item.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    <Check className={`h-3.5 w-3.5 ${item.isRead ? "text-emerald-400" : ""}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg border border-slate-700/80 bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 transition-colors"
                    title="Delete notification"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Preferences Drawer Card */}
      <div className="rounded-3xl border border-slate-700/80 glass-panel-3d p-7 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-cyan-400" /> Delivery Channels &amp; Preferences
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure how alerts are dispatched across third-party webhooks and communication rails.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md">
            <div>
              <p className="text-sm font-bold text-white">Email Digest</p>
              <p className="text-xs text-slate-300 font-medium">Weekly operational audit summary</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, emailSummary: !prefs.emailSummary });
                showToast("Email preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.emailSummary ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  prefs.emailSummary ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md">
            <div>
              <p className="text-sm font-bold text-white">Slack / Discord Webhook</p>
              <p className="text-xs text-slate-300 font-medium">Live events posted to developer channel</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, slackWebhook: !prefs.slackWebhook });
                showToast("Slack webhook preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.slackWebhook ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  prefs.slackWebhook ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md">
            <div>
              <p className="text-sm font-bold text-white">P0 SMS Emergency Alert</p>
              <p className="text-xs text-slate-300 font-medium">Instant SMS on critical security triggers</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, smsAlerts: !prefs.smsAlerts });
                showToast("SMS emergency alert preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.smsAlerts ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  prefs.smsAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-md">
            <div>
              <p className="text-sm font-bold text-white">Browser Push Notifications</p>
              <p className="text-xs text-slate-300 font-medium">Desktop notifications when tab is backgrounded</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, browserPush: !prefs.browserPush });
                showToast("Browser push preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.browserPush ? "bg-gradient-to-r from-cyan-500 to-blue-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  prefs.browserPush ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Inspection Modal with 3D Spatial Tilt */}
      {selectedNotification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in [perspective:1200px]"
          onClick={() => setSelectedNotification(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-slate-700/80 glass-panel-3d p-7 shadow-[0_25px_60px_-15px_rgba(2,6,23,0.9)] space-y-5 [transform:rotateX(2deg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-cyan-400">
                  {getCategoryIcon(selectedNotification.category)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {selectedNotification.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono font-medium">
                    ID: {selectedNotification.id} • {selectedNotification.timestamp}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {selectedNotification.message}
            </p>

            {selectedNotification.actionPayload && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Associated Payload &amp; Audit Data
                </label>
                <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-cyan-400 break-all select-all shadow-inner">
                  {selectedNotification.actionPayload}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-700/80">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNotification(null)}
                className="border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  showToast("Payload copied to clipboard.");
                  navigator.clipboard?.writeText(
                    selectedNotification.actionPayload || ""
                  );
                  setSelectedNotification(null);
                }}
                className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)]"
              >
                Copy Payload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
