import { ColumnDef } from "@tanstack/react-table";
import { HTMLAttributes } from "react";

export type TableProps<T> = {
  data: T[];
  columns?: ColumnDef<T>[];
  keys?: string[];
  showFooter?: boolean;
} & Pick<HTMLAttributes<HTMLTableElement>, 'className'>;


