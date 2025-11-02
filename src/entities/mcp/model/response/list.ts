export interface McpListItemResponse {
  id:    string;
  title: string;
  args:  string;
}

export type McpListResponse = McpListItemResponse[];
