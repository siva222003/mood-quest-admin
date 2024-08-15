import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Recommendation } from "../../data/schema";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "../recommendations/recommendation-row-actions";
import { formatDate } from "@/lib/date-formatter";

export const columns: ColumnDef<Recommendation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      const updatedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;

      return <div className="w-[150px]">{updatedTitle}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[430px] truncate font-medium">{row.getValue("description")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const date = formatDate(row.getValue("createdAt"));
      return (
        <div className="flex w-[100px] items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>
            <Badge variant={"secondary"}>{row.getValue("type")}</Badge>
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
