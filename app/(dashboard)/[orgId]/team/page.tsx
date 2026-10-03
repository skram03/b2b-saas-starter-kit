import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UserPlus, ShieldCheck, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TeamPage() {
  const members = [
    { name: "John Doe", email: "john@acme.com", role: "Owner", status: "Active" },
    { name: "Sarah Connor", email: "sarah@acme.com", role: "Admin", status: "Active" },
    { name: "Michael Scott", email: "michael@acme.com", role: "Member", status: "Active" },
    { name: "David Miller", email: "david@acme.com", role: "Member", status: "Invited" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team &amp; Access Controls</h1>
          <p className="text-sm text-muted-foreground">
            Manage organization members, assign role-based permissions, and invite collaborators.
          </p>
        </div>
        <Button className="gap-2">
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
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
