"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card3D } from "@/components/shared/card-3d";
import { Spatial3DBackground } from "@/components/shared/spatial-3d-bg";
import { Animated3DCube } from "@/components/shared/animated-3d-cube";
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
  Radio,
  Compass,
  Boxes,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "code" | "table">("overview");

  return (
    <div className="min-h-screen text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-100 relative overflow-hidden">
      {/* 3D Animated Particle Mesh & Connecting Conduits Canvas */}
      <Spatial3DBackground />

      {/* Cybernetic Isometric Grid */}
      <div className="absolute inset-0 isometric-grid-bg opacity-35 pointer-events-none -z-10" />

      {/* Volumetric Cosmic Aurora Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1300px] h-[650px] bg-gradient-to-b from-blue-600/30 via-cyan-500/20 to-transparent blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[750px] -right-32 w-[650px] h-[650px] bg-indigo-600/25 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-[1400px] -left-32 w-[600px] h-[600px] bg-cyan-600/20 blur-[180px] pointer-events-none -z-10" />

      {/* 3D Elevated Spatial Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/60 bg-slate-900/70 backdrop-blur-2xl shadow-[0_10px_30px_rgba(2,6,23,0.5)]">
        <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 font-black text-xl tracking-tight group">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-[0_0_25px_rgba(6,182,212,0.55)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Boxes className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-lg tracking-wider flex items-center gap-2">
                NEXUS<span className="text-cyan-300 font-mono text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.4)]">3D SPATIAL</span>
              </span>
              <span className="text-xs text-cyan-200/80 font-mono tracking-widest uppercase font-semibold">
                B2B Enterprise Engine
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-300">
            <Link href="#preview" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              3D Workspace
            </Link>
            <Link href="#features" className="hover:text-cyan-300 transition-colors">
              Spatial Architecture
            </Link>
            <Link href="#pricing" className="hover:text-cyan-300 transition-colors">
              Licensing
            </Link>
            <Link href="/docs" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              Terminal API
            </Link>
          </nav>

          <div className="flex items-center gap-3.5">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-200 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 text-sm font-bold backdrop-blur-md px-4 py-2 h-10">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="btn-3d bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-sm gap-2 px-5 py-2.5 h-10 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.45)]">
                Launch 3D Console <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Interactive 3D Spatial Presentation */}
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 text-center max-w-6xl mx-auto relative">
          {/* Animated 3D Holographic Cube Floating Display */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-xl animate-pulse pointer-events-none" />
              <Animated3DCube size={110} />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/80 border border-cyan-500/40 text-cyan-300 text-sm font-bold mb-6 shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-cyan-400 animate-spin" />
            <span className="tracking-wide">Spatial 3D UI &bull; Next.js 14 App Router &bull; Supabase RLS Kernel</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] text-white">
            Next-Generation 3D{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(56,189,248,0.4)]">
              Enterprise SaaS
            </span>
          </h1>

          <p className="mt-7 text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Break free from generic, flat AI boilerplate. NexusB2B delivers a complete spatial 3D developer platform with deep Row-Level Security, interactive data grids, dual billing webhooks, and fluid physical depth.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="btn-3d h-14 px-9 text-base font-black bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.45)] gap-3">
                Open 3D Executive Deck <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="h-14 px-9 text-base font-bold border-slate-700/80 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:text-white rounded-2xl shadow-xl backdrop-blur-xl">
                Explore Architecture Docs
              </Button>
            </Link>
          </div>
        </section>

        {/* 3D Tilted Spatial Deck Showcase */}
        <section id="preview" className="py-14 px-4 max-w-6xl mx-auto perspective-1500">
          <div className="text-center mb-8">
            <div className="inline-flex items-center p-2 bg-slate-900/80 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-2xl gap-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Executive Telemetry
              </button>
              <button
                onClick={() => setActiveTab("table")}
                className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  activeTab === "table"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                3D Data Workbench
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${
                  activeTab === "code"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                PostgreSQL RLS Kernel
              </button>
            </div>
          </div>

          {/* 3D Interactive Spatial Deck */}
          <div className="relative group transition-all duration-700 ease-out preserve-3d hover:[transform:rotateX(0deg)_rotateY(0deg)] [transform:rotateX(13deg)_rotateY(-6deg)]">
            {/* Luminous Ambient Glow */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-600/35 to-indigo-600/30 blur-3xl opacity-50 group-hover:opacity-85 transition duration-700" />

            {/* 3D Floating Growth Badge (Z=65px) */}
            <div className="absolute -top-7 -right-5 hidden lg:flex items-center gap-3.5 p-4 rounded-2xl glass-panel-3d shadow-[0_20px_50px_rgba(2,6,23,0.85)] [transform:translateZ(65px)] z-30">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-black text-white text-base">+38.4% MRR Velocity</p>
                <p className="text-xs text-cyan-300 font-mono font-semibold">Automated Webhook Ledger</p>
              </div>
            </div>

            {/* 3D Floating Security Shield (Z=60px) */}
            <div className="absolute -bottom-7 -left-5 hidden lg:flex items-center gap-3.5 p-4 rounded-2xl glass-panel-3d shadow-[0_20px_50px_rgba(2,6,23,0.85)] [transform:translateZ(60px)] z-30">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center font-black shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Lock className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-black text-white text-base">PostgreSQL RLS Active</p>
                <p className="text-xs text-cyan-300 font-mono font-semibold">Zero Cross-Tenant Leaks</p>
              </div>
            </div>

            {/* Glass Chassis Console */}
            <div className="relative rounded-3xl glass-panel-3d p-6 sm:p-8 text-left">
              {/* Window Controls Bar */}
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-3.5 w-3.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.7)]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.7)]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                  <span className="ml-3 font-mono text-sm text-slate-300 flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">spatial://</span>nexus.enterprise.deck/control
                  </span>
                </div>
                <Link href="/dashboard" className="text-sm font-black text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1.5">
                  Fullscreen Console &rarr;
                </Link>
              </div>

              {/* Dynamic Console Content */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg">
                      <p className="text-xs font-mono uppercase text-slate-300 font-bold">Total MRR</p>
                      <p className="text-3xl font-black text-white mt-2 font-mono">$48,290.00</p>
                      <span className="text-xs font-extrabold text-emerald-400 font-mono inline-flex items-center gap-1 mt-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> +14.2% MoM
                      </span>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg">
                      <p className="text-xs font-mono uppercase text-slate-300 font-bold">Active Tenants</p>
                      <p className="text-3xl font-black text-white mt-2 font-mono">128 Orgs</p>
                      <span className="text-xs font-extrabold text-cyan-400 font-mono inline-flex items-center gap-1 mt-1">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" /> 100% RLS Partitioned
                      </span>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg">
                      <p className="text-xs font-mono uppercase text-slate-300 font-bold">Edge Calls</p>
                      <p className="text-3xl font-black text-white mt-2 font-mono">1.4M / mo</p>
                      <span className="text-xs font-extrabold text-indigo-400 font-mono inline-block mt-1">Sub-15ms Latency</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg">
                      <p className="text-xs font-mono uppercase text-slate-300 font-bold">Kernel Health</p>
                      <p className="text-3xl font-black text-white mt-2 font-mono">99.98%</p>
                      <span className="text-xs font-extrabold text-emerald-400 font-mono inline-block mt-1">Optimal Uptime</span>
                    </div>
                  </div>

                  {/* Realtime PostgreSQL Stream Box */}
                  <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-3.5">
                    <div className="flex items-center justify-between text-sm font-bold text-slate-100">
                      <span className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-cyan-400" />
                        <span>Live PostgreSQL Realtime Stream</span>
                      </span>
                      <span className="text-emerald-300 font-mono text-xs px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)] flex items-center gap-1.5 font-bold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        LIVE 60 FPS
                      </span>
                    </div>
                    <div className="divide-y divide-slate-700/60 text-sm">
                      <div className="py-3 flex items-center justify-between">
                        <span className="text-slate-200 font-medium">#REC-101 Heavy Duty Forklift 3T &bull; Asset Deployed</span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">● Active</span>
                      </div>
                      <div className="py-3 flex items-center justify-between">
                        <span className="text-slate-200 font-medium">#INV-2026-081 Apex Foundations &bull; Voucher Generated</span>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">● Completed</span>
                      </div>
                      <div className="py-3 flex items-center justify-between">
                        <span className="text-slate-200 font-medium">Team invite accepted by Sarah Connor (Admin)</span>
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40">● Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "table" && (
                <div className="rounded-2xl border border-slate-700/80 overflow-hidden bg-slate-900/90 shadow-2xl">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800/90 border-b border-slate-700 text-slate-300 font-mono uppercase text-xs">
                      <tr>
                        <th className="p-4">Asset Code</th>
                        <th className="p-4">Asset Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Valuation</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 text-slate-200">
                      <tr>
                        <td className="p-4 font-mono font-bold text-cyan-400">REC-101</td>
                        <td className="p-4 font-bold text-white">Heavy Duty Forklift 3T</td>
                        <td className="p-4">Heavy Equipment</td>
                        <td className="p-4 font-mono text-emerald-400 font-bold text-base">$4,500.00</td>
                        <td className="p-4"><span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">● Active</span></td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono font-bold text-cyan-400">REC-102</td>
                        <td className="p-4 font-bold text-white">Hydraulic Jack Set 10T</td>
                        <td className="p-4">Tools</td>
                        <td className="p-4 font-mono text-emerald-400 font-bold text-base">$750.00</td>
                        <td className="p-4"><span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs">● Completed</span></td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono font-bold text-cyan-400">REC-103</td>
                        <td className="p-4 font-bold text-white">Diesel Generator 20kVA</td>
                        <td className="p-4">Power Systems</td>
                        <td className="p-4 font-mono text-emerald-400 font-bold text-base">$2,800.00</td>
                        <td className="p-4"><span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs">● In Progress</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "code" && (
                <div className="p-6 rounded-2xl bg-slate-900 font-mono text-sm text-slate-300 border border-slate-700/80 shadow-inner overflow-x-auto space-y-2.5">
                  <p className="text-slate-400 font-semibold">// PostgreSQL Multi-Tenant Row Level Security (RLS)</p>
                  <p><span className="text-purple-400 font-bold">CREATE POLICY</span> <span className="text-emerald-400 font-bold">"Tenant Data Isolation"</span></p>
                  <p className="pl-4"><span className="text-purple-400 font-bold">ON</span> public.items <span className="text-purple-400 font-bold">FOR ALL</span></p>
                  <p className="pl-4"><span className="text-purple-400 font-bold">USING</span> (</p>
                  <p className="pl-8 text-cyan-400 font-bold">public.is_org_member(org_id)</p>
                  <p className="pl-4">);</p>
                  <p className="text-emerald-400 pt-3 font-bold text-sm">✓ Enforced by default on all Supabase queries, webhooks &amp; server actions</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3D Spatial Feature Monoliths */}
        <section id="features" className="py-24 border-t border-slate-800/80 relative">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Spatial Architecture Engine
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg">
                Architected with deep separation of concerns, zero-overhead database queries, and high-conversion 3D aesthetics.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card3D intensity={12} className="p-8 glass-panel-3d">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="font-black text-xl text-white">PostgreSQL RLS Kernel</h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Strict Row Level Security at the database kernel. Supports granular Owner, Admin, and Member permissions without code-level leaks.
                </p>
              </Card3D>

              <Card3D intensity={12} className="p-8 glass-panel-3d">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(99,102,241,0.4)]">
                  <Database className="h-7 w-7" />
                </div>
                <h3 className="font-black text-xl text-white">TanStack Grid v8</h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  High-performance client/server data tables with multi-facet filters, sortable headers, column visibility toggles, and 1-click CSV streaming.
                </p>
              </Card3D>

              <Card3D intensity={12} className="p-8 glass-panel-3d">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                  <CreditCard className="h-7 w-7" />
                </div>
                <h3 className="font-black text-xl text-white">LemonSqueezy &amp; Stripe</h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  HMAC-SHA256 signature verification webhook handlers. Seamless plan switching, billing portal redirection, and invoice receipt generation.
                </p>
              </Card3D>
            </div>
          </div>
        </section>

        {/* 3D Pricing Matrix */}
        <section id="pricing" className="py-24 border-t border-slate-800/80 relative">
          <div className="container mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Transparent Commercial Licensing
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
              One-time payment. Full codebase ownership. No recurring developer fees.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-14 text-left">
              {/* Single Developer Tier */}
              <Card3D intensity={14} className="p-8 sm:p-9 glass-panel-3d flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-slate-300 uppercase tracking-widest font-bold">Single Dev</span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 font-mono">Lifetime</span>
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white font-mono">$79</span>
                    <span className="text-slate-400 text-sm font-mono">/ one-time</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    Perfect for indie hackers and solo founders shipping their first commercial B2B product.
                  </p>
                  <ul className="mt-7 space-y-3.5 text-sm text-slate-200">
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> Complete Next.js 14 + Supabase Codebase</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> All 3D Spatial UI Components &amp; Modals</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> PostgreSQL RLS Migration Scripts</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> 1 Commercial Project License</li>
                  </ul>
                </div>
                <div className="mt-9">
                  <Button className="w-full btn-3d bg-slate-800 hover:bg-slate-700 text-white font-black text-sm h-12 border border-slate-700 rounded-xl">
                    Get Single License
                  </Button>
                </div>
              </Card3D>

              {/* Agency / Commercial Tier */}
              <Card3D intensity={16} className="p-8 sm:p-9 holographic-titanium border-cyan-500/60 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col justify-between relative">
                <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md">
                  POPULAR CHOICE
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-cyan-300 uppercase tracking-widest font-black">Unlimited Agency</span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 font-mono">Commercial</span>
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white font-mono">$149</span>
                    <span className="text-slate-400 text-sm font-mono">/ one-time</span>
                  </div>
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    For software agencies and consultants delivering custom enterprise portals to multiple clients.
                  </p>
                  <ul className="mt-7 space-y-3.5 text-sm text-slate-100">
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> Unlimited Client Projects &amp; Deployments</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> 100% White-Label Rights</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> LemonSqueezy &amp; Stripe Webhook Engines</li>
                    <li className="flex items-center gap-3"><Check className="h-5 w-5 text-cyan-400 shrink-0" /> Priority GitHub Updates &amp; Future Modules</li>
                  </ul>
                </div>
                <div className="mt-9">
                  <Button className="w-full btn-3d bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-black text-sm h-12 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.45)]">
                    Get Agency License
                  </Button>
                </div>
              </Card3D>
            </div>
          </div>
        </section>
      </main>

      {/* 3D Spatial Footer */}
      <footer className="border-t border-slate-800/80 py-12 px-6 text-center text-sm text-slate-400 bg-slate-950/60 backdrop-blur-xl">
        <p>&copy; {new Date().getFullYear()} NexusB2B Spatial. Built for developers by skram03.</p>
      </footer>
    </div>
  );
}
