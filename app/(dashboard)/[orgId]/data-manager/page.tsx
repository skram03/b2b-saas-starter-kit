"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ItemRecord {
  id: string;
  title: string;
  category: string;
  amount: number;
  status: string;
  createdAt: string;
}

const mockData: ItemRecord[] = [
  { id: "REC-101", title: "Heavy Duty Forklift 3T", category: "Heavy Equipment", amount: 4500, status: "active", createdAt: "2026-09-12" },
  { id: "REC-102", title: "Hydraulic Jack Set 10T", category: "Tools", amount: 750, status: "completed", createdAt: "2026-09-14" },
  { id: "REC-103", title: "Diesel Power Generator 20kVA", category: "Power Systems", amount: 2800, status: "in_progress", createdAt: "2026-09-15" },
  { id: "REC-104", title: "Industrial Scaffolding Kit", category: "Construction", amount: 1200, status: "pending", createdAt: "2026-09-18" },
  { id: "REC-105", title: "Laser Concrete Screed", category: "Heavy Equipment", amount: 6200, status: "active", createdAt: "2026-09-20" },
  { id: "REC-106", title: "Pneumatic Air Compressor", category: "Tools", amount: 890, status: "canceled", createdAt: "2026-09-22" },
];

export default function DataManagerPage() {
  const [data, setData] = useState<ItemRecord[]>(mockData);

  const columns: ColumnDef<ItemRecord>[] = [
    {
      accessorKey: "id",
      header: "Code",
      cell: ({ row }) => <span className="font-mono text-xs font-semibold">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "title",
      header: "Asset / Item Title",
      cell: ({ row }) => <span className="font-medium text-foreground">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "amount",
      header: "Valuation",
      cell: ({ row }) => <span>{formatCurrency(row.getValue("amount"))}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.getValue("createdAt")}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Title,Category,Amount,Status,Date"]
        .concat(data.map((d) => `${d.id},"${d.title}","${d.category}",${d.amount},${d.status},${d.createdAt}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexusb2b_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Management Engine</h1>
          <p className="text-sm text-muted-foreground">
            Searchable, filterable TanStack data grid with instant CSV export and status updates.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Record
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKey="title"
        onExportCSV={handleExport}
      />
    </div>
  );
}
