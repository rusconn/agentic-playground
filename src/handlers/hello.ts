import type { ServerResponse } from "node:http";

/**
 * /hello のリクエストを処理する
 * @param res HTTPレスポンス
 */
export function handleHello(res: ServerResponse): void {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ result: "hello" }));
}
