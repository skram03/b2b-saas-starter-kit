"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Terminal, Key, ShieldCheck, CheckCircle2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (text: string, step: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="border-b border-zinc-800/80 py-4 px-6 sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 font-bold">
              v1.0 Developer Docs
            </span>
            <Link href="/dashboard">
              <Button size="sm" className="font-bold shadow-md shadow-primary/20">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-3xl space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
              <Terminal className="h-3.5 w-3.5" /> Full Stack Reference
            </div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-50">Quickstart Developer Guide</h1>
            <p className="mt-2 text-zinc-400">
              Get your multi-tenant B2B application running locally and deployed in under 5 minutes.
            </p>
          </div>

          {/* 3D Code Window Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-base text-zinc-200">
              <span className="h-7 w-7 rounded-xl bg-primary/20 border border-primary/30 text-primary text-xs flex items-center justify-center font-black">
                1
              </span>
              <span>Clone and Install Dependencies</span>
            </div>
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500">bash &bull; terminal</span>
                </div>
                <button
                  onClick={() => handleCopy("git clone https://github.com/skram03/b2b-saas-starter-kit.git\ncd b2b-saas-starter-kit\nnpm install", 1)}
                  className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                >
                  {copiedStep === 1 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedStep === 1 ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{`git clone https://github.com/skram03/b2b-saas-starter-kit.git\ncd b2b-saas-starter-kit\nnpm install`}</code>
              </pre>
            </div>
          </div>

          {/* 3D Code Window Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-base text-zinc-200">
              <span className="h-7 w-7 rounded-xl bg-primary/20 border border-primary/30 text-primary text-xs flex items-center justify-center font-black">
                2
              </span>
              <span>Configure Supabase Environment Variables</span>
            </div>
            <p className="text-sm text-zinc-400">
              Create a Supabase project and copy your API credentials into your local <code className="text-xs bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-primary">.env.local</code> file:
            </p>
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500">.env.local</span>
                </div>
                <button
                  onClick={() => handleCopy("NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key", 2)}
                  className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                >
                  {copiedStep === 2 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedStep === 2 ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}</code>
              </pre>
            </div>
          </div>

          {/* 3D Code Window Step 3 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-base text-zinc-200">
              <span className="h-7 w-7 rounded-xl bg-primary/20 border border-primary/30 text-primary text-xs flex items-center justify-center font-black">
                3
              </span>
              <span>Deploy Database Schema &amp; RLS Policies</span>
            </div>
            <p className="text-sm text-zinc-400">
              Execute <code className="text-xs bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-primary">supabase/migrations/20260101000000_initial_b2b_schema.sql</code> inside your Supabase SQL Editor. This sets up organizations, memberships, and multi-tenant RLS rules.
            </p>
          </div>

          {/* 3D Code Window Step 4 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-bold text-base text-zinc-200">
              <span className="h-7 w-7 rounded-xl bg-primary/20 border border-primary/30 text-primary text-xs flex items-center justify-center font-black">
                4
              </span>
              <span>Launch Local Development Engine</span>
            </div>
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500">npm dev</span>
                </div>
                <button
                  onClick={() => handleCopy("npm run dev", 4)}
                  className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                >
                  {copiedStep === 4 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedStep === 4 ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{`npm run dev`}</code>
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
