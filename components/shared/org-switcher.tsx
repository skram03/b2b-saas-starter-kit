"use client";

import * as React from "react";
import { Building2, Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Organization {
  id: string;
  name: string;
  slug: string;
}

interface OrgSwitcherProps {
  currentOrg: Organization;
  organizations: Organization[];
  onSelectOrg: (org: Organization) => void;
  onCreateNew?: () => void;
}

export function OrgSwitcher({
  currentOrg,
  organizations,
  onSelectOrg,
  onCreateNew,
}: OrgSwitcherProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        role="combobox"
        aria-expanded={open}
        aria-label="Select organization"
        onClick={() => setOpen(!open)}
        className="w-[200px] justify-between border-dashed"
      >
        <div className="flex items-center gap-2 truncate">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="truncate font-medium">{currentOrg.name}</span>
        </div>
        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-[220px] rounded-md border bg-popover p-1 shadow-md">
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
            Switch Organization
          </div>
          <div className="space-y-0.5">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => {
                  onSelectOrg(org);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground text-left"
              >
                <span className="truncate">{org.name}</span>
                {org.id === currentOrg.id && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
          {onCreateNew && (
            <div className="mt-1 border-t pt-1">
              <button
                onClick={() => {
                  onCreateNew();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-primary hover:bg-accent hover:text-accent-foreground"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create New Org</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
