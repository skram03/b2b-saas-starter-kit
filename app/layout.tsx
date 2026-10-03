import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusB2B - Modern B2B SaaS & Internal Tool Starter Kit",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
