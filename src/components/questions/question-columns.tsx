import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Question } from "../../data/schema";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "../questions/question-row-actions";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/date-formatter";

export const columns: ColumnDef<Question>[] = [
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
    accessorKey: "questionText",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Question" />,
    cell: ({ row }) => {
      const questionText = row.getValue("questionText") as string;
      const updatedQuestionText =
        questionText.length > 50 ? `${questionText.slice(0, 50)}...` : questionText;
      return <div className="">{updatedQuestionText}</div>;
    },
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
          <span className="max-w-[500px] truncate">{date}</span>
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
