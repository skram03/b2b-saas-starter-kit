import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B2B SaaS Starter Kit",
  description:
    "Production-ready Next.js 14, Supabase, Tailwind CSS & shadcn/ui boilerplate for B2B products and internal dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
