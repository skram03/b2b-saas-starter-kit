"use client";

import React, { useState, useEffect } from "react";
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
  Box,
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
      color: "text-cyan-400",
    },
  ];

  const navLinks = [
    { href: "/dashboard", label: "Control Center", icon: LayoutDashboard },
    { href: "/dashboard/data-manager", label: "3D Data Manager", icon: Layers },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { href: "/dashboard/team", label: "Team Members", icon: Users },
    { href: "/dashboard/settings", label: "Settings & Billing", icon: Settings },
  ];

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOrgDropdownOpen(false);
        setIsNotifDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070a] text-zinc-100 flex flex-col md:flex-row relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Cybernetic Background Ambient Grid */}
      <div className="fixed inset-0 isometric-grid-bg opacity-20 pointer-events-none -z-10" />

      {/* Volumetric Radial Glows */}
      <div className="fixed top-0 left-64 w-[700px] h-[450px] bg-gradient-to-br from-indigo-600/15 via-cyan-500/10 to-transparent blur-[160px] pointer-events-none -z-10" />

      {/* 3D Elevated Sidebar Console */}
      <aside className="w-full md:w-68 border-r border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl p-4 flex flex-col justify-between shrink-0 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="space-y-6">
          {/* Brand & Organization Switcher with 3D Depth */}
          <div className="relative">
            <button
              onClick={() => {
                setIsOrgDropdownOpen(!isOrgDropdownOpen);
                setIsNotifDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-zinc-700/60 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 text-left transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative z-50 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform duration-300">
                  <Box className="h-5 w-5" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-black tracking-wide truncate text-white">
                    {currentOrg}
                  </p>
                  <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1.5 mt-0.5 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
                    Enterprise RLS
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0 group-hover:text-cyan-400 transition-colors" />
            </button>

            {/* Click-outside backdrop for Org Dropdown */}
            {isOrgDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOrgDropdownOpen(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl glass-panel-3d p-2 shadow-2xl space-y-1 animate-in fade-in zoom-in-95">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 px-3 py-1.5">
                    Tenant Workspaces
                  </p>
                  {orgs.map((org) => (
                    <button
                      key={org}
                      onClick={() => {
                        setCurrentOrg(org);
                        setIsOrgDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl hover:bg-zinc-800 text-left text-zinc-200 transition-colors"
                    >
                      <span>{org}</span>
                      {org === currentOrg && (
                        <Check className="h-4 w-4 text-cyan-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Navigation Links with 3D Beveled Pill */}
          <nav className="space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-400 text-zinc-950 shadow-md">
                      {item.badge}
                    </span>
                  )}
                  {isActive && !item.badge && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 3D Console Diagnostics */}
        <div className="pt-6 border-t border-zinc-800/80 space-y-3">
          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-1.5 shadow-inner">
            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-200">
              <span className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> RLS Kernel
              </span>
              <span className="text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/70">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono leading-tight">
              PostgreSQL multi-tenant security partition verified.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <Globe className="h-4 w-4 text-cyan-400" />
            <span>Public Home</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-18 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="font-black text-sm tracking-wide text-white uppercase font-mono flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              {pathname === "/dashboard"
                ? "Executive Control Center"
                : pathname.replace("/dashboard/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* 3D Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifDropdownOpen(!isNotifDropdownOpen);
                  setIsOrgDropdownOpen(false);
                }}
                className="relative p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-cyan-500/50 text-zinc-400 hover:text-white transition-all shadow-md relative z-50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-cyan-400 text-[10px] text-zinc-950 font-black flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Click-outside backdrop for Bell Dropdown */}
              {isNotifDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotifDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl glass-panel-3d p-4 shadow-2xl space-y-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          Recent System Alerts
                        </span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
                            {unreadCount} unread
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-[11px] text-zinc-400 hover:text-cyan-400 font-bold transition-colors font-mono"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="space-y-2">
                      {quickNotifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                          <div
                            key={notif.id}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-800/60 transition-colors cursor-pointer border border-transparent hover:border-zinc-700/60"
                            onClick={() => setIsNotifDropdownOpen(false)}
                          >
                            <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 shadow-inner">
                              <Icon className={`h-4 w-4 ${notif.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-zinc-200 truncate">
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

                    <div className="pt-2 border-t border-zinc-800/80">
                      <Link
                        href="/dashboard/notifications"
                        onClick={() => setIsNotifDropdownOpen(false)}
                        className="w-full text-center py-2.5 rounded-xl btn-3d bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30 transition-all flex items-center justify-center gap-2 text-xs shadow-sm"
                      >
                        <span>Open Notification Center</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile Capsule */}
            <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                SK
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-none text-white">
                  skram03
                </p>
                <p className="text-[10px] text-cyan-400 font-mono mt-0.5">
                  Super Admin
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
