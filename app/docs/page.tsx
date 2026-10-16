"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Terminal, Key, ShieldCheck, CheckCircle2, Copy, Check, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card3D } from "@/components/shared/card-3d";
import { Spatial3DBackground } from "@/components/shared/spatial-3d-bg";

export default function DocsPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (text: string, step: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden">
      {/* 3D Animated Spatial Background Canvas */}
      <Spatial3DBackground />

      {/* 3D Cybernetic Background */}
      <div className="fixed inset-0 isometric-grid-bg opacity-25 pointer-events-none -z-10" />

      {/* Volumetric Radial Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-cyan-500/20 via-indigo-600/15 to-transparent blur-[160px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="border-b border-slate-700/80 py-4 px-6 sticky top-0 z-40 bg-slate-900/80 backdrop-blur-2xl">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold font-mono text-zinc-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="h-4 w-4" /> &larr; Return to Showcase
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60 font-bold">
              v1.0 Developer Reference
            </span>
            <Link href="/dashboard">
              <Button size="sm" className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-xs gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                Launch 3D Console
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12 relative z-10">
        <div className="max-w-3xl space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Terminal className="h-3.5 w-3.5" /> Full Stack Blueprint
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Nexus Quickstart Guide
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-normal">
              Get your multi-tenant B2B application running locally and deployed to Vercel in under 5 minutes.
            </p>
          </div>

          {/* 3D Code Window Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-sm text-white font-mono">
              <span className="h-7 w-7 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-center font-black">
                1
              </span>
              <span>Clone and Install Dependencies</span>
            </div>
            <Card3D intensity={6} className="p-0 glass-panel-3d overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                  <span className="ml-2 font-mono text-xs text-slate-300 font-medium">bash &bull; terminal</span>
                </div>
                <button
                  onClick={() => handleCopy("git clone https://github.com/skram03/b2b-saas-starter-kit.git\ncd b2b-saas-starter-kit\nnpm install", 1)}
                  className="text-xs text-zinc-300 hover:text-cyan-400 font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedStep === 1 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedStep === 1 ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 text-sm font-mono text-cyan-300 bg-zinc-950/60 overflow-x-auto leading-relaxed">
                <code>{`git clone https://github.com/skram03/b2b-saas-starter-kit.git\ncd b2b-saas-starter-kit\nnpm install`}</code>
              </pre>
            </Card3D>
          </div>

          {/* 3D Code Window Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-sm text-white font-mono">
              <span className="h-7 w-7 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-center font-black">
                2
              </span>
              <span>Configure Supabase Environment Variables</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              Create a Supabase project and copy your API credentials into your local <code className="text-xs bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-cyan-400 font-mono">.env.local</code> file:
            </p>
            <Card3D intensity={6} className="p-0 glass-panel-3d overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                  <span className="ml-2 font-mono text-xs text-slate-300 font-medium">.env.local</span>
                </div>
                <button
                  onClick={() => handleCopy("NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key", 2)}
                  className="text-xs text-zinc-300 hover:text-cyan-400 font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedStep === 2 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedStep === 2 ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 text-sm font-mono text-zinc-200 bg-zinc-950/60 overflow-x-auto leading-relaxed">
                <code>{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}</code>
              </pre>
            </Card3D>
          </div>

          {/* 3D Code Window Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-sm text-white font-mono">
              <span className="h-7 w-7 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-center font-black">
                3
              </span>
              <span>Deploy Database Schema &amp; RLS Policies</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">
              Execute <code className="text-xs bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-cyan-400 font-mono">supabase/migrations/20260101000000_initial_b2b_schema.sql</code> inside your Supabase SQL Editor. This sets up organizations, memberships, and multi-tenant RLS rules.
            </p>
          </div>

          {/* 3D Code Window Step 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-sm text-white font-mono">
              <span className="h-7 w-7 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-center font-black">
                4
              </span>
              <span>Launch Local Development Engine</span>
            </div>
            <Card3D intensity={6} className="p-0 glass-panel-3d overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/90" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                  <span className="ml-2 font-mono text-xs text-slate-300 font-medium">npm dev</span>
                </div>
                <button
                  onClick={() => handleCopy("npm run dev", 4)}
                  className="text-xs text-zinc-300 hover:text-cyan-400 font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedStep === 4 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedStep === 4 ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-cyan-300 bg-zinc-950/60 overflow-x-auto leading-relaxed">
                <code>{`npm run dev`}</code>
              </pre>
            </Card3D>
          </div>
        </div>
      </main>
    </div>
  );
}
