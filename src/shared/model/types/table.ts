import { ColumnDef } from "@tanstack/react-table";
import { HTMLAttributes } from "react";

export type TableProps<TData> = {
  data: TData[];
  columns?: ColumnDef<TData>[];
  keys?: string[];
  showFooter?: boolean;
} & Pick<HTMLAttributes<HTMLTableElement>, 'className'>;


