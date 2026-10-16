"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Spatial3DBackground } from "@/components/shared/spatial-3d-bg";
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
  Boxes,
  Radio,
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
    <div className="min-h-screen text-slate-100 flex flex-col md:flex-row relative selection:bg-cyan-500/30 selection:text-cyan-100">
      {/* 3D Animated Spatial Background Canvas */}
      <Spatial3DBackground />

      {/* Cybernetic Isometric Grid */}
      <div className="fixed inset-0 isometric-grid-bg opacity-30 pointer-events-none -z-10" />

      {/* Ambient Volumetric Glows */}
      <div className="fixed top-0 left-64 w-[750px] h-[500px] bg-gradient-to-br from-blue-600/20 via-cyan-500/15 to-transparent blur-[160px] pointer-events-none -z-10" />

      {/* 3D Elevated Spatial Sidebar Console */}
      <aside className="w-full md:w-80 border-r border-slate-700/60 bg-slate-900/70 backdrop-blur-2xl p-6 flex flex-col justify-between shrink-0 z-20 shadow-[10px_0_35px_rgba(2,6,23,0.6)]">
        <div className="space-y-6">
          {/* Brand & Organization Switcher with 3D Depth */}
          <div className="relative">
            <button
              onClick={() => {
                setIsOrgDropdownOpen(!isOrgDropdownOpen);
                setIsNotifDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-left transition-all shadow-[0_8px_25px_rgba(2,6,23,0.5)] group relative z-50 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
            >
              <div className="flex items-center gap-3.5 truncate">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(6,182,212,0.45)] group-hover:scale-105 transition-transform duration-300">
                  <Boxes className="h-6 w-6" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-black tracking-wide truncate text-white">
                    {currentOrg}
                  </p>
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 mt-0.5 font-mono">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />{" "}
                    Enterprise RLS
                  </span>
                </div>
              </div>
              <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 group-hover:text-cyan-400 transition-colors" />
            </button>

            {/* Click-outside backdrop for Org Dropdown */}
            {isOrgDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOrgDropdownOpen(false)}
                />
                <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl glass-panel-3d p-3 shadow-2xl space-y-1.5 animate-in fade-in zoom-in-95">
                  <p className="text-xs font-mono uppercase tracking-widest text-slate-400 px-3 py-1.5 font-bold">
                    Tenant Workspaces
                  </p>
                  {orgs.map((org) => (
                    <button
                      key={org}
                      onClick={() => {
                        setCurrentOrg(org);
                        setIsOrgDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-bold rounded-xl hover:bg-slate-800/80 text-left text-slate-200 transition-colors"
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
          <nav className="space-y-2.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "btn-3d bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.45)] scale-[1.02]"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-400 text-slate-950 shadow-md">
                      {item.badge}
                    </span>
                  )}
                  {isActive && !item.badge && (
                    <span className="ml-auto h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 3D Console Diagnostics */}
        <div className="pt-6 border-t border-slate-700/60 space-y-3.5">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 shadow-inner">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-cyan-400 animate-pulse" /> RLS Kernel
              </span>
              <span className="text-emerald-300 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              PostgreSQL multi-tenant security partition verified.
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <Globe className="h-4 w-4 text-cyan-400" />
            <span>Public Showcase</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-slate-700/60 bg-slate-900/60 backdrop-blur-2xl px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_4px_25px_rgba(2,6,23,0.4)]">
          <div className="flex items-center gap-3">
            <span className="font-black text-base sm:text-lg tracking-wide text-white uppercase font-mono flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.85)] animate-pulse" />
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
                className="relative p-3 rounded-2xl border border-slate-700/80 bg-slate-800/80 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-all shadow-md relative z-50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cyan-400 text-xs text-slate-950 font-black flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.9)] animate-pulse">
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
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-3xl glass-panel-3d p-6 shadow-2xl space-y-4 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-black text-white">
                          Recent System Alerts
                        </span>
                        {unreadCount > 0 && (
                          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 font-mono">
                            {unreadCount} unread
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-xs text-slate-400 hover:text-cyan-400 font-bold transition-colors font-mono"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {quickNotifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                          <div
                            key={notif.id}
                            className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-slate-700/60"
                            onClick={() => setIsNotifDropdownOpen(false)}
                          >
                            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 shrink-0 shadow-inner">
                              <Icon className={`h-4 w-4 ${notif.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-200 truncate">
                                {notif.title}
                              </p>
                              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                                {notif.time}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-slate-700/60">
                      <Link
                        href="/dashboard/notifications"
                        onClick={() => setIsNotifDropdownOpen(false)}
                        className="w-full text-center py-3 rounded-xl btn-3d bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-500/40 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
                      >
                        <span>Open Notification Center</span>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Profile Capsule */}
            <div className="flex items-center gap-3.5 pl-4 border-l border-slate-700/60">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                SK
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-black leading-none text-white">
                  skram03
                </p>
                <p className="text-xs text-cyan-300 font-mono mt-1 font-semibold">
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
