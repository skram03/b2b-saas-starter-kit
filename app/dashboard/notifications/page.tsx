"use client";

import React, { useState } from "react";
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
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/70 border border-rose-800 text-rose-300 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
            CRITICAL P0
          </span>
        );
      case "p1":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/70 border border-amber-800 text-amber-300">
            HIGH P1
          </span>
        );
      case "p2":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 border border-zinc-700 text-zinc-400">
            INFO P2
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {bannerToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl border border-primary/30 bg-zinc-900/95 backdrop-blur-xl text-zinc-100 text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>{bannerToast}</span>
        </div>
      )}

      {/* 3D Header & Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <Bell className="h-3.5 w-3.5" /> Realtime Event Hub
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-50">
            Developer Notification Center
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Audit logs, billing events, security triggers, and multi-tenant webhook streams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleSimulateAlert}
            className="bg-primary hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-primary/30 gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Simulate Alert
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs gap-1.5"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all read
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            className="border-zinc-800 bg-zinc-900/80 hover:bg-rose-950/40 hover:text-rose-300 text-zinc-400 text-xs gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/70 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Total Logged</span>
            <Bell className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-zinc-100 mt-2">
            {notifications.length}
          </div>
          <span className="text-[10px] text-zinc-500 font-medium">Recorded events</span>
        </div>

        <div className="p-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/70 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Unread Attention</span>
            <AlertCircle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {unreadCount}
          </div>
          <span className="text-[10px] text-amber-400/80 font-medium">Pending review</span>
        </div>

        <div className="p-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/70 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>P0 Security Alerts</span>
            <ShieldAlert className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400 mt-2">
            {notifications.filter((n) => n.priority === "p0").length}
          </div>
          <span className="text-[10px] text-zinc-500 font-medium">Zero breaches</span>
        </div>

        <div className="p-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/70 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Stream Health</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">99.98%</div>
          <span className="text-[10px] text-emerald-400/80 font-medium">Live sync active</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-zinc-800">
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
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                activeTab === tab.key
                  ? "bg-white/20 text-white"
                  : "bg-zinc-800 text-zinc-400"
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
          <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/60">
            <CheckCheck className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-zinc-300">All caught up!</h3>
            <p className="text-xs text-zinc-500 mt-1">
              No notifications found matching the active filter.
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl border p-5 transition-all backdrop-blur-xl ${
                item.isRead
                  ? "border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/60"
                  : "border-primary/40 bg-gradient-to-r from-primary/10 via-zinc-900/80 to-zinc-950 shadow-lg shadow-primary/5"
              }`}
            >
              {/* Unread Glow Dot */}
              {!item.isRead && (
                <div className="absolute top-5 left-2 h-2 w-2 rounded-full bg-primary shadow-glow animate-pulse" />
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-3">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-xs font-bold text-zinc-100">
                      {item.title}
                    </span>
                    {getPriorityBadge(item.priority)}
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" /> {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.message}
                  </p>

                  {item.actionLabel && (
                    <div className="pt-1">
                      <button
                        onClick={() => setSelectedNotification(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-blue-400 transition-colors"
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
                    className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                    title={item.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    <Check className={`h-3.5 w-3.5 ${item.isRead ? "text-emerald-400" : ""}`} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-rose-950/60 hover:text-rose-300 text-zinc-400 transition-colors"
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
      <div className="rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-6 backdrop-blur-xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="font-bold text-sm text-zinc-100 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-primary" /> Delivery Channels &amp; Preferences
            </h3>
            <p className="text-xs text-zinc-500">
              Configure how alerts are dispatched across third-party webhooks and communication rails.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <div>
              <p className="text-xs font-bold text-zinc-200">Email Digest</p>
              <p className="text-[10px] text-zinc-500">Weekly operational audit summary</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, emailSummary: !prefs.emailSummary });
                showToast("Email preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.emailSummary ? "bg-primary" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  prefs.emailSummary ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <div>
              <p className="text-xs font-bold text-zinc-200">Slack / Discord Webhook</p>
              <p className="text-[10px] text-zinc-500">Live events posted to developer channel</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, slackWebhook: !prefs.slackWebhook });
                showToast("Slack webhook preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.slackWebhook ? "bg-primary" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  prefs.slackWebhook ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <div>
              <p className="text-xs font-bold text-zinc-200">P0 SMS Emergency Alert</p>
              <p className="text-[10px] text-zinc-500">Instant SMS on critical security triggers</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, smsAlerts: !prefs.smsAlerts });
                showToast("SMS emergency alert preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.smsAlerts ? "bg-primary" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  prefs.smsAlerts ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950/60">
            <div>
              <p className="text-xs font-bold text-zinc-200">Browser Push Notifications</p>
              <p className="text-[10px] text-zinc-500">Desktop notifications when tab is backgrounded</p>
            </div>
            <button
              onClick={() => {
                setPrefs({ ...prefs, browserPush: !prefs.browserPush });
                showToast("Browser push preference updated.");
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs.browserPush ? "bg-primary" : "bg-zinc-800"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  prefs.browserPush ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Inspection Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800">
                  {getCategoryIcon(selectedNotification.category)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100">
                    {selectedNotification.title}
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    ID: {selectedNotification.id} • {selectedNotification.timestamp}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-zinc-500 hover:text-zinc-300 text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-300">
              {selectedNotification.message}
            </p>

            {selectedNotification.actionPayload && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Associated Payload &amp; Audit Data
                </label>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-400 break-all select-all">
                  {selectedNotification.actionPayload}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNotification(null)}
                className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs"
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
                className="font-bold text-xs shadow-lg shadow-primary/20"
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
