"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { X, Download, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  onExportCSV?: () => void;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Filter records...",
  onExportCSV,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-9 w-[180px] lg:w-[260px] bg-zinc-900/80 border-zinc-800 text-zinc-100 text-xs"
          />
        )}
        {children}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2.5 text-xs text-zinc-400 hover:text-zinc-100"
          >
            Reset
            <X className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onExportCSV && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExportCSV}
            className="h-9 text-xs border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        )}
      </div>
    </div>
  );
}
