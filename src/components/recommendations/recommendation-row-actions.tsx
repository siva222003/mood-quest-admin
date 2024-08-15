import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef } from "react";
import EditRecommendation from "./EditRecommendation";
import { Recommendation } from "@/data/schema";
import { useDeleteRecommendation } from "@/hooks/recommendation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { mutate } = useDeleteRecommendation();

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    buttonRef.current?.click();
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    mutate((row.original as Recommendation)._id);
  };

  return (
    <DropdownMenu>
      <div onClick={(e) => e.stopPropagation()}>
        <EditRecommendation ref={buttonRef} recommendation={row.original as Recommendation} />
      </div>

      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
