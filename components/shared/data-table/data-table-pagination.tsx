import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 py-3 text-xs text-slate-400 font-mono">
      <div>
        <span className="font-bold text-cyan-400">
          {table.getFilteredSelectedRowModel().rows.length}
        </span>{" "}
        of{" "}
        <span className="font-bold text-white">
          {table.getFilteredRowModel().rows.length}
        </span>{" "}
        record(s) active
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center justify-center font-medium text-slate-300">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
