import * as fs from "node:fs";

import { validateUser } from "./validator.ts";

function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];
  const jsonPath = args[1];

  if (command !== "validate" || !jsonPath) {
    console.error("Usage: validate <json_path>");
    process.exit(1);
  }

  if (!fs.existsSync(jsonPath)) {
    console.error(`File not found: ${jsonPath}`);
    process.exit(1);
  }

  let data: unknown;
  try {
    const content = fs.readFileSync(jsonPath, "utf-8");
    data = JSON.parse(content);
  } catch (_error) {
    console.log("Invalid:");
    console.log("- Invalid JSON");
    process.exit(1);
  }

  const errors = validateUser(data);

  if (errors.length === 0) {
    console.log("Valid");
    process.exit(0);
  } else {
    console.log("Invalid:");
    for (const error of errors) {
      console.log(`- ${error}`);
    }
    process.exit(1);
  }
}

main();
