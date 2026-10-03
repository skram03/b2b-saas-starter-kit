"use client";

import React, { useState, useMemo } from "react";
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
        <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Asset Title",
      cell: ({ row }) => (
        <div className="font-semibold text-zinc-100 flex items-center gap-2">
          <span>{row.getValue("title")}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {row.getValue("category")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Valuation",
      cell: ({ row }) => (
        <span className="font-mono font-bold text-zinc-200">
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
        <span className="text-xs text-zinc-500 font-mono">
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
            className="h-8 px-2 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm(`Delete record ${row.original.title}?`)) {
                setData((prev) => prev.filter((item) => item.id !== row.original.id));
              }
            }}
            className="h-8 px-2 text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <Database className="h-3.5 w-3.5" /> TanStack Table v8 Workbench
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-50">Data Manager</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Realtime client-side &amp; server-side data grid with multi-column filtering and CSV export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 gap-1.5 shadow-md"
          >
            <Download className="h-4 w-4" /> Export CSV ({filteredData.length})
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-primary to-indigo-600 font-bold shadow-lg shadow-primary/25 gap-2"
          >
            <Plus className="h-4 w-4" /> Add Record
          </Button>
        </div>
      </div>

      {/* 3D KPI Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase">Total Valuation</span>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-black text-zinc-50 mt-2">{formatCurrency(totalValuation)}</p>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">● Calculated Live</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase">Filtered Records</span>
            <Package className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-zinc-50 mt-2">{filteredData.length} of {data.length}</p>
          <span className="text-[11px] text-zinc-400 mt-1 inline-block">Active in current view</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase">Active Units</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-zinc-50 mt-2">{activeCount} Deployed</p>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">100% Verified</span>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase">PostgreSQL RLS</span>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-zinc-50 mt-2">Active</p>
          <span className="text-[11px] text-blue-400 font-semibold mt-1 inline-block">Tenant Partitioned</span>
        </div>
      </div>

      {/* 3D Filter & View Controls Toolbar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-200 placeholder:text-zinc-500 h-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
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
            className="h-9 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-xs font-semibold text-zinc-300"
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
            className="h-9 rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-xs font-semibold text-zinc-300"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
          </select>

          {/* View Mode Switcher */}
          <div className="inline-flex rounded-lg border border-zinc-800 bg-zinc-950 p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-primary text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Table View"
            >
              <TableIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "cards"
                  ? "bg-primary text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="3D Card Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table View vs 3D Cards View */}
      {viewMode === "table" ? (
        <DataTable columns={columns} data={filteredData} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 [perspective:1000px]">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-2xl border border-zinc-800/90 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:[transform:translateY(-6px)] hover:border-zinc-700 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.25)] flex flex-col justify-between"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    {item.id}
                  </span>
                  <StatusBadge status={item.status} />
                </div>

                <div>
                  <h3 className="font-bold text-base text-zinc-100 mt-1">{item.title}</h3>
                  <span className="text-xs text-zinc-400 font-medium">{item.category}</span>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Valuation:</span>
                  <span className="font-mono text-base font-bold text-zinc-100">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">{item.createdAt}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingRecord(item)}
                    className="h-8 text-xs text-zinc-300 hover:bg-zinc-800"
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
                    className="h-8 text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 [perspective:1000px]">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900/95 backdrop-blur-2xl p-6 shadow-2xl space-y-5 relative [transform:rotateX(4deg)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-base text-zinc-100">
                <Layers className="h-5 w-5 text-primary" />
                <span>Create New Record</span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
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
                <label className="text-xs font-semibold text-zinc-300">Initial Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-sm text-zinc-100"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
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
                  onClick={() => setIsAddModalOpen(false)}
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

      {/* 3D Edit Record Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 [perspective:1000px]">
          <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900/95 backdrop-blur-2xl p-6 shadow-2xl space-y-5 relative [transform:rotateX(4deg)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-base text-zinc-100">
                <Edit3 className="h-5 w-5 text-primary" />
                <span>Edit Record ({editingRecord.id})</span>
              </div>
              <button
                onClick={() => setEditingRecord(null)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateRecord} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Item Title</label>
                <Input
                  required
                  value={editingRecord.title}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, title: e.target.value })
                  }
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Category</label>
                <select
                  value={editingRecord.category}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, category: e.target.value })
                  }
                  className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-sm text-zinc-100"
                >
                  <option value="Heavy Equipment">Heavy Equipment</option>
                  <option value="Tools">Tools</option>
                  <option value="Power Systems">Power Systems</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Status</label>
                <select
                  value={editingRecord.status}
                  onChange={(e) =>
                    setEditingRecord({ ...editingRecord, status: e.target.value })
                  }
                  className="w-full h-10 rounded-md border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-sm text-zinc-100"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-300">Valuation ($)</label>
                <Input
                  type="number"
                  value={editingRecord.amount}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="bg-zinc-800/80 border-zinc-700 text-zinc-100"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
                  onClick={() => setEditingRecord(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 font-bold shadow-lg shadow-primary/20">
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
