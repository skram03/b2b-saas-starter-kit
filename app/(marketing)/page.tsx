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
} from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <header className="border-b border-border/40 backdrop-blur sticky top-0 z-40 bg-background/80">
        <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black">
              N
            </div>
            <span>NexusB2B</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#architecture" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="sm" className="gap-1.5">
                Live Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Next.js 14 App Router + Supabase RLS
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Ship Your B2B SaaS &amp; Internal Tools in{" "}
            <span className="text-primary underline decoration-primary/30">Days, Not Months</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The enterprise-ready starter kit with multi-tenancy, granular RBAC,
            tanstack tables, dynamic modals, and pre-configured Supabase SSR auth.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2 h-12 px-8 text-base">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Browse Documentation
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-16 bg-muted/30 border-y border-border/40">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Everything You Need To Launch</h2>
              <p className="mt-3 text-muted-foreground">
                Stop wasting 40+ hours stitching together authentication, permissions, and tables.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Multi-Tenant RBAC</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Strict Row Level Security (RLS) policies at the PostgreSQL level. Support for Owner, Admin, and Member roles out of the box.
                </p>
              </div>

              <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">TanStack Data Tables</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Fast, client-side and server-side filtering, sorting, column visibility, and instant 1-click CSV/Excel export.
                </p>
              </div>

              <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Payments &amp; Subscriptions</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Plug-and-play LemonSqueezy / Stripe billing integration with webhook listeners for automated tier upgrades.
                </p>
              </div>

              <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Reusable UI Blocks</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Curated shadcn/ui components: KPI StatCards, OrgSwitcher, StatusBadges, FormDialogs, and FileUploader with storage hooks.
                </p>
              </div>

              <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">Next.js 14 SSR Architecture</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Built with React Server Components, Server Actions, and `@supabase/ssr` cookies for fast initial page loads and zero hydration bugs.
                </p>
              </div>

              <div className="p-6 rounded-xl border bg-card shadow-sm hover:shadow transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-lg">One-Click Vercel Deploy</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Configured with `.env.example`, automated TypeScript validation, and full production build readiness.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} NexusB2B Boilerplate. Built by skram03.</p>
      </footer>
    </div>
  );
}
