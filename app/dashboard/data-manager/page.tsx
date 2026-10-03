"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ItemRecord {
  id: string;
  title: string;
  category: string;
  amount: number;
  status: string;
  createdAt: string;
}

const initialData: ItemRecord[] = [
  { id: "REC-101", title: "Heavy Duty Forklift 3T", category: "Heavy Equipment", amount: 4500, status: "active", createdAt: "2026-09-12" },
  { id: "REC-102", title: "Hydraulic Jack Set 10T", category: "Tools", amount: 750, status: "completed", createdAt: "2026-09-14" },
  { id: "REC-103", title: "Diesel Power Generator 20kVA", category: "Power Systems", amount: 2800, status: "in_progress", createdAt: "2026-09-15" },
  { id: "REC-104", title: "Industrial Scaffolding Kit", category: "Construction", amount: 1200, status: "pending", createdAt: "2026-09-18" },
  { id: "REC-105", title: "Laser Concrete Screed", category: "Heavy Equipment", amount: 6200, status: "active", createdAt: "2026-09-20" },
  { id: "REC-106", title: "Pneumatic Air Compressor", category: "Tools", amount: 890, status: "canceled", createdAt: "2026-09-22" },
];

export default function DataManagerPage() {
  const [data, setData] = useState<ItemRecord[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Heavy Equipment");
  const [newAmount, setNewAmount] = useState("");

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
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm(`Delete record ${row.original.title}?`)) {
              setData((prev) => prev.filter((item) => item.id !== row.original.id));
            }
          }}
          className="text-xs text-destructive hover:bg-destructive/10"
        >
          Delete
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
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `nexusb2b_export_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newRecord: ItemRecord = {
      id: `REC-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle.trim(),
      category: newCategory,
      amount: parseFloat(newAmount) || 1200,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setData([newRecord, ...data]);
    setNewTitle("");
    setNewAmount("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Management Engine</h1>
          <p className="text-sm text-muted-foreground">
            Searchable, filterable TanStack data grid with instant CSV export and live CRUD operations.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Record
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data}
        searchKey="title"
        onExportCSV={handleExport}
      />

      {/* Add Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg">Add New Record</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Item / Asset Title</label>
                <Input
                  required
                  placeholder="e.g. Caterpillar Backhoe 420F"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Tools">Tools</option>
                  <option value="Power Systems">Power Systems</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Valuation ($)</label>
                <Input
                  type="number"
                  placeholder="2500"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
