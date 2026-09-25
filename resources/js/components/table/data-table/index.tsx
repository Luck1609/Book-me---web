import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { RowData } from '@tanstack/react-table';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { TablePagination } from './table-pagination';
import type { DataTableProps } from './types';

export function DataTable<TData>({
  columns,
  data = [],
  loader,
  components,
  emptyState,
  classNames,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  options = {
    pagination: {
      show: true,
      type: 'server',
    },
  },
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...(rowSelection !== undefined && { state: { rowSelection } }),
    ...(onRowSelectionChange && {
      onRowSelectionChange: (updater) => {
        const next =
          typeof updater === 'function' ? updater(rowSelection ?? {}) : updater;
        onRowSelectionChange(next);
      },
    }),
    ...(getRowId && { getRowId }),
    enableRowSelection: true,
  });

  return (
    <>
      {components?.header(table)}

      <div
        className={cn(
          'overflow-hidden rounded-xl border border-primary/10 bg-white dark:bg-zinc-900',
          classNames?.wrapper,
        )}
      >
        <Table className={cn('', classNames?.table)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn(
                  'border-b border-primary/1 bg-slate-50 dark:bg-zinc-800/50',
                  classNames?.header?.tr,
                )}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        'px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300',
                        classNames?.header?.td,
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loader?.isLoading ? (
              loader?.component ? (
                loader.component
              ) : (
                Array.from(
                  { length: table.getState().pagination.pageSize },
                  (_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: columns?.length }, (_, index) => (
                        <TableCell
                          key={index}
                          className="bg-white py-4 text-center"
                        >
                          <Skeleton className="h-4 w-full bg-slate-100" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ),
                )
              )
            ) : table.getRowModel().rows?.length > 0 ? (
              (options?.pagination?.show
                ? table.getPaginationRowModel().rows
                : table.getRowModel().rows
              ).map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    'group transition-colors hover:bg-primary/5',
                    classNames?.cell?.tr,
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn('px-6 py-4', classNames?.cell?.td)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 bg-white text-center"
                  >
                    {emptyState ? emptyState : 'No results.'}
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-3">
        {options?.pagination?.show && table.getRowModel().rows?.length > 0 && (
          <TablePagination table={table} />
        )}
      </div>
    </>
  );
}

declare module '@tanstack/table-core' {
  interface PaginatedData<TData extends RowData> {
    data: TData;
    page: number;
    total: number;
    perPage: number;
  }
}
