"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card3D } from "@/components/shared/card-3d";
import { Spatial3DBackground } from "@/components/shared/spatial-3d-bg";
import { ArrowLeft, Loader2, Sparkles, Box, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 p-4 relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Animated Spatial Background Canvas */}
      <Spatial3DBackground />

      {/* 3D Cybernetic Background */}
      <div className="fixed inset-0 isometric-grid-bg opacity-30 pointer-events-none -z-10" />

      {/* Volumetric Radial Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/20 via-indigo-600/15 to-purple-600/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-md space-y-4 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold font-mono text-slate-400 hover:text-cyan-400 mb-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> &larr; Return to Showcase
        </Link>

        {/* 3D Glass Auth Monolith */}
        <Card3D intensity={12} className="p-8 glass-panel-3d border border-zinc-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
          <div className="text-center space-y-2 mb-6" style={{ transform: "translateZ(30px)" }}>
            <div className="h-12 w-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center font-black shadow-[0_0_25px_rgba(6,182,212,0.4)] mb-3">
              <Box className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Initialize Organization
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Provision RLS-Sealed PostgreSQL Tenant
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" style={{ transform: "translateZ(25px)" }}>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-zinc-300 font-mono">Full Name</label>
              <Input
                required
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-zinc-950/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-sm h-11 focus:border-cyan-500/50"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-zinc-300 font-mono">Work Email</label>
              <Input
                required
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-950/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-sm h-11 focus:border-cyan-500/50"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-zinc-300 font-mono">Organization Name</label>
              <Input
                required
                placeholder="Acme Industrial Corp"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="bg-zinc-950/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-sm h-11 focus:border-cyan-500/50"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-zinc-300 font-mono">Master Password</label>
              <Input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-950/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-sm h-11 focus:border-cyan-500/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-3d h-11 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)]"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Tenant &amp; Launch Console
            </Button>
          </form>

          <p className="text-center text-xs text-zinc-500 mt-6 font-mono" style={{ transform: "translateZ(15px)" }}>
            Already registered?{" "}
            <Link href="/login" className="text-cyan-400 hover:underline font-bold">
              Sign In
            </Link>
          </p>
        </Card3D>
      </div>
    </div>
  );
}
