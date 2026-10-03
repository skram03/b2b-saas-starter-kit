"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [currentOrg, setCurrentOrg] = useState("Acme Industrial Corp");
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);

  const orgs = ["Acme Industrial Corp", "Alpha Logistics LLC", "Apex Manufacturing"];

  const navLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/data-manager", label: "Data Manager", icon: Layers },
    { href: "/dashboard/team", label: "Team Members", icon: Users },
    { href: "/dashboard/settings", label: "Settings & Billing", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Organization Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg border bg-background hover:bg-muted/50 text-left transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <div className="h-7 w-7 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {currentOrg[0]}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold leading-none truncate">{currentOrg}</p>
                  <span className="text-[10px] text-muted-foreground">Pro Tier</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>

            {isOrgDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border bg-card p-1 shadow-lg space-y-0.5">
                <p className="text-[10px] font-bold text-muted-foreground uppercase px-2 py-1">
                  Organizations
                </p>
                {orgs.map((org) => (
                  <button
                    key={org}
                    onClick={() => {
                      setCurrentOrg(org);
                      setIsOrgDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-accent text-left"
                  >
                    <span>{org}</span>
                    {org === currentOrg && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Links */}
        <div className="pt-6 border-t border-border/80 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>Public Website</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm capitalize">
              {pathname === "/dashboard"
                ? "Overview"
                : pathname.replace("/dashboard/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                alert("You have 3 notifications: Database backup completed, Sarah accepted invite, Stripe payout sent.");
                setNotificationsCount(0);
              }}
              className="relative p-2 rounded-full border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground font-bold flex items-center justify-center">
                  {notificationsCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 pl-2 border-l">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold leading-none">John Doe</p>
                <p className="text-[10px] text-muted-foreground">Admin</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
