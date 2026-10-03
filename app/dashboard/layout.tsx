"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Users,
  Settings,
  Bell,
  LogOut,
  Globe,
  Building2,
  Check,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  CreditCard,
  Rocket,
  X,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentOrg, setCurrentOrg] = useState("Acme Industrial Corp");
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const orgs = [
    "Acme Industrial Corp",
    "Alpha Logistics LLC",
    "Apex Manufacturing",
  ];

  const quickNotifications = [
    {
      id: "q-1",
      title: "RLS Violation Intercepted",
      time: "Just now",
      icon: ShieldCheck,
      color: "text-rose-400",
    },
    {
      id: "q-2",
      title: "LemonSqueezy Invoice #INV-2026-003",
      time: "18m ago",
      icon: CreditCard,
      color: "text-emerald-400",
    },
    {
      id: "q-3",
      title: "Vercel Edge v1.4.2 Deployed",
      time: "1h ago",
      icon: Rocket,
      color: "text-blue-400",
    },
  ];

  const navLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/data-manager", label: "Data Manager", icon: Layers },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { href: "/dashboard/team", label: "Team Members", icon: Users },
    { href: "/dashboard/settings", label: "Settings & Billing", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row relative selection:bg-primary selection:text-primary-foreground">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-64 w-[600px] h-[400px] bg-primary/10 blur-[150px] pointer-events-none -z-10" />

      {/* 3D Sidebar Console */}
      <aside className="w-full md:w-64 border-r border-zinc-800/80 bg-zinc-900/60 backdrop-blur-2xl p-4 flex flex-col justify-between shrink-0 z-20">
        <div className="space-y-6">
          {/* Organization Switcher with 3D Depth */}
          <div className="relative">
            <button
              onClick={() => {
                setIsOrgDropdownOpen(!isOrgDropdownOpen);
                setIsNotifDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-zinc-700/60 bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 hover:border-zinc-600 text-left transition-all shadow-md group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
                  {currentOrg[0]}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold leading-none truncate text-zinc-100">
                    {currentOrg}
                  </p>
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    Pro Enterprise
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" />
            </button>

            {isOrgDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-zinc-700 bg-zinc-900/95 backdrop-blur-xl p-1.5 shadow-2xl space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 uppercase px-2 py-1">
                  Tenant Organizations
                </p>
                {orgs.map((org) => (
                  <button
                    key={org}
                    onClick={() => {
                      setCurrentOrg(org);
                      setIsOrgDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg hover:bg-zinc-800 text-left text-zinc-200 transition-colors"
                  >
                    <span>{org}</span>
                    {org === currentOrg && (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links with 3D Active Pill */}
          <nav className="space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30 scale-[1.02]"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                  {isActive && !item.badge && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-white shadow-glow" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Console Status & Utilities */}
        <div className="pt-6 border-t border-zinc-800/80 space-y-3">
          <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1.5 shadow-inner">
            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-primary" /> RLS Security
              </span>
              <span className="text-emerald-400 text-[10px] font-mono">
                ENFORCED
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 leading-tight">
              PostgreSQL multi-tenant policies active.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>Public Home</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm tracking-tight text-zinc-200 capitalize">
              {pathname === "/dashboard"
                ? "Executive Control Center"
                : pathname.replace("/dashboard/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications Bell with 3D Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors shadow-sm"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white font-bold flex items-center justify-center shadow-lg shadow-primary/50 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl p-4 shadow-2xl space-y-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-100">
                        Recent Alerts
                      </span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/20 text-primary border border-primary/30">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-[11px] text-zinc-400 hover:text-zinc-200 font-semibold transition-colors"
                    >
                      Mark read
                    </button>
                  </div>

                  <div className="space-y-2">
                    {quickNotifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <div
                          key={notif.id}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-900/80 transition-colors cursor-pointer"
                          onClick={() => setIsNotifDropdownOpen(false)}
                        >
                          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                            <Icon className={`h-3.5 w-3.5 ${notif.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-zinc-200 truncate">
                              {notif.title}
                            </p>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {notif.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs">
                    <Link
                      href="/dashboard/notifications"
                      onClick={() => setIsNotifDropdownOpen(false)}
                      className="w-full text-center py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold border border-primary/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Open Notification Center</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-indigo-500 text-white font-bold flex items-center justify-center text-xs shadow-md shadow-primary/30">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-none text-zinc-200">
                  John Doe
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  Workspace Owner
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
