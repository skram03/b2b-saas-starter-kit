"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, X, Database, Download, Layers } from "lucide-react";
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
      cell: ({ row }) => <span className="font-mono text-xs font-bold text-primary">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "title",
      header: "Asset / Item Title",
      cell: ({ row }) => <span className="font-semibold text-zinc-100">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span className="text-zinc-400">{row.getValue("category")}</span>,
    },
    {
      accessorKey: "amount",
      header: "Valuation",
      cell: ({ row }) => <span className="font-mono text-zinc-200">{formatCurrency(row.getValue("amount"))}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => <span className="text-xs text-zinc-500 font-mono">{row.getValue("createdAt")}</span>,
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
          className="text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 3D Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <Database className="h-3.5 w-3.5" /> TanStack Table v8 Engine
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-50">Data Manager</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Realtime client-side &amp; server-side data grid with multi-column filtering and CSV export.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-primary to-indigo-600 font-bold shadow-lg shadow-primary/25 gap-2"
        >
          <Plus className="h-4 w-4" /> Add Record
        </Button>
      </div>

      {/* 3D Glass Data Table Wrapper */}
      <div className="relative rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Top Specular Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <DataTable
          columns={columns}
          data={data}
          searchKey="title"
          onExportCSV={handleExport}
        />
      </div>

      {/* 3D Glass Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 [perspective:1000px]">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900/95 backdrop-blur-2xl p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] space-y-5 relative [transform:rotateX(4deg)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-base text-zinc-100">
                <Layers className="h-5 w-5 text-primary" />
                <span>Create New Record</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Item / Asset Title</label>
                <Input
                  required
                  placeholder="e.g. Caterpillar Backhoe 420F"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-sm text-zinc-100"
                >
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Tools">Tools</option>
                  <option value="Power Systems">Power Systems</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Valuation ($)</label>
                <Input
                  type="number"
                  placeholder="2500"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                />
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
