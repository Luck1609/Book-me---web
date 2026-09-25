import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export function TableSkeleton({ columns, rows = 5 }: TableSkeletonProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, i) => (
            <TableHead key={`header-${i}`} className="border-r border-gray-200">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow
            key={`row-${rowIndex}`}
            className="border-b border-gray-200"
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell
                key={`cell-${rowIndex}-${colIndex}`}
                className="border-r border-gray-200 px-3 py-4"
              >
                <div className="h-4 animate-pulse rounded bg-gray-100"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
