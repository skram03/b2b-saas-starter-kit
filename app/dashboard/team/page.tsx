"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UserPlus, ShieldCheck, Mail, X } from "lucide-react";
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
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team &amp; Access Controls</h1>
          <p className="text-sm text-muted-foreground">
            Manage organization members, assign role-based permissions, and invite collaborators.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Roster</CardTitle>
          <CardDescription>
            Members who have access to this organization’s data and API keys.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {members.map((member) => (
              <div key={member.email} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="gap-1 capitalize">
                    <ShieldCheck className="h-3 w-3 text-primary" /> {member.role}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Remove ${member.name}?`)) {
                        setMembers(members.filter((m) => m.email !== member.email));
                      }
                    }}
                    className="text-xs text-destructive hover:bg-destructive/10"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg">Invite New Collaborator</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                <Input
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Work Email</label>
                <Input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  <option value="Admin">Admin (Full Access)</option>
                  <option value="Member">Member (Read &amp; Write Data)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
