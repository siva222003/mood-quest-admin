import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Section } from "../../data/schema";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "../sections/section-row-actions";
import { formatDate } from "@/lib/date-formatter";

export const columns: ColumnDef<Section>[] = [
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
        onClick={(event) => event.stopPropagation()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const date = formatDate(row.getValue("createdAt"));
      return (
        <div className="flex space-x-2">
          {/* <span className="max-w-[500px] truncate font-medium">{row.getValue("createdAt")}</span> */}
          <span className="max-w-[500px] truncate">{date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "questions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Questions" />,
    cell: ({ row }) => {
      const questions = row.getValue("questions") as string[];

      return (
        <div className="flex w-[100px] items-center pl-3">
          <span>{questions && questions.length > 0 ? questions.length : "NA"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
