"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Database,
  Layers,
  Sparkles,
  CreditCard,
  Code2,
  CheckCircle2,
  Server,
  Lock,
  DollarSign,
  TrendingUp,
  Activity,
  Terminal,
  Laptop,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "code" | "table">("overview");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      {/* Background ambient mesh glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/20 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* Navigation */}
      <header className="border-b border-zinc-800/80 backdrop-blur-xl sticky top-0 z-50 bg-zinc-950/80">
        <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-blue-400 text-white flex items-center justify-center font-black shadow-lg shadow-primary/30">
              B
            </div>
            <span className="font-extrabold bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              B2B Starter Kit
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-zinc-100 transition-colors">
              Features
            </Link>
            <Link href="#preview" className="hover:text-zinc-100 transition-colors">
              3D Interface
            </Link>
            <Link href="#architecture" className="hover:text-zinc-100 transition-colors">
              Architecture
            </Link>
            <Link href="/docs" className="hover:text-zinc-100 transition-colors">
              Documentation
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-zinc-50 hover:bg-zinc-900">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="gap-1.5 shadow-lg shadow-primary/20">
                Live Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-20 pb-12 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-primary text-xs font-semibold mb-8 shadow-inner">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Next.js 14 App Router &bull; Supabase RLS &bull; TanStack Grid</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] text-zinc-50">
            Ship B2B Software in{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Days, Not Months
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The multi-tenant architecture designed specifically for developers.
            Pre-built with granular Row Level Security, TanStack tables, and interactive dashboards.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-base font-bold shadow-xl shadow-primary/25 gap-2">
                Launch Live Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50">
                Browse Documentation
              </Button>
            </Link>
          </div>
        </section>

        {/* 3D Perspective Screen Showcase */}
        <section id="preview" className="py-12 px-4 max-w-6xl mx-auto [perspective:1400px]">
          <div className="text-center mb-6">
            <div className="inline-flex items-center p-1 bg-zinc-900 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-primary text-white shadow"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Executive Dashboard
              </button>
              <button
                onClick={() => setActiveTab("table")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "table"
                    ? "bg-primary text-white shadow"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                TanStack Data Grid
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "code"
                    ? "bg-primary text-white shadow"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                PostgreSQL RLS Engine
              </button>
            </div>
          </div>

          {/* 3D Tilted Glass Canvas */}
          <div className="relative group transition-transform duration-700 ease-out [transform-style:preserve-3d] hover:[transform:rotateX(0deg)_rotateY(0deg)] [transform:rotateX(12deg)_rotateY(-5deg)]">
            {/* Ambient Shadow glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-2xl group-hover:opacity-60 transition duration-700" />

            {/* Floating 3D Badge (Layer 1 - translateZ 50px) */}
            <div className="absolute -top-6 -right-4 hidden lg:flex items-center gap-2 p-3 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 shadow-2xl backdrop-blur-xl [transform:translateZ(60px)] z-30">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-zinc-100">+34% MRR Growth</p>
                <p className="text-[10px] text-zinc-400">Automated Billing Sync</p>
              </div>
            </div>

            {/* Floating 3D Security Badge (Layer 2 - translateZ 40px) */}
            <div className="absolute -bottom-6 -left-4 hidden lg:flex items-center gap-2 p-3 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 shadow-2xl backdrop-blur-xl [transform:translateZ(50px)] z-30">
              <div className="h-8 w-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
                <Lock className="h-4 w-4" />
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-zinc-100">PostgreSQL RLS Active</p>
                <p className="text-[10px] text-zinc-400">Tenant Isolation Enforced</p>
              </div>
            </div>

            {/* Screen Mockup Container */}
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden p-4 sm:p-6 text-left">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-zinc-500">app.starterkit.com/dashboard</span>
                </div>
                <Link href="/dashboard">
                  <span className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                    Open Fullscreen &rarr;
                  </span>
                </Link>
              </div>

              {/* Dynamic Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <p className="text-[11px] font-medium text-zinc-400">Monthly Revenue</p>
                      <p className="text-xl font-bold text-zinc-100 mt-1">$48,290.00</p>
                      <span className="text-[10px] font-semibold text-emerald-400">+14.2%</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <p className="text-[11px] font-medium text-zinc-400">Enterprise Clients</p>
                      <p className="text-xl font-bold text-zinc-100 mt-1">128 Orgs</p>
                      <span className="text-[10px] font-semibold text-emerald-400">+4 this week</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <p className="text-[11px] font-medium text-zinc-400">Fulfillment</p>
                      <p className="text-xl font-bold text-zinc-100 mt-1">99.4%</p>
                      <span className="text-[10px] font-semibold text-blue-400">Target Met</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                      <p className="text-[11px] font-medium text-zinc-400">API Latency</p>
                      <p className="text-xl font-bold text-zinc-100 mt-1">18ms</p>
                      <span className="text-[10px] font-semibold text-emerald-400">Edge Cached</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                      <span>Realtime Operations Stream</span>
                      <span className="text-emerald-400 font-mono text-[10px]">● LIVE SYNC</span>
                    </div>
                    <div className="divide-y divide-zinc-800/60 text-xs">
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-zinc-200">#REC-101 Heavy Duty Forklift 3T &bull; Asset Deployed</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">Active</span>
                      </div>
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-zinc-200">#INV-2026-081 Apex Foundations &bull; Voucher Generated</span>
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-semibold">Completed</span>
                      </div>
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-zinc-200">Team invite accepted by Sarah Connor (Admin)</span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-semibold">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "table" && (
                <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400">
                      <tr>
                        <th className="p-3">ID Code</th>
                        <th className="p-3">Asset Title</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Valuation</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr>
                        <td className="p-3 font-mono font-bold text-primary">REC-101</td>
                        <td className="p-3 font-semibold text-zinc-100">Heavy Duty Forklift 3T</td>
                        <td className="p-3">Heavy Equipment</td>
                        <td className="p-3 font-mono">$4,500.00</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">Active</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-primary">REC-102</td>
                        <td className="p-3 font-semibold text-zinc-100">Hydraulic Jack Set 10T</td>
                        <td className="p-3">Tools</td>
                        <td className="p-3 font-mono">$750.00</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold">Completed</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-primary">REC-103</td>
                        <td className="p-3 font-semibold text-zinc-100">Diesel Generator 20kVA</td>
                        <td className="p-3">Power Systems</td>
                        <td className="p-3 font-mono">$2,800.00</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold">In Progress</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "code" && (
                <div className="p-4 rounded-xl bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800 overflow-x-auto space-y-1.5">
                  <p className="text-zinc-500">// PostgreSQL Multi-Tenant Row Level Security (RLS)</p>
                  <p><span className="text-purple-400">CREATE POLICY</span> <span className="text-emerald-400">"Tenant Data Isolation"</span></p>
                  <p className="pl-4"><span className="text-purple-400">ON</span> public.items <span className="text-purple-400">FOR ALL</span></p>
                  <p className="pl-4"><span className="text-purple-400">USING</span> (</p>
                  <p className="pl-8 text-blue-400">public.is_org_member(org_id)</p>
                  <p className="pl-4">);</p>
                  <p className="text-emerald-400 pt-2 font-bold">✓ Active: Enforced across all queries, webhooks &amp; server actions</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-20 bg-zinc-900/40 border-y border-zinc-800/80">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-50">
                Engineered for Modern Developers
              </h2>
              <p className="mt-3 text-zinc-400">
                Stop wasting 40+ hours setting up authentication, database policies, and data tables.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-lg hover:border-zinc-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-zinc-100">Multi-Tenant RBAC</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Strict Row Level Security (RLS) policies at the PostgreSQL level. Support for Owner, Admin, and Member roles out of the box.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-lg hover:border-zinc-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-zinc-100">TanStack Data Tables</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Fast client-side and server-side filtering, sorting, column visibility, and instant 1-click CSV/Excel export.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-lg hover:border-zinc-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-zinc-100">Billing &amp; Webhooks</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  Plug-and-play LemonSqueezy / Stripe billing integration with webhook listeners for automated tier upgrades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-50">
                Multi-Tenant Architecture
              </h2>
              <p className="mt-3 text-zinc-400">
                Strict database isolation with automatic organization scoping.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-100">Row Level Security (RLS)</h4>
                    <p className="text-sm text-zinc-400 mt-1">
                      Every database query is automatically scoped to the active tenant organization at the database level.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-100">Granular RBAC Roles</h4>
                    <p className="text-sm text-zinc-400 mt-1">
                      Owners manage billing and seats; Admins edit records; Members have strictly scoped read/write access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-100">1-Click SQL Migration</h4>
                    <p className="text-sm text-zinc-400 mt-1">
                      Run one script in your Supabase dashboard to create organizations, profiles, memberships, and items tables with indexes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-xs border border-zinc-800 shadow-2xl overflow-x-auto space-y-2">
                <p className="text-zinc-500">// Supabase PostgreSQL RLS Policy</p>
                <p><span className="text-purple-400">CREATE POLICY</span> <span className="text-emerald-400">"Tenant Data Isolation"</span></p>
                <p className="pl-4"><span className="text-purple-400">ON</span> public.items <span className="text-purple-400">FOR ALL</span></p>
                <p className="pl-4"><span className="text-purple-400">USING</span> (</p>
                <p className="pl-8 text-blue-300">public.is_org_member(org_id)</p>
                <p className="pl-4">);</p>
                <p className="text-emerald-500 pt-2 font-bold">✓ Verified: Zero Cross-Tenant Data Leaks</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-8 px-6 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} B2B SaaS Starter Kit. Built by skram03.</p>
      </footer>
    </div>
  );
}
