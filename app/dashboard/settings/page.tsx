"use client";

import React, { useState } from "react";
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
  RefreshCw,
  Zap,
  ArrowRight,
  X,
  FileText,
} from "lucide-react";
import { updatePlanAction, cancelSubscriptionAction } from "@/app/actions/billing";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
  pdfUrl: string;
}

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Acme Industrial Corp");
  const [slug, setSlug] = useState("acme-corp");
  const [isSaved, setIsSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Subscription Management Modal State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<"starter" | "pro" | "scale">("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const [portalMessage, setPortalMessage] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  // Invoices list
  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-2026-003",
      date: "Oct 1, 2026",
      amount: "$149.00",
      status: "Paid",
      pdfUrl: "#",
    },
    {
      id: "INV-2026-002",
      date: "Sep 1, 2026",
      amount: "$149.00",
      status: "Paid",
      pdfUrl: "#",
    },
    {
      id: "INV-2026-001",
      date: "Aug 1, 2026",
      amount: "$149.00",
      status: "Paid",
      pdfUrl: "#",
    },
  ]);

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
    setIsUpdatingPlan(true);
    const tierName = newPlan === "scale" ? "enterprise" : newPlan;
    await updatePlanAction("acme-corp-uuid", tierName, billingCycle);
    setTimeout(() => {
      setCurrentPlan(newPlan);
      setIsUpdatingPlan(false);
      setPortalMessage(`Successfully switched plan to ${newPlan.toUpperCase()}!`);
      setTimeout(() => setPortalMessage(null), 3000);
    }, 600);
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
        setPortalMessage(
          "LemonSqueezy customer portal session created! Opening billing dashboard..."
        );
        window.open(data.url, "_blank");
      }
    } catch {
      setPortalMessage("Redirecting to LemonSqueezy customer portal...");
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Generate text/csv receipt for browser download
    const receiptContent = `========================================================\nNEXUSB2B SAAS BOILERPLATE - OFFICIAL INVOICE RECEIPT\n========================================================\nInvoice ID: ${invoice.id}\nDate: ${invoice.date}\nCustomer: Acme Industrial Corp (acme-corp)\nPayment Gateway: LemonSqueezy / Stripe\nAmount Paid: ${invoice.amount} USD\nStatus: ${invoice.status}\nCard: Mastercard ending in •••• 4242\nAuth Code: AUTH_LS_9941092\n========================================================\nThank you for your business!`;

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
    setPortalMessage("Subscription scheduled for cancellation at period end.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {portalMessage && (
        <div className="p-3.5 bg-primary/20 border border-primary/40 text-primary-foreground text-xs font-semibold rounded-xl flex items-center justify-between shadow-lg">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> {portalMessage}
          </span>
          <button onClick={() => setPortalMessage(null)} className="text-zinc-400 hover:text-zinc-200">
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
      <div className="relative group [perspective:1000px]">
        <div className="relative rounded-3xl border border-zinc-700/80 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 p-8 shadow-2xl backdrop-blur-xl overflow-hidden transition-transform duration-500 hover:[transform:rotateX(3deg)_rotateY(-2deg)]">
          {/* Holographic Sheen */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/25 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                CURRENT SUBSCRIPTION TIER
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-50 mt-1 capitalize">
                {currentPlan === "starter"
                  ? "Starter Team License"
                  : currentPlan === "pro"
                  ? "Pro Enterprise License"
                  : "Scale Global License"}
              </h2>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-4xl font-extrabold text-zinc-100">
                  {currentPlan === "starter" ? "$29" : currentPlan === "pro" ? "$149" : "$399"}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  / month billed via LemonSqueezy / Stripe
                </span>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold self-start border ${
                isCanceled
                  ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isCanceled ? "bg-rose-400" : "bg-emerald-400 animate-pulse"
                }`}
              />
              {isCanceled ? "Canceling at period end" : "Active Subscription"}
            </span>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80 grid sm:grid-cols-3 gap-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              {currentPlan === "starter" ? "5 Team Seats" : "Unlimited Team Seats"}
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" /> Postgres RLS Isolation
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" /> Dedicated Webhook Dispatcher
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
            <p>Next billing renewal: November 1, 2026</p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setIsManageModalOpen(true)}
                className="bg-primary hover:bg-blue-600 text-white gap-2 font-bold shadow-lg shadow-primary/30"
              >
                <CreditCard className="h-4 w-4" /> Manage Subscription
              </Button>
            </div>
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

      {/* ========================================================================= */}
      {/* 3D MANAGE SUBSCRIPTION MODAL */}
      {/* ========================================================================= */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-primary uppercase">
                  LemonSqueezy &amp; Stripe Billing Center
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-50 mt-1">
                  Manage Organization Subscription
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Change plan tiers, update payment card, or open customer self-service portal.
                </p>
              </div>
              <button
                onClick={() => setIsManageModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Billing Interval Switcher */}
            <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 w-fit mx-auto">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === "annual"
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">
                  SAVE 20%
                </span>
              </button>
            </div>

            {/* 3 Tier Plan Cards */}
            <div className="grid sm:grid-cols-3 gap-3.5">
              {/* Starter */}
              <div
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  currentPlan === "starter"
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-zinc-300">Starter</span>
                  <div className="text-xl font-black text-zinc-100 mt-1">
                    {billingCycle === "monthly" ? "$29" : "$290"}
                    <span className="text-xs font-normal text-zinc-400">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[11px] text-zinc-400">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-400" /> 5 Team Seats
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-400" /> 10k Records
                    </li>
                  </ul>
                </div>
                <Button
                  size="sm"
                  variant={currentPlan === "starter" ? "outline" : "default"}
                  disabled={currentPlan === "starter" || isUpdatingPlan}
                  onClick={() => handlePlanChange("starter")}
                  className="mt-4 w-full text-xs font-bold"
                >
                  {currentPlan === "starter" ? "Current Plan" : "Downgrade"}
                </Button>
              </div>

              {/* Pro Enterprise (Current) */}
              <div
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative ${
                  currentPlan === "pro"
                    ? "border-primary bg-primary/15 shadow-xl shadow-primary/20"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                }`}
              >
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-primary text-[9px] font-bold text-white tracking-wider">
                  RECOMMENDED
                </div>
                <div>
                  <span className="text-xs font-bold text-primary">Pro Enterprise</span>
                  <div className="text-xl font-black text-zinc-100 mt-1">
                    {billingCycle === "monthly" ? "$149" : "$1,490"}
                    <span className="text-xs font-normal text-zinc-400">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[11px] text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-400" /> Unlimited Seats
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-400" /> Full RLS Isolation
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-400" /> Webhook Engine
                    </li>
                  </ul>
                </div>
                <Button
                  size="sm"
                  variant={currentPlan === "pro" ? "outline" : "default"}
                  disabled={currentPlan === "pro" || isUpdatingPlan}
                  onClick={() => handlePlanChange("pro")}
                  className="mt-4 w-full text-xs font-bold"
                >
                  {currentPlan === "pro" ? "Current Plan" : "Select Pro"}
                </Button>
              </div>

              {/* Scale */}
              <div
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  currentPlan === "scale"
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-zinc-300">Scale Global</span>
                  <div className="text-xl font-black text-zinc-100 mt-1">
                    {billingCycle === "monthly" ? "$399" : "$3,990"}
                    <span className="text-xs font-normal text-zinc-400">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[11px] text-zinc-400">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-400" /> 99.99% SLA
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald-400" /> Dedicated Cluster
                    </li>
                  </ul>
                </div>
                <Button
                  size="sm"
                  variant={currentPlan === "scale" ? "outline" : "default"}
                  disabled={currentPlan === "scale" || isUpdatingPlan}
                  onClick={() => handlePlanChange("scale")}
                  className="mt-4 w-full text-xs font-bold"
                >
                  {currentPlan === "scale" ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-300">Recent Invoices &amp; Receipts</span>
                <span className="text-[10px] text-zinc-500">Auto-generated via LemonSqueezy</span>
              </div>
              <div className="rounded-xl border border-zinc-800 overflow-hidden divide-y divide-zinc-800 bg-zinc-900/40">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between p-3 text-xs hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-semibold text-zinc-200">{inv.id}</p>
                        <p className="text-[10px] text-zinc-500">{inv.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-zinc-200">{inv.amount}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                        {inv.status}
                      </span>
                      <button
                        onClick={() => handleDownloadInvoice(inv)}
                        className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
                        title="Download Receipt"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portal Redirection & Actions */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
              >
                Cancel Subscription
              </button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsManageModalOpen(false)}
                  className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={handleOpenCustomerPortal}
                  className="bg-primary hover:bg-blue-600 text-white font-bold text-xs gap-1.5 shadow-lg shadow-primary/30"
                >
                  <span>Open Customer Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-rose-900/60 bg-zinc-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-100">Cancel Subscription?</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Your team will lose access to unlimited seats and live Postgres RLS streaming at the end of the billing cycle.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              💡 <strong>Developer Tip:</strong> You can pause your subscription or downgrade to the Starter tier for \$29/month instead of canceling.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCancelModalOpen(false)}
                className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs"
              >
                Keep Subscription
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleConfirmCancel}
                className="font-bold text-xs shadow-md"
              >
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
