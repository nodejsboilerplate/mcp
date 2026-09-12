import { toNodeHandler } from "@modelcontextprotocol/node";
import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import { createServer } from "node:http";

const handler = createMcpHandler(() => {
  const server = new McpServer({ name: "greeting-server", version: "1.0.0" });

  server.registerTool(
    "add_numbers",
    {
      description: "Add two numbers of a and b",
      inputSchema: z.object({
        a: z.number().describe("Number a"),
        b: z.number().describe("Number b"),
      }),
    },
    async ({ a, b }) => {
      const result = a + b;
      return {
        content: [
          { type: "text", text: "The result is " + JSON.stringify(result) },
        ],
      };
    }
  );

  return server;
});

const nodeHandler = toNodeHandler(handler);
createServer((req, res) => {
  void nodeHandler(req, res);
}).listen(3000, "127.0.0.1", () => {
  console.log("server is listening on port 3000");
});
