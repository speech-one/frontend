export const mcpKeys = {
  list:   () => ['mcp'] as const,
  detail: (id: string) => [...mcpKeys.list(), id] as const,
};
