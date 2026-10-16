"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, ShieldCheck, Mail, X, Users, KeyRound, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card3D } from "@/components/shared/card-3d";

export default function TeamPage() {
  const [members, setMembers] = useState([
    { name: "John Doe", email: "john@acme.com", role: "Owner", status: "Active" },
    { name: "Sarah Connor", email: "sarah@acme.com", role: "Admin", status: "Active" },
    { name: "Michael Scott", email: "michael@acme.com", role: "Member", status: "Active" },
    { name: "David Miller", email: "david@acme.com", role: "Member", status: "Invited" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setMembers([
      ...members,
      {
        name: name.trim(),
        email: email.trim(),
        role,
        status: "Invited",
      },
    ]);

    setName("");
    setEmail("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 3D Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Users className="h-3.5 w-3.5" /> Granular Access Control
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Team &amp; Access Controls</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
            Manage organization members, assign role-based permissions, and invite collaborators.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)] gap-2"
        >
          <UserPlus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      {/* 3D Roster Card Container */}
      <Card3D intensity={10} className="p-6 glass-panel-3d overflow-hidden space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
          <div>
            <h3 className="font-bold text-base text-white">Organization Roster</h3>
            <p className="text-xs text-zinc-400 font-mono">
              Users authenticated via Supabase Row-Level Security memberships.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60 shadow-sm">
            {members.length} Active Seats
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {members.map((member) => (
            <div
              key={member.email}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 px-3 rounded-2xl transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 font-black flex items-center justify-center text-sm shadow-md font-mono">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{member.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 font-mono">
                    <Mail className="h-3 w-3 text-cyan-400/80" /> {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border font-mono ${
                    member.role === "Owner"
                      ? "bg-purple-950/70 text-purple-300 border-purple-800/60 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                      : member.role === "Admin"
                      ? "bg-blue-950/70 text-cyan-300 border-cyan-800/60 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      : "bg-slate-800/80 text-slate-300 border-slate-700/80"
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" /> {member.role}
                </span>

                <span
                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                    member.status === "Active" ? "text-emerald-400 bg-emerald-950/40 border border-emerald-800/60" : "text-amber-400 bg-amber-950/40 border border-amber-800/60"
                  }`}
                >
                  {member.status === "Active" ? "● Active" : "○ Invited"}
                </span>

                {member.role !== "Owner" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Revoke access for ${member.name}?`)) {
                        setMembers(members.filter((m) => m.email !== member.email));
                      }
                    }}
                    className="text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 font-mono"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card3D>

      {/* 3D Invite Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in [perspective:1200px]"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-700/80 glass-panel-3d p-7 shadow-[0_25px_60px_-15px_rgba(2,6,23,0.9)] space-y-6 relative [transform:rotateX(2deg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-2.5 font-bold text-base text-white">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <UserPlus className="h-5 w-5" />
                </div>
                <span>Invite Collaborator</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Full Name</label>
                <Input
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/40"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Work Email</label>
                <Input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/40 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Admin">Admin (Full Access &amp; Billing)</option>
                  <option value="Member">Member (Read &amp; Write Data)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-700/80">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)]">
                  Send Invite
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
