"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-4 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 mb-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <Card className="border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="h-10 w-10 mx-auto rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold mb-2">
              <Sparkles className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold text-zinc-50">Create an account</CardTitle>
            <CardDescription className="text-zinc-400">
              Launch your organization dashboard in seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-zinc-300">Full Name</label>
                <Input
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-zinc-300">Work Email</label>
                <Input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-zinc-300">Organization Name</label>
                <Input
                  required
                  placeholder="Acme Industrial Corp"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-semibold text-zinc-300">Password</label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>
              <Button type="submit" className="w-full h-10 font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Account &amp; Enter Dashboard
              </Button>
            </form>

            <p className="text-center text-xs text-zinc-400 mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
