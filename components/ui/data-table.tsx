"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
  className?: string;
  sortable?: boolean;
  paginated?: boolean;
}

export function DataTable<TData>({
  data,
  columns,
  pageSize = 10,
  className,
  sortable = true,
  paginated = true,
}: DataTableProps<TData>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
    enableSortingRemoval: sortable,
  });

  const totalRows = table.getRowCount();
  const startRow = pagination.pageIndex * pagination.pageSize + 1;
  const endRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalRows,
  );

  return (
    <div
      className={cn("rounded-[4px] border border-[var(--border)]", className)}
    >
      <Table variant="card">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                const size = header.column.getSize();
                return (
                  <TableHead
                    key={header.id}
                    style={size ? { width: `${size}px` } : undefined}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() &&
                      sortable ? (
                      <button
                        className="flex h-full w-full cursor-pointer items-center justify-between border-none bg-transparent text-left text-[12px] font-medium tracking-wider text-[var(--muted-foreground)] uppercase"
                        onClick={header.column.getToggleSortingHandler()}
                        type="button"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: (
                            <Icon
                              name="chevron-up"
                              size={14}
                              className="opacity-60"
                            />
                          ),
                          desc: (
                            <Icon
                              name="chevron-down"
                              size={14}
                              className="opacity-60"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {paginated && (
        <div className="flex items-center justify-between border-t border-[var(--border)] p-4">
          <div className="text-[13px] text-[var(--foreground-subtle)]">
            Viewing{" "}
            <span className="font-medium text-[var(--foreground)]">
              {startRow}-{endRow}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[var(--foreground)]">
              {totalRows}
            </span>{" "}
            results
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export type { ColumnDef };
