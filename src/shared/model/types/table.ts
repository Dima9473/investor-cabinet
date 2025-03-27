import { ColumnDef } from "@tanstack/react-table";

export type TableProps<T> = {
  data: T[];
  columns?: ColumnDef<T>[];
  keys?: string[];
};


