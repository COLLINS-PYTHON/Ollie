import { defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import appInfoTool from "./tools/app-info";

export default defineMcp({
  name: "ollie",
  title: "Ollie",
  version: "0.1.0",
  instructions:
    "Public tools for the Ollie app. Use `echo` to verify connectivity and `get_app_info` for basic app details.",
  tools: [echoTool, appInfoTool],
});
