'use client';

import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

export default function TransactionsTableSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <Skeleton className="h-4 mb-3 w-1/5 rounded-lg shadow" />
      </div>
      <Table aria-label="Example static collection table w-full">
        <TableHeader>
          <TableColumn>
            <Skeleton className="w-5 h-5 rounded-lg" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="w-32 h-5 rounded-lg" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="w-32 h-5 rounded-lg" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="w-32 h-5 rounded-lg" />
          </TableColumn>
          <TableColumn>
            <Skeleton className="w-32 h-5 rounded-lg" />
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-5 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-5 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-5 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-32 h-5 rounded-lg" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
