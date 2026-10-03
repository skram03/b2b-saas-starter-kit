"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Check, ShieldCheck, Sparkles, Building, Key, Copy } from "lucide-react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Acme Industrial Corp");
  const [slug, setSlug] = useState("acme-corp");
  const [isSaved, setIsSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard?.writeText("nx_live_99a8b7c6d5e4f3a2b109");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 3D Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          <CreditCard className="h-3.5 w-3.5" /> Billing &amp; Infrastructure
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-50">Settings &amp; Subscriptions</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your organization profile, LemonSqueezy / Stripe billing, and API tokens.
        </p>
      </div>

      {/* 3D Black Titanium Membership Card */}
      <div className="relative group [perspective:1000px]">
        <div className="relative rounded-3xl border border-zinc-700/80 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 p-8 shadow-2xl backdrop-blur-xl overflow-hidden transition-transform duration-500 hover:[transform:rotateX(4deg)_rotateY(-3deg)]">
          {/* Holographic Sheen */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/25 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                CURRENT TIER
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-50 mt-1">
                Pro Enterprise License
              </h2>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-4xl font-extrabold text-zinc-100">$149</span>
                <span className="text-xs text-zinc-400 font-medium">/ month billed via LemonSqueezy</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold self-start">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Active Subscription
            </span>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 grid sm:grid-cols-3 gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" /> Unlimited Team Seats
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" /> Postgres RLS Isolation
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" /> Priority 24/7 Support
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
            <p>Renews automatically on November 1, 2026</p>
            <Button
              size="sm"
              onClick={() => alert("Opening LemonSqueezy / Stripe billing customer portal...")}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 gap-2 font-semibold shadow-md"
            >
              <CreditCard className="h-4 w-4" /> Manage Subscription
            </Button>
          </div>
        </div>
      </div>

      {/* 3D General Workspace Configuration */}
      <div className="relative rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-6 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <h3 className="font-bold text-base text-zinc-100">Workspace Identity</h3>
          <p className="text-xs text-zinc-500">Update company credentials and routing paths.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-zinc-300">Company Legal Name</label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-zinc-800/80 border-zinc-700 text-zinc-100"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-zinc-300">Tenant Slug URL</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-mono">app.starterkit.com/</span>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-zinc-800/80 border-zinc-700 text-zinc-100 flex-1 font-mono text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-zinc-300">Publishable API Key</label>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value="nx_live_99a8b7c6d5e4f3a2b109"
                className="bg-zinc-950 border-zinc-800 text-zinc-400 font-mono text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyKey}
                className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 gap-1.5"
              >
                {copiedKey ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copiedKey ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {isSaved && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" /> Settings updated successfully!
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-zinc-800">
            <Button type="submit" className="font-bold shadow-lg shadow-primary/20">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
