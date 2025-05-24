// src/components/trips/TripsTable.tsx
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import TripDrawer from "@/components/trips/TripDrawer";

const data = [
  { tripId: "TRIP1234", origin: "NJS", direction: "WEST", temp: "55F", unit: "UNIT01" },
  { tripId: "TRIP1235", origin: "CHINO, CA", direction: "EAST", temp: "35F", unit: "UNIT01" }
];

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "tripId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-xs"
      >
        Trip ID <ArrowUpDown className="w-3 h-3 ml-1" />
      </Button>
    )
  },
  { accessorKey: "origin", header: "Origin" },
  { accessorKey: "direction", header: "Direction" },
  { accessorKey: "temp", header: "Temp" },
  { accessorKey: "unit", header: "Unit" }
];

export default function TripsTable() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Trips</h1>
        <Button
          size="sm"
          variant="default"
          className=""
          onClick={() => setDrawerOpen(true)}
        >
          + Create
        </Button>
      </div>
      <div className="border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-3 py-2 text-left font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TripDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
