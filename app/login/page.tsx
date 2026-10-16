"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card3D } from "@/components/shared/card-3d";
import { Spatial3DBackground } from "@/components/shared/spatial-3d-bg";
import { ArrowLeft, Loader2, ShieldCheck, Box, Sparkles, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleDemoBypass = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
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
              Nexus Console Access
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              PostgreSQL Multi-Tenant Workspace Gateway
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" style={{ transform: "translateZ(25px)" }}>
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-zinc-300 font-mono">Work Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="bg-zinc-950/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-xs h-10 focus:border-cyan-500/50"
              />
            </div>
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-zinc-300 font-mono">Password</label>
                <button
                  type="button"
                  onClick={() => alert("Demo reset token active.")}
                  className="text-cyan-400 hover:underline font-mono text-xs font-semibold"
                >
                  Forgot?
                </button>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-zinc-950/90 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 font-mono text-sm h-11 focus:border-cyan-500/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-3d h-11 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-black text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)]"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Sign In with Email
            </Button>
          </form>

          {/* 1-Click Demo Bypass Pill */}
          <div className="mt-4 pt-4 border-t border-zinc-800/80" style={{ transform: "translateZ(20px)" }}>
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoBypass}
              className="w-full btn-3d h-10 border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 font-bold text-xs gap-2 shadow-sm"
              disabled={isLoading}
            >
              <Sparkles className="h-3.5 w-3.5" /> 1-Click Demo Preview Bypass <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-6 font-mono" style={{ transform: "translateZ(15px)" }}>
            Need an organization account?{" "}
            <Link href="/signup" className="text-cyan-400 hover:underline font-bold">
              Sign Up
            </Link>
          </p>
        </Card3D>
      </div>
    </div>
  );
}
