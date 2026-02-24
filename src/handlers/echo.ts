import type { ServerResponse } from "node:http";
import type { URL } from "node:url";

/**
 * /echo のリクエストを処理する
 * @param url リクエストURL
 * @param res HTTPレスポンス
 */
export function handleEcho(url: URL, res: ServerResponse): void {
  const word = url.searchParams.get("word");

  if (word === null) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing required parameter: word" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ result: word }));
}
