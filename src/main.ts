import { add } from "./commands/add.ts";
import { done } from "./commands/done.ts";
import { ls } from "./commands/ls.ts";

function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "add": {
      const title = args[1];
      if (!title) {
        console.error("Usage: add <title>");
        process.exit(1);
      }
      add(title);
      break;
    }
    case "ls": {
      ls();
      break;
    }
    case "done": {
      const idArg = args[1];
      if (!idArg) {
        console.error("Usage: done <id>");
        process.exit(1);
      }
      const id = Number.parseInt(idArg, 10);
      if (Number.isNaN(id)) {
        console.error("Usage: done <id>");
        process.exit(1);
      }
      done(id);
      break;
    }
    default:
      console.log("Unknown command");
      break;
  }
}

main();
