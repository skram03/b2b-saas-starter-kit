# NexusB2B Boilerplate & Starter Kit 🚀

> **Production-ready Multi-Tenant B2B SaaS and Internal Tool Starter Kit**  
> Built with Next.js 14 App Router, TypeScript, Supabase (with strict Row-Level Security), Tailwind CSS, and shadcn/ui.

---

## ⚡ Highlights & Key Features

- **Multi-Tenant Architecture:** True database-level organization isolation via Supabase PostgreSQL Row Level Security (RLS).
- **Role-Based Access Control (RBAC):** Built-in support for `owner`, `admin`, and `member` permissions.
- **Enterprise UI Components:** Built on **shadcn/ui** primitives with Lucide icons and Tailwind CSS.
- **Advanced Data Table:** Generic `<DataTable />` powered by TanStack Table v8 with client/server search, column filtering, pagination, and 1-click CSV export.
- **Modular Reusable Blocks:** `<StatCard />`, `<StatusBadge />`, `<OrgSwitcher />`, `<FileUploader />`, and `<ConfirmDialog />`.
- **Payment & Subscriptions:** Webhook templates for **LemonSqueezy** and **Stripe** with automated tier upgrading.
- **Transactional Emails:** Pre-wired for **Resend** with React Email templates.
- **TypeScript Strict Mode:** 100% typed database schemas, tables, and API contracts.

---

## 📁 Repository Structure

```text
nexus-b2b-boilerplate/
├── app/
│   ├── (auth)/                  # Login, Signup, Auth Callbacks
│   ├── (marketing)/             # High-converting landing page & quickstart docs
│   ├── (dashboard)/[orgId]/     # Multi-tenant protected dashboard
│   │   ├── data-manager/        # Full TanStack CRUD table view
│   │   ├── team/                # Team invitations & RBAC roster
│   │   └── settings/            # Organization branding & LemonSqueezy billing
│   └── globals.css              # Custom Tailwind theme tokens
├── components/
│   ├── ui/                      # Base shadcn primitives (Button, Card, Input, etc.)
│   └── shared/                  # Reusable production blocks
│       ├── data-table/          # Table, pagination, search toolbar
│       ├── stat-card.tsx        # KPI widget with trend indicators
│       ├── status-badge.tsx     # Color-coded state badge
│       ├── file-uploader.tsx    # Drag-and-drop Supabase Storage upload
│       └── org-switcher.tsx     # Dynamic tenant dropdown switcher
├── lib/
│   ├── supabase/                # SSR client, server client, and middleware session guard
│   └── utils.ts                 # Currency and date formatters
├── supabase/
│   └── migrations/              # SQL schemas, RLS policies, trigger functions
└── types/
    └── database.types.ts        # Typed schema definitions
```

---

## 🛠️ Quickstart (5 Minutes)

### 1. Clone the repository
```bash
git clone https://github.com/skram03/nexus-b2b-boilerplate.git
cd nexus-b2b-boilerplate
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project URL and anon public key.

### 3. Initialize Database Migrations
Copy the contents of:
`supabase/migrations/20260101000000_initial_b2b_schema.sql`  
Paste and run it in the **SQL Editor** of your Supabase Dashboard.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your landing page, auth, and dashboard.

---

## 💰 How to Monetize This Starter Kit

1. **Sell as a Developer Boilerplate:** Package this repo, list on LemonSqueezy / Gumroad for \$79–\$149, and share demos on Twitter/X, Reddit (`r/SideProject`, `r/webdev`), and ProductHunt.
2. **Deliver Client Portals in 48 Hours:** Use this as your personal agency engine to build custom internal tools for local logistics, construction, and wholesale businesses at \$2,000–\$4,000 per build.

---

## 📄 License
MIT &copy; 2026 [skram03](https://github.com/skram03). Free to use for personal and commercial projects.
