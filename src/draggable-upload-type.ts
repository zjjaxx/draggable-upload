export interface FileItem {
  status: "loading" | "success" | "error";
  url: string;
  [propName: string]: unknown;
}
export interface File {
  name: string;
  type: string;
  [propName: string]: unknown;
}
export type Nullable<T> = T | null | undefined;
