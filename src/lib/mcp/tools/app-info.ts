import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_app_info",
  title: "Get app info",
  description: "Return basic information about the Ollie app and its current status.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Ollie",
      status: "early setup",
      serverTime: new Date().toISOString(),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info) }],
      structuredContent: { info },
    };
  },
});
