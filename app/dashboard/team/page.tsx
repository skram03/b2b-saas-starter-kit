"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, ShieldCheck, Mail, X, Users, KeyRound, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <Users className="h-3.5 w-3.5" /> Granular Access Control
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-50">Team &amp; Access Controls</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage organization members, assign role-based permissions, and invite collaborators.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-primary to-indigo-600 font-bold shadow-lg shadow-primary/25 gap-2"
        >
          <UserPlus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      {/* 3D Roster Card Container */}
      <div className="relative rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-6 backdrop-blur-xl shadow-2xl overflow-hidden space-y-4">
        {/* Specular line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <h3 className="font-bold text-base text-zinc-100">Organization Roster</h3>
            <p className="text-xs text-zinc-500">
              Users authenticated via Supabase Row-Level Security memberships.
            </p>
          </div>
          <span className="text-xs font-mono text-primary font-bold bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            {members.length} Active Seats
          </span>
        </div>

        <div className="divide-y divide-zinc-800/60">
          {members.map((member) => (
            <div
              key={member.email}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-800/30 px-3 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-primary/30 to-indigo-500/20 border border-primary/30 text-primary font-black flex items-center justify-center text-sm shadow-md">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-bold text-sm text-zinc-100">{member.name}</p>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <Mail className="h-3 w-3 text-zinc-500" /> {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    member.role === "Owner"
                      ? "bg-purple-950/60 text-purple-300 border-purple-800/60"
                      : member.role === "Admin"
                      ? "bg-blue-950/60 text-blue-300 border-blue-800/60"
                      : "bg-zinc-800 text-zinc-300 border-zinc-700"
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" /> {member.role}
                </span>

                <span
                  className={`text-[11px] font-semibold ${
                    member.status === "Active" ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {member.status}
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
                    className="text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Invite Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 [perspective:1000px]">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900/95 backdrop-blur-2xl p-6 shadow-2xl space-y-5 relative [transform:rotateX(4deg)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-base text-zinc-100">
                <UserPlus className="h-5 w-5 text-primary" />
                <span>Invite Collaborator</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Full Name</label>
                <Input
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Work Email</label>
                <Input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-sm text-zinc-100"
                >
                  <option value="Admin">Admin (Full Access &amp; Billing)</option>
                  <option value="Member">Member (Read &amp; Write Data)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 font-bold shadow-lg shadow-primary/20">
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
