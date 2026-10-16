"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "./data-table-pagination";
import { Download, Search, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  onExportCSV?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onExportCSV,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      {/* Table Container with Pro 3D Spatial Styling */}
      <div className="rounded-2xl border border-slate-700/60 glass-panel-3d shadow-[0_20px_50px_rgba(2,6,23,0.7)] overflow-hidden backdrop-blur-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-900/90 border-b border-slate-700/80 text-slate-300 uppercase tracking-wider font-bold text-xs font-mono">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const isSorted = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        className={`h-12 px-5 align-middle text-left font-bold ${
                          canSort ? "cursor-pointer select-none hover:text-cyan-400 transition-colors" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-1.5">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {canSort && (
                              <span className="text-slate-500">
                                {isSorted === "asc" ? (
                                  <ChevronUp className="h-3.5 w-3.5 text-cyan-400" />
                                ) : isSorted === "desc" ? (
                                  <ChevronDown className="h-3.5 w-3.5 text-cyan-400" />
                                ) : (
                                  <ArrowUpDown className="h-3 w-3 opacity-40 hover:opacity-100" />
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-slate-800/40 data-[state=selected]:bg-cyan-500/10 group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 px-5 align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-32 text-center text-slate-500 font-medium"
                  >
                    No matching records found in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
