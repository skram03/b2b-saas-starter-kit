"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card3D } from "@/components/shared/card-3d";
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
  Check,
  ChevronRight,
  Box,
  Cpu,
  Workflow,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "code" | "table">("overview");

  return (
    <div className="min-h-screen bg-[#05070a] text-zinc-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      {/* 3D Cybernetic Grid Background */}
      <div className="absolute inset-0 isometric-grid-bg opacity-35 pointer-events-none -z-10" />

      {/* Volumetric Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-gradient-to-b from-indigo-600/20 via-cyan-500/10 to-transparent blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] -right-40 w-[600px] h-[600px] bg-purple-600/15 blur-[180px] pointer-events-none -z-10" />

      {/* 3D Elevated Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-2xl">
        <div className="container mx-auto max-w-7xl px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-black text-lg tracking-tight group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center font-black shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform duration-300">
              <Box className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base tracking-wider flex items-center gap-2">
                NEXUS<span className="text-cyan-400 font-mono text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50">3D</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                Enterprise Multi-Tenant
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <Link href="#preview" className="hover:text-cyan-400 transition-colors">
              3D Workspace
            </Link>
            <Link href="#features" className="hover:text-cyan-400 transition-colors">
              Architecture
            </Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">
              Licensing
            </Link>
            <Link href="/docs" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              Terminal API
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-xs font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs gap-2 px-4 shadow-[0_0_25px_rgba(99,102,241,0.4)]">
                Launch Live 3D Console <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1">
        <section className="pt-24 pb-14 px-6 text-center max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-cyan-400 text-xs font-bold mb-8 shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 animate-pulse" />
            <span className="tracking-wide">Next.js 14 &bull; Supabase PostgreSQL RLS &bull; TanStack v8</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-white">
            The Bespoke 3D Multi-Tenant{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(99,102,241,0.3)]">
              SaaS Engine
            </span>
          </h1>

          <p className="mt-7 text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            A production-hardened developer boilerplate designed to eliminate 6 weeks of architectural grunt work. Complete with enforced Row Level Security, 3D data workbenches, and dual payment webhooks.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="btn-3d h-13 px-8 text-sm font-bold bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-[0_0_35px_rgba(6,182,212,0.35)] gap-2">
                Explore 3D Console <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="h-13 px-8 text-sm font-semibold border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800 hover:text-white shadow-lg backdrop-blur-md">
                View Documentation
              </Button>
            </Link>
          </div>
        </section>

        {/* 3D Isometric Interactive Console Showcase */}
        <section id="preview" className="py-14 px-4 max-w-6xl mx-auto perspective-1500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center p-1.5 bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-xl backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Executive Telemetry
              </button>
              <button
                onClick={() => setActiveTab("table")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "table"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                3D Data Grid
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "code"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                PostgreSQL Security DDL
              </button>
            </div>
          </div>

          {/* 3D Tilted Interactive Glass Canvas */}
          <div className="relative group transition-all duration-700 ease-out preserve-3d hover:[transform:rotateX(0deg)_rotateY(0deg)] [transform:rotateX(14deg)_rotateY(-6deg)]">
            {/* Luminous Ambient Shadow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/25 via-indigo-600/30 to-purple-600/25 blur-3xl opacity-40 group-hover:opacity-75 transition duration-700" />

            {/* 3D Floating Growth Badge (Z=60px) */}
            <div className="absolute -top-7 -right-5 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl [transform:translateZ(65px)] z-30">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="text-left text-xs">
                <p className="font-black text-white">+38.4% MRR Velocity</p>
                <p className="text-[10px] text-zinc-400 font-mono">Automated Webhook Ledger</p>
              </div>
            </div>

            {/* 3D Floating Security Shield (Z=55px) */}
            <div className="absolute -bottom-7 -left-5 hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl [transform:translateZ(55px)] z-30">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Lock className="h-5 w-5" />
              </div>
              <div className="text-left text-xs">
                <p className="font-black text-white">PostgreSQL RLS Sealed</p>
                <p className="text-[10px] text-zinc-400 font-mono">Tenant Isolation Enforced</p>
              </div>
            </div>

            {/* Glass Chassis Console */}
            <div className="relative rounded-3xl glass-panel-3d overflow-hidden p-5 sm:p-7 text-left">
              {/* Window Controls Bar */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="ml-3 font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                    <span className="text-cyan-400">nexus://</span>app.enterprise.internal/control
                  </span>
                </div>
                <Link href="/dashboard" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Fullscreen Console &rarr;
                </Link>
              </div>

              {/* Dynamic Console Content */}
              {activeTab === "overview" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner">
                      <p className="text-[10px] font-mono uppercase text-zinc-400">Total MRR</p>
                      <p className="text-2xl font-black text-white mt-1">$48,290.00</p>
                      <span className="text-[10px] font-bold text-emerald-400 font-mono">+14.2% MoM</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner">
                      <p className="text-[10px] font-mono uppercase text-zinc-400">Active Orgs</p>
                      <p className="text-2xl font-black text-white mt-1">128</p>
                      <span className="text-[10px] font-bold text-cyan-400 font-mono">100% RLS Partitioned</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner">
                      <p className="text-[10px] font-mono uppercase text-zinc-400">API Throughput</p>
                      <p className="text-2xl font-black text-white mt-1">1.4M / mo</p>
                      <span className="text-[10px] font-bold text-purple-400 font-mono">Edge Optimized</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner">
                      <p className="text-[10px] font-mono uppercase text-zinc-400">DB Latency</p>
                      <p className="text-2xl font-black text-white mt-1">14ms</p>
                      <span className="text-[10px] font-bold text-emerald-400 font-mono">p99 Sub-20ms</span>
                    </div>
                  </div>

                  {/* Realtime PostgreSQL Stream Box */}
                  <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
                      <span className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-cyan-400" />
                        <span>Live PostgreSQL Realtime Stream</span>
                      </span>
                      <span className="text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60">
                        ● LIVE 60 FPS
                      </span>
                    </div>
                    <div className="divide-y divide-zinc-800/60 text-xs">
                      <div className="py-2.5 flex items-center justify-between">
                        <span className="text-zinc-200">#REC-101 Heavy Duty Forklift 3T &bull; Asset Deployed</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">Active</span>
                      </div>
                      <div className="py-2.5 flex items-center justify-between">
                        <span className="text-zinc-200">#INV-2026-081 Apex Foundations &bull; Voucher Generated</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20">Completed</span>
                      </div>
                      <div className="py-2.5 flex items-center justify-between">
                        <span className="text-zinc-200">Team invite accepted by Sarah Connor (Admin)</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "table" && (
                <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950/90 shadow-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono uppercase text-[10px]">
                      <tr>
                        <th className="p-3.5">Asset Code</th>
                        <th className="p-3.5">Asset Title</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Valuation</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-cyan-400">REC-101</td>
                        <td className="p-3.5 font-bold text-white">Heavy Duty Forklift 3T</td>
                        <td className="p-3.5">Heavy Equipment</td>
                        <td className="p-3.5 font-mono text-emerald-400">$4,500.00</td>
                        <td className="p-3.5"><span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">Active</span></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-cyan-400">REC-102</td>
                        <td className="p-3.5 font-bold text-white">Hydraulic Jack Set 10T</td>
                        <td className="p-3.5">Tools</td>
                        <td className="p-3.5 font-mono text-emerald-400">$750.00</td>
                        <td className="p-3.5"><span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">Completed</span></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-cyan-400">REC-103</td>
                        <td className="p-3.5 font-bold text-white">Diesel Generator 20kVA</td>
                        <td className="p-3.5">Power Systems</td>
                        <td className="p-3.5 font-mono text-emerald-400">$2,800.00</td>
                        <td className="p-3.5"><span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">In Progress</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "code" && (
                <div className="p-5 rounded-2xl bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800 shadow-inner overflow-x-auto space-y-2">
                  <p className="text-zinc-500">// PostgreSQL Multi-Tenant Row Level Security (RLS)</p>
                  <p><span className="text-purple-400">CREATE POLICY</span> <span className="text-emerald-400">"Tenant Data Isolation"</span></p>
                  <p className="pl-4"><span className="text-purple-400">ON</span> public.items <span className="text-purple-400">FOR ALL</span></p>
                  <p className="pl-4"><span className="text-purple-400">USING</span> (</p>
                  <p className="pl-8 text-cyan-400">public.is_org_member(org_id)</p>
                  <p className="pl-4">);</p>
                  <p className="text-emerald-400 pt-2 font-bold">✓ Enforced by default on all Supabase queries, webhooks &amp; server actions</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3D Feature Grid */}
        <section id="features" className="py-24 border-t border-zinc-800/80 bg-zinc-950/60 relative">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Engineered For Scale
              </h2>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                Architected with deep separation of concerns, zero-overhead database queries, and high-conversion developer aesthetics.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card3D intensity={10} className="p-6 glass-panel-3d">
                <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-white">PostgreSQL RLS Engine</h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Strict Row Level Security at the database kernel. Supports granular Owner, Admin, and Member permissions without code-level leaks.
                </p>
              </Card3D>

              <Card3D intensity={10} className="p-6 glass-panel-3d">
                <div className="h-11 w-11 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-white">TanStack Grid v8</h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  High-performance client/server data tables with multi-facet filters, sortable headers, column visibility toggles, and 1-click CSV streaming.
                </p>
              </Card3D>

              <Card3D intensity={10} className="p-6 glass-panel-3d">
                <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-white">LemonSqueezy &amp; Stripe</h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  HMAC-SHA256 signature verification webhook handlers. Seamless plan switching, billing portal redirection, and invoice receipt generation.
                </p>
              </Card3D>
            </div>
          </div>
        </section>

        {/* 3D Interactive Pricing Section */}
        <section id="pricing" className="py-24 border-t border-zinc-800/80 relative">
          <div className="container mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Transparent Commercial Licensing
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              One-time payment. Full codebase ownership. No recurring developer fees.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-14 text-left">
              {/* Single Developer Tier */}
              <Card3D intensity={12} className="p-8 glass-panel-3d flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Single Dev</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">Lifetime</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">$79</span>
                    <span className="text-zinc-500 text-xs">/ one-time</span>
                  </div>
                  <p className="mt-3 text-xs text-zinc-400">
                    Perfect for indie hackers and solo founders shipping their first commercial B2B product.
                  </p>
                  <ul className="mt-6 space-y-3 text-xs text-zinc-300">
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> Complete Next.js 14 + Supabase Codebase</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> All 3D UI Components &amp; Modals</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> PostgreSQL RLS Migration Scripts</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> 1 Commercial Project License</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button className="w-full btn-3d bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs h-11 border border-zinc-700">
                    Get Single License
                  </Button>
                </div>
              </Card3D>

              {/* Agency / Commercial Tier */}
              <Card3D intensity={14} className="p-8 glass-panel-3d border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col justify-between relative">
                <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                  POPULAR
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">Unlimited Agency</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60">Commercial</span>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">$149</span>
                    <span className="text-zinc-500 text-xs">/ one-time</span>
                  </div>
                  <p className="mt-3 text-xs text-zinc-400">
                    For software agencies and consultants delivering custom enterprise portals to multiple clients.
                  </p>
                  <ul className="mt-6 space-y-3 text-xs text-zinc-200">
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> Unlimited Client Projects &amp; Deployments</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> 100% White-Label Rights</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> LemonSqueezy &amp; Stripe Webhook Engines</li>
                    <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-cyan-400" /> Priority GitHub Updates &amp; Future Modules</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button className="w-full btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs h-11 shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                    Get Agency License
                  </Button>
                </div>
              </Card3D>
            </div>
          </div>
        </section>
      </main>

      {/* 3D Footer */}
      <footer className="border-t border-zinc-800/80 py-10 px-6 text-center text-xs text-zinc-500 bg-zinc-950/80">
        <p>&copy; {new Date().getFullYear()} NexusB2B. Built for developers by skram03.</p>
      </footer>
    </div>
  );
}
