import type { ServerResponse } from "node:http";
import type { URL } from "node:url";

import { numeronym } from "../numeronym.ts";

/**
 * /numeronym のリクエストを処理する
 * @param url リクエストURL
 * @param res HTTPレスポンス
 */
export function handleNumeronym(url: URL, res: ServerResponse): void {
  const word = url.searchParams.get("word");

  if (word === null) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing required parameter: word" }));
    return;
  }

  // 必須パラメーターの形式が仕様を満たさない場合は400
  // 仕様には「形式」についての具体的な記述はないが、空文字列などはエラーにしても良いかもしれない。
  // ここではシンプルにそのまま処理するが、もし特定のバリデーションが必要ならここに追加する。

  const result = numeronym(word);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ result }));
}
