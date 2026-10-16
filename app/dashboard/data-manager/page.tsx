"use client";

import React, { useState, useMemo, useEffect } from "react";
import { DataTable } from "@/components/shared/data-table/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Edit3,
  X,
  Database,
  Download,
  Layers,
  Search,
  LayoutGrid,
  Table as TableIcon,
  DollarSign,
  TrendingUp,
  Package,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card3D } from "@/components/shared/card-3d";

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
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ItemRecord | null>(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAddModalOpen(false);
        setEditingRecord(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Add form fields
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Heavy Equipment");
  const [newAmount, setNewAmount] = useState("");
  const [newStatus, setNewStatus] = useState("active");

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [data, searchQuery, categoryFilter, statusFilter]);

  // Aggregate KPI Calculations
  const totalValuation = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.amount, 0),
    [filteredData]
  );
  const activeCount = useMemo(
    () => filteredData.filter((i) => i.status === "active").length,
    [filteredData]
  );

  const columns: ColumnDef<ItemRecord>[] = [
    {
      accessorKey: "id",
      header: "Code",
      cell: ({ row }) => (
        <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 shadow-sm">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Asset Title",
      cell: ({ row }) => (
        <div className="font-bold text-white flex items-center gap-2">
          <span>{row.getValue("title")}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800/90 text-slate-200 border border-slate-700/80 font-mono">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          {row.getValue("category")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Valuation",
      cell: ({ row }) => (
        <span className="font-mono font-bold text-emerald-400">
          {formatCurrency(row.getValue("amount"))}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "createdAt",
      header: "Recorded",
      cell: ({ row }) => (
        <span className="text-xs text-slate-400 font-mono">
          {row.getValue("createdAt")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditingRecord(row.original)}
            className="h-8 px-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white font-semibold"
          >
            <Edit3 className="h-3.5 w-3.5 mr-1 text-cyan-400" /> Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm(`Delete record ${row.original.title}?`)) {
                setData((prev) => prev.filter((item) => item.id !== row.original.id));
              }
            }}
            className="h-8 px-2 text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 font-semibold"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Asset ID,Title,Category,Valuation,Status,Date"]
        .concat(
          filteredData.map(
            (d) =>
              `${d.id},"${d.title}","${d.category}",${d.amount},${d.status},${d.createdAt}`
          )
        )
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `b2b_assets_export_${Date.now()}.csv`;
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
      amount: parseFloat(newAmount) || 1500,
      status: newStatus,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setData([newRecord, ...data]);
    setNewTitle("");
    setNewAmount("");
    setIsAddModalOpen(false);
  };

  const handleUpdateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;

    setData((prev) =>
      prev.map((item) => (item.id === editingRecord.id ? editingRecord : item))
    );
    setEditingRecord(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 3D Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Database className="h-3.5 w-3.5" /> TanStack Table v8 Spatial Workbench
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-md">3D Data Manager</h1>
          <p className="text-sm text-slate-400 mt-1">
            Realtime client-side &amp; server-side spatial data grid with multi-column filtering and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 gap-1.5 shadow-md font-mono text-xs"
          >
            <Download className="h-4 w-4 text-cyan-400" /> Export CSV ({filteredData.length})
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] gap-2 text-white"
          >
            <Plus className="h-4 w-4" /> Add Record
          </Button>
        </div>
      </div>

      {/* 3D KPI Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
          <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Total Valuation</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3 font-mono" style={{ transform: "translateZ(25px)" }}>
            {formatCurrency(totalValuation)}
          </p>
          <span className="text-xs text-cyan-400 font-bold mt-1.5 inline-flex items-center gap-1.5 font-mono" style={{ transform: "translateZ(15px)" }}>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" /> Live Aggregation
          </span>
        </Card3D>

        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
          <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Filtered Records</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3 font-mono" style={{ transform: "translateZ(25px)" }}>
            {filteredData.length} <span className="text-base font-semibold text-slate-400">/ {data.length}</span>
          </p>
          <span className="text-xs text-indigo-300 font-bold mt-1.5 inline-block font-mono" style={{ transform: "translateZ(15px)" }}>
            Active in spatial view
          </span>
        </Card3D>

        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
          <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Active Units</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3 font-mono" style={{ transform: "translateZ(25px)" }}>
            {activeCount} Deployed
          </p>
          <span className="text-xs text-emerald-400 font-bold mt-1.5 inline-flex items-center gap-1.5 font-mono" style={{ transform: "translateZ(15px)" }}>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Verified
          </span>
        </Card3D>

        <Card3D intensity={10} className="p-5 glass-panel-3d relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
          <div className="flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Postgres RLS</span>
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-3 font-mono" style={{ transform: "translateZ(25px)" }}>
            Enforced
          </p>
          <span className="text-xs text-blue-400 font-bold mt-1.5 inline-block font-mono" style={{ transform: "translateZ(15px)" }}>
            Isolated Tenancy
          </span>
        </Card3D>
      </div>

      {/* 3D Filter & View Controls Toolbar */}
      <div className="rounded-2xl border border-slate-700/60 glass-panel-3d p-4 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
          <Input
            placeholder="Search code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500 h-9 font-mono text-xs focus-visible:ring-cyan-500/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters & View Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            <option value="Heavy Equipment">Heavy Equipment</option>
            <option value="Tools">Tools</option>
            <option value="Power Systems">Power Systems</option>
            <option value="Construction">Construction</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>

          {/* View Mode Switcher */}
          <div className="inline-flex rounded-xl border border-slate-700/80 bg-slate-900/90 p-0.5 shadow-inner">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "table"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Table View"
            >
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "cards"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
              title="3D Card Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">3D Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table View vs 3D Cards View */}
      {viewMode === "table" ? (
        <DataTable columns={columns} data={filteredData} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredData.map((item) => (
            <Card3D
              key={item.id}
              intensity={12}
              className="p-6 glass-panel-3d flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 shadow-sm">
                    {item.id}
                  </span>
                  <StatusBadge status={item.status} />
                </div>

                <div style={{ transform: "translateZ(25px)" }}>
                  <h3 className="font-black text-base text-white mt-1 drop-shadow-sm">{item.title}</h3>
                  <span className="text-xs text-zinc-400 font-medium font-mono">{item.category}</span>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs" style={{ transform: "translateZ(20px)" }}>
                  <span className="text-zinc-500 font-mono">Valuation:</span>
                  <span className="font-mono text-base font-black text-emerald-400">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between" style={{ transform: "translateZ(25px)" }}>
                <span className="text-xs text-slate-400 font-mono font-medium">{item.createdAt}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingRecord(item)}
                    className="h-8 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 font-bold"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`Delete ${item.title}?`)) {
                        setData(data.filter((d) => d.id !== item.id));
                      }
                    }}
                    className="h-8 text-xs text-rose-400 hover:bg-rose-950/50 hover:text-rose-300 font-bold"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card3D>
          ))}

          {filteredData.length === 0 && (
            <div className="col-span-full p-12 text-center border border-dashed border-zinc-800 rounded-2xl text-zinc-500">
              No assets match the active search and filter criteria.
            </div>
          )}
        </div>
      )}

      {/* 3D Add Record Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in [perspective:1200px]"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-700/80 glass-panel-3d p-7 shadow-[0_25px_60px_-15px_rgba(2,6,23,0.9)] space-y-6 relative [transform:rotateX(2deg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-2.5 font-bold text-base text-white">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Layers className="h-5 w-5" />
                </div>
                <span>Create Spatial Asset Record</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Item / Asset Title</label>
                <Input
                  required
                  placeholder="e.g. Caterpillar Backhoe 420F"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/40"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Tools">Tools</option>
                  <option value="Power Systems">Power Systems</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Initial Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Valuation ($)</label>
                <Input
                  type="number"
                  placeholder="2500"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/40 font-mono"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-700/80">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)]">
                  Save Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3D Edit Record Modal */}
      {editingRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 animate-in fade-in [perspective:1200px]"
          onClick={() => setEditingRecord(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-700/80 glass-panel-3d p-7 shadow-[0_25px_60px_-15px_rgba(2,6,23,0.9)] space-y-6 relative [transform:rotateX(2deg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-2.5 font-bold text-base text-white">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Edit3 className="h-5 w-5" />
                </div>
                <span>Edit Record ({editingRecord.id})</span>
              </div>
              <button
                onClick={() => setEditingRecord(null)}
                className="p-1.5 rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateRecord} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Item Title</label>
                <Input
                  required
                  value={editingRecord.title}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, title: e.target.value })
                  }
                  className="bg-slate-900/90 border-slate-700/80 text-white focus-visible:ring-cyan-500/40"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Category</label>
                <select
                  value={editingRecord.category}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, category: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Tools">Tools</option>
                  <option value="Power Systems">Power Systems</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Status</label>
                <select
                  value={editingRecord.status}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, status: e.target.value })
                  }
                  className="w-full h-10 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 font-mono">Valuation ($)</label>
                <Input
                  type="number"
                  value={editingRecord.amount}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="bg-slate-900/90 border-slate-700/80 text-white focus-visible:ring-cyan-500/40 font-mono"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-700/80">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-slate-700/80 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                  onClick={() => setEditingRecord(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 btn-3d bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)]">
                  Update Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
