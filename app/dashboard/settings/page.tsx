"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Check,
  ShieldCheck,
  Sparkles,
  Building,
  Key,
  Copy,
  ExternalLink,
  Download,
  AlertTriangle,
  Zap,
  ArrowRight,
  X,
  FileText,
  Clock,
  Layers,
  ChevronRight,
  Lock,
} from "lucide-react";
import { updatePlanAction, cancelSubscriptionAction } from "@/app/actions/billing";
import { Card3D } from "@/components/shared/card-3d";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
}

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Acme Industrial Corp");
  const [slug, setSlug] = useState("acme-corp");
  const [isSaved, setIsSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Subscription Management Modal State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<"plans" | "invoices" | "cancel">("plans");
  const [currentPlan, setCurrentPlan] = useState<"starter" | "pro" | "scale">("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const [portalMessage, setPortalMessage] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  // Invoices list
  const [invoices] = useState<Invoice[]>([
    { id: "INV-2026-003", date: "Oct 1, 2026", amount: "$149.00", status: "Paid" },
    { id: "INV-2026-002", date: "Sep 1, 2026", amount: "$149.00", status: "Paid" },
    { id: "INV-2026-001", date: "Aug 1, 2026", amount: "$149.00", status: "Paid" },
  ]);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsManageModalOpen(false);
        setIsCancelModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const handlePlanChange = async (newPlan: "starter" | "pro" | "scale") => {
    if (newPlan === currentPlan) return;
    setIsUpdatingPlan(true);
    const tierName = newPlan === "scale" ? "enterprise" : newPlan;
    await updatePlanAction("acme-corp-uuid", tierName, billingCycle);
    setTimeout(() => {
      setCurrentPlan(newPlan);
      setIsUpdatingPlan(false);
      setPortalMessage(`Subscription switched to ${newPlan.toUpperCase()} tier!`);
      setTimeout(() => setPortalMessage(null), 3500);
    }, 500);
  };

  const handleOpenCustomerPortal = async () => {
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId: "acme-corp-uuid" }),
      });
      const data = await res.json();
      if (data.url) {
        setPortalMessage("Customer portal active. Opening in new tab...");
        window.open(data.url, "_blank");
      }
    } catch {
      setPortalMessage("Redirecting to LemonSqueezy / Stripe billing portal...");
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    const receiptContent = `========================================================\nNEXUSB2B SAAS BOILERPLATE - OFFICIAL INVOICE RECEIPT\n========================================================\nInvoice ID: ${invoice.id}\nDate: ${invoice.date}\nCustomer: Acme Industrial Corp (acme-corp)\nPayment Gateway: LemonSqueezy / Stripe\nAmount Paid: ${invoice.amount} USD\nStatus: ${invoice.status}\nCard: Mastercard ending in •••• 4242\nAuth Code: AUTH_LS_9941092\n========================================================\nThank you for choosing NexusB2B!`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NexusB2B-${invoice.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleConfirmCancel = async () => {
    await cancelSubscriptionAction("acme-corp-uuid");
    setIsCanceled(true);
    setIsCancelModalOpen(false);
    setPortalMessage("Subscription scheduled for cancellation at the end of the billing period.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {portalMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-zinc-900 border border-primary/40 text-zinc-100 text-xs font-semibold rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>{portalMessage}</span>
          <button onClick={() => setPortalMessage(null)} className="ml-2 text-zinc-500 hover:text-zinc-300">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* 3D Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          <CreditCard className="h-3.5 w-3.5" /> Billing &amp; Infrastructure
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-50">Settings &amp; Subscriptions</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Manage your organization profile, LemonSqueezy / Stripe billing, customer portal, and API tokens.
        </p>
      </div>

      {/* 3D Black Titanium Membership Card */}
      <Card3D intensity={14} className="p-8 holographic-titanium border border-zinc-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
          <div style={{ transform: "translateZ(30px)" }}>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-black">
              CURRENT SUBSCRIPTION TIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1 capitalize drop-shadow-md">
              {currentPlan === "starter"
                ? "Starter Team Tier"
                : currentPlan === "pro"
                ? "Pro Enterprise Tier"
                : "Scale Global Tier"}
            </h2>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-4xl font-black text-white">
                {currentPlan === "starter" ? "$29" : currentPlan === "pro" ? "$149" : "$399"}
              </span>
              <span className="text-xs text-zinc-400 font-medium font-mono">
                / month billed via LemonSqueezy / Stripe
              </span>
            </div>
          </div>

          <span
            style={{ transform: "translateZ(35px)" }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold self-start border shadow-md ${
              isCanceled
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isCanceled ? "bg-rose-400" : "bg-emerald-400 animate-pulse"
              }`}
            />
            {isCanceled ? "Canceling at period end" : "Active RLS Subscription"}
          </span>
        </div>

        <div
          style={{ transform: "translateZ(25px)" }}
          className="mt-8 pt-6 border-t border-zinc-800/80 grid sm:grid-cols-3 gap-4 text-xs text-zinc-200"
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-cyan-400 shrink-0" />
            {currentPlan === "starter" ? "5 Team Seats" : "Unlimited Team Seats"}
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-cyan-400 shrink-0" /> Postgres RLS Data Isolation
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-cyan-400 shrink-0" /> Dedicated Webhook Dispatcher
          </div>
        </div>

        <div
          style={{ transform: "translateZ(25px)" }}
          className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400"
        >
          <p className="font-mono">Next billing renewal: November 1, 2026</p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setIsManageModalOpen(true)}
              className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white gap-2 font-black shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <CreditCard className="h-4 w-4" /> Manage Subscription
            </Button>
          </div>
        </div>
      </Card3D>

      {/* 3D General Workspace Configuration */}
      <div className="relative rounded-3xl border border-slate-700/80 glass-panel-3d p-7 shadow-2xl space-y-6">
        <div className="border-b border-slate-700/80 pb-4">
          <h3 className="font-black text-base text-white">Workspace Identity</h3>
          <p className="text-xs text-slate-400 mt-0.5">Update company credentials and routing paths.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-300 font-mono">Company Legal Name</label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-slate-900/90 border-slate-700/80 text-white focus-visible:ring-cyan-500/40"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-300 font-mono">Tenant Slug URL</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">app.nexusb2b.io/</span>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-slate-900/90 border-slate-700/80 text-white flex-1 font-mono text-xs focus-visible:ring-cyan-500/40"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-300 font-mono">Publishable API Key</label>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value="nx_live_99a8b7c6d5e4f3a2b109"
                className="bg-slate-950/90 border-slate-800 text-cyan-400 font-mono text-xs shadow-inner"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyKey}
                className="border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 gap-1.5 font-mono text-xs"
              >
                {copiedKey ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                {copiedKey ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          {isSaved && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-bold rounded-2xl flex items-center gap-2 font-mono">
              <Check className="h-4 w-4 text-emerald-400" /> Settings updated and synchronized with Supabase!
            </div>
          )}

          <div className="flex justify-end pt-3 border-t border-slate-700/80">
            <Button type="submit" className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)]">
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 3D MANAGE SUBSCRIPTION MODAL - CLEAN, UNCLUTTERED, SPATIAL DESIGN */}
      {/* ========================================================================= */}
      {isManageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in [perspective:1200px]"
          onClick={() => setIsManageModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-slate-700/80 glass-panel-3d p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(2,6,23,0.9)] text-slate-100 space-y-6 max-h-[92vh] overflow-y-auto [transform:rotateX(1.5deg)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-700/80 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold">
                  <CreditCard className="h-3.5 w-3.5" /> Billing Management Portal
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                  Subscription &amp; Plans
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Select your license tier, review receipts, or open LemonSqueezy / Stripe portal.
                </p>
              </div>

              <button
                onClick={() => setIsManageModalOpen(false)}
                className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-700/80 pb-2">
              <button
                onClick={() => setActiveModalTab("plans")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeModalTab === "plans"
                    ? "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Layers className="h-3.5 w-3.5" /> Plans &amp; Tiers
              </button>
              <button
                onClick={() => setActiveModalTab("invoices")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeModalTab === "invoices"
                    ? "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <FileText className="h-3.5 w-3.5" /> Invoices &amp; Receipts
              </button>
              <button
                onClick={() => setActiveModalTab("cancel")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ml-auto ${
                  activeModalTab === "cancel"
                    ? "bg-rose-950/60 text-rose-300 border border-rose-800"
                    : "text-slate-500 hover:text-rose-400"
                }`}
              >
                Cancel / Pause
              </button>
            </div>

            {/* TAB 1: PLANS & TIERS */}
            {activeModalTab === "plans" && (
              <div className="space-y-6">
                {/* Billing Interval Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-700/80 backdrop-blur-md">
                  <div>
                    <p className="text-sm font-bold text-white">Billing Cadence</p>
                    <p className="text-xs text-slate-300 font-medium">Choose monthly or save with an annual commitment</p>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        billingCycle === "monthly"
                          ? "bg-slate-800 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("annual")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        billingCycle === "annual"
                          ? "bg-cyan-500 text-slate-950 font-black shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>Annual</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-400 text-xs font-bold">
                        -20%
                      </span>
                    </button>
                  </div>
                </div>

                {/* 3 Spacious Tier Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Starter Tier */}
                  <div
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all glass-panel-3d ${
                      currentPlan === "starter"
                        ? "border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-950/40"
                        : "border-slate-700/60 hover:border-slate-600"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-300">Starter</span>
                        {currentPlan === "starter" && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-400 border border-emerald-400/30 font-mono">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-3">
                        <span className="text-3xl font-black text-white font-mono">
                          {billingCycle === "monthly" ? "$29" : "$290"}
                        </span>
                        <span className="text-xs text-slate-400 font-medium ml-1 font-mono">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">For early startups and individual builders</p>

                      <ul className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-700/80 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>5 Team Seats</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>10,000 DB Records</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>Community Support</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      size="sm"
                      variant={currentPlan === "starter" ? "outline" : "default"}
                      disabled={currentPlan === "starter" || isUpdatingPlan}
                      onClick={() => handlePlanChange("starter")}
                      className="mt-6 w-full text-xs font-bold border-slate-700 text-slate-300 hover:text-white"
                    >
                      {currentPlan === "starter" ? "Current Plan" : "Switch to Starter"}
                    </Button>
                  </div>

                  {/* Pro Enterprise Tier (Recommended) */}
                  <div
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative glass-panel-3d ${
                      currentPlan === "pro"
                        ? "border-cyan-400/80 bg-cyan-950/25 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                        : "border-slate-700/60 hover:border-slate-600"
                    }`}
                  >
                    <div className="absolute -top-2.5 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-black text-slate-950 tracking-wider uppercase shadow-md shadow-cyan-500/40">
                      RECOMMENDED
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-cyan-400">Pro Enterprise</span>
                        {currentPlan === "pro" && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-400 border border-cyan-400/30 font-mono">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-3">
                        <span className="text-3xl font-black text-white font-mono">
                          {billingCycle === "monthly" ? "$149" : "$1,490"}
                        </span>
                        <span className="text-xs text-slate-400 font-medium ml-1 font-mono">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">Full commercial B2B deployment power</p>

                      <ul className="mt-4 space-y-2 text-xs text-slate-200 border-t border-slate-700/80 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>Unlimited Team Seats</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>Postgres RLS Multi-Tenant</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>Webhook Stream Engine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>Priority 24/7 Support</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      size="sm"
                      variant={currentPlan === "pro" ? "outline" : "default"}
                      disabled={currentPlan === "pro" || isUpdatingPlan}
                      onClick={() => handlePlanChange("pro")}
                      className="mt-6 w-full text-xs font-bold btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    >
                      {currentPlan === "pro" ? "Current Plan" : "Upgrade to Pro"}
                    </Button>
                  </div>

                  {/* Scale Global Tier */}
                  <div
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all glass-panel-3d ${
                      currentPlan === "scale"
                        ? "border-emerald-500/60 bg-emerald-950/20 shadow-lg shadow-emerald-950/40"
                        : "border-slate-700/60 hover:border-slate-600"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-300">Scale Global</span>
                        {currentPlan === "scale" && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-400 border border-emerald-400/30 font-mono">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-3">
                        <span className="text-3xl font-black text-white font-mono">
                          {billingCycle === "monthly" ? "$399" : "$3,990"}
                        </span>
                        <span className="text-xs text-slate-400 font-medium ml-1 font-mono">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">Mission-critical high volume operations</p>

                      <ul className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-700/80 pt-3">
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>Dedicated PostgreSQL Cluster</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>99.99% Guaranteed SLA</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <span>White-Label Branding</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      size="sm"
                      variant={currentPlan === "scale" ? "outline" : "default"}
                      disabled={currentPlan === "scale" || isUpdatingPlan}
                      onClick={() => handlePlanChange("scale")}
                      className="mt-6 w-full text-xs font-bold border-slate-700 text-slate-300 hover:text-white"
                    >
                      {currentPlan === "scale" ? "Current Plan" : "Upgrade to Scale"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INVOICES & PAYMENT METHOD */}
            {activeModalTab === "invoices" && (
              <div className="space-y-6">
                {/* Payment Method Preview */}
                <div className="p-4 rounded-2xl border border-slate-700/80 glass-panel-3d flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-12 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-xs text-cyan-400 font-mono shadow-sm">
                      MC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Mastercard ending in 4242</p>
                      <p className="text-xs text-slate-300 font-mono font-medium">Expires 12/2028 • Default billing method</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleOpenCustomerPortal}
                    className="border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono"
                  >
                    Update Card
                  </Button>
                </div>

                {/* Invoices List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 font-mono">Historical Invoices</span>
                  <div className="rounded-2xl border border-slate-700/80 overflow-hidden divide-y divide-slate-800 glass-panel-3d">
                    {invoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-3.5 text-xs hover:bg-slate-800/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-cyan-400" />
                          <div>
                            <p className="font-bold text-white font-mono text-xs">{inv.id}</p>
                            <p className="text-xs text-slate-400 font-mono">{inv.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-emerald-400 font-bold text-sm">{inv.amount}</span>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/60 border border-emerald-800 text-emerald-400 font-mono">
                            {inv.status}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadInvoice(inv)}
                            className="h-8 px-2 text-slate-300 hover:text-white hover:bg-slate-800 gap-1 text-xs font-mono"
                          >
                            <Download className="h-3.5 w-3.5 text-cyan-400" />
                            <span>Download</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CANCEL OR PAUSE */}
            {activeModalTab === "cancel" && (
              <div className="p-6 rounded-2xl border border-rose-900/50 bg-rose-950/15 space-y-4 glass-panel-3d">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Need to pause or cancel?</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      You can downgrade your subscription to the Starter tier ($29/mo) anytime without losing your PostgreSQL data.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      handlePlanChange("starter");
                      setActiveModalTab("plans");
                    }}
                    className="w-full sm:w-auto border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Downgrade to Starter ($29/mo)
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setIsCancelModalOpen(true)}
                    className="w-full sm:w-auto text-xs font-bold"
                  >
                    Proceed with Cancellation
                  </Button>
                </div>
              </div>
            )}

            {/* Modal Bottom Footer Actions */}
            <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenCustomerPortal}
                className="w-full sm:w-auto border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs gap-1.5 font-mono"
              >
                <span>Launch LemonSqueezy Portal</span>
                <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsManageModalOpen(false)}
                  className="border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CANCEL SUBSCRIPTION CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {isCancelModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in [perspective:1200px]"
          onClick={() => setIsCancelModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl border border-rose-900/60 glass-panel-3d p-7 shadow-[0_25px_60px_-15px_rgba(2,6,23,0.9)] space-y-5 [transform:rotateX(2deg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirm Cancellation</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Are you sure? Your team members will lose unlimited access at the end of the current billing cycle.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono">
              💡 <strong>Tip:</strong> Your data remains securely preserved under your Supabase tenant schema.
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-700/80">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCancelModalOpen(false)}
                className="border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Keep Active
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleConfirmCancel}
                className="font-bold text-xs shadow-md"
              >
                Confirm Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
