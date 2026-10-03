import Link from "next/link";
import { ArrowLeft, BookOpen, Terminal, Key, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 py-4 px-6 sticky top-0 z-40 bg-zinc-950/80 backdrop-blur">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-xs text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              v1.0 Documentation
            </span>
            <Link href="/dashboard">
              <Button size="sm">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-6 py-12">
        <div className="max-w-3xl space-y-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-50">Quickstart Developer Guide</h1>
            <p className="mt-2 text-zinc-400">
              Get your multi-tenant B2B application running locally and deployed in under 5 minutes.
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg text-zinc-200">
              <span className="h-7 w-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
              <span>Clone and Install Dependencies</span>
            </div>
            <pre className="p-4 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 overflow-x-auto">
              <code>{`git clone https://github.com/skram03/b2b-saas-starter-kit.git
cd b2b-saas-starter-kit
npm install`}</code>
            </pre>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg text-zinc-200">
              <span className="h-7 w-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">2</span>
              <span>Configure Supabase Environment Variables</span>
            </div>
            <p className="text-sm text-zinc-400">
              Create a Supabase project and copy your API credentials into your local <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-primary">.env.local</code> file:
            </p>
            <pre className="p-4 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 overflow-x-auto">
              <code>{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}</code>
            </pre>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg text-zinc-200">
              <span className="h-7 w-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">3</span>
              <span>Apply Database Schema Migrations</span>
            </div>
            <p className="text-sm text-zinc-400">
              Run the SQL script located at <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-primary">supabase/migrations/20260101000000_initial_b2b_schema.sql</code> inside your Supabase SQL Editor. This initializes multi-tenant RLS policies, profiles, memberships, and automated user creation triggers.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg text-zinc-200">
              <span className="h-7 w-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">4</span>
              <span>Run Local Development Server</span>
            </div>
            <pre className="p-4 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 overflow-x-auto">
              <code>{`npm run dev`}</code>
            </pre>
            <p className="text-sm text-zinc-400">
              Open <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-primary">http://localhost:3000</code> to view your application.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
