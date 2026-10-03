import Link from "next/link";
import { ArrowLeft, BookOpen, Terminal, Key, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 py-4 px-6">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <span className="font-semibold text-sm">NexusB2B Documentation</span>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-3xl space-y-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Quickstart Guide</h1>
            <p className="mt-2 text-muted-foreground">
              Get your multi-tenant B2B application running locally in under 5 minutes.
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">1</span>
              <span>Clone and Install Dependencies</span>
            </div>
            <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto">
              <code>{`git clone https://github.com/skram03/nexus-b2b-boilerplate.git
cd nexus-b2b-boilerplate
npm install`}</code>
            </pre>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">2</span>
              <span>Configure Supabase Environment Variables</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create a Supabase project and copy your API credentials into a local <code className="text-xs bg-muted px-1.5 py-0.5 rounded">.env.local</code> file:
            </p>
            <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto">
              <code>{`cp .env.example .env.local`}</code>
            </pre>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">3</span>
              <span>Apply Database Migrations</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Run the SQL script located at <code className="text-xs bg-muted px-1.5 py-0.5 rounded">supabase/migrations/20260101000000_initial_b2b_schema.sql</code> inside your Supabase SQL Editor. This initializes the multi-tenant RLS policies, tables, and auth triggers.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold">4</span>
              <span>Run the Local Development Server</span>
            </div>
            <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-sm overflow-x-auto">
              <code>{`npm run dev`}</code>
            </pre>
            <p className="text-sm text-muted-foreground">
              Visit <code className="text-xs bg-muted px-1.5 py-0.5 rounded">http://localhost:3000</code> to view your app.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
