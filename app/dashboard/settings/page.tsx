"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CreditCard, Check, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Acme Industrial Corp");
  const [slug, setSlug] = useState("acme-corp");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organization Settings &amp; Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription plan, billing details, and company information.
        </p>
      </div>

      {/* Subscription Card */}
      <Card className="border-primary/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Subscription Tier</CardTitle>
              <CardDescription>You are currently on the Pro Enterprise Tier.</CardDescription>
            </div>
            <span className="px-2.5 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase">
              Active
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold">$149</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Unlimited team members &amp; roles
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Automated daily CSV &amp; PDF reports
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" /> Priority 24/7 dedicated support
            </li>
          </ul>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Next billing date: November 1, 2026</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("Redirecting to LemonSqueezy / Stripe Customer Portal...")}
            className="gap-2"
          >
            <CreditCard className="h-4 w-4" /> Manage in LemonSqueezy
          </Button>
        </CardFooter>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">General Information</CardTitle>
          <CardDescription>Update your company name and workspace slug.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Legal Name</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-mono">app.starterkit.com/</span>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {isSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg flex items-center gap-2">
                <Check className="h-4 w-4" /> Settings updated successfully!
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t flex justify-end">
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
