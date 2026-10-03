import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  Users,
  Settings,
  Bell,
  Search,
  ExternalLink,
} from "lucide-react";
import { OrgSwitcher } from "@/components/shared/org-switcher";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgId: string };
}) {
  const currentOrg = {
    id: params.orgId || "demo-org",
    name: "Acme Industrial Corp",
    slug: "acme-corp",
  };

  const orgs = [
    currentOrg,
    { id: "alpha-logistics", name: "Alpha Logistics LLC", slug: "alpha-logistics" },
  ];

  const navLinks = [
    { href: `/org/${params.orgId || "demo"}`, label: "Overview", icon: LayoutDashboard },
    { href: `/org/${params.orgId || "demo"}/data-manager`, label: "Data Manager", icon: Layers },
    { href: `/org/${params.orgId || "demo"}/team`, label: "Team Members", icon: Users },
    { href: `/org/${params.orgId || "demo"}/settings`, label: "Settings & Billing", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card p-4 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="px-2">
            <OrgSwitcher
              currentOrg={currentOrg}
              organizations={orgs}
              onSelectOrg={(org) => console.log("Switching to", org.name)}
            />
          </div>

          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg text-xs space-y-1 text-muted-foreground">
          <div className="font-semibold text-foreground flex items-center justify-between">
            <span>NexusB2B v1.0</span>
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">Pro</span>
          </div>
          <p>Multi-Tenant RLS Enabled</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Organization Portal</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-8 w-8 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
