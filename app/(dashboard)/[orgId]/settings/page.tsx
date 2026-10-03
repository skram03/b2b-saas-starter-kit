import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CreditCard, Check, AlertCircle } from "lucide-react";

export default function SettingsPage() {
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
        <CardFooter className="border-t bg-muted/20 flex justify-between">
          <p className="text-xs text-muted-foreground">Next billing date: November 1, 2026</p>
          <Button variant="outline" size="sm" className="gap-2">
            <CreditCard className="h-4 w-4" /> Manage in LemonSqueezy
          </Button>
        </CardFooter>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">General Information</CardTitle>
          <CardDescription>Update your company name and tenant slug.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Legal Name</label>
            <Input defaultValue="Acme Industrial Corp" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">app.nexusb2b.com/</span>
              <Input defaultValue="acme-corp" className="flex-1" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-end">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
