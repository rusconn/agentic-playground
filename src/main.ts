import { createServer } from "node:http";
import { URL } from "node:url";

import { handleEcho } from "./handlers/echo.ts";
import { handleHello } from "./handlers/hello.ts";
import { handleNumeronym } from "./handlers/numeronym.ts";

/**
 * HTTPサーバーを起動する
 */
export function main(): void {
  const port = 3000;

  const server = createServer((req, res) => {
    if (!req.url) {
      res.writeHead(404);
      res.end();
      return;
    }

    const url = new URL(req.url, `http://localhost:${port}`);

    switch (url.pathname) {
      case "/hello":
        handleHello(res);
        break;
      case "/echo":
        handleEcho(url, res);
        break;
      case "/numeronym":
        handleNumeronym(url, res);
        break;
      default:
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not Found" }));
    }
  });

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();
