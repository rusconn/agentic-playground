import * as assert from "node:assert";
import { describe, it } from "node:test";

import { formatTasks } from "../commands/ls.ts";
import type { Task } from "../types.ts";

describe("Unit Tests for formatTasks function", () => {
  it("should return message if task list is empty", () => {
    const tasks: Task[] = [];
    const result = formatTasks(tasks);
    assert.strictEqual(result, "No tasks found.");
  });

  it("should format tasks correctly", () => {
    const tasks: Task[] = [
      { id: 1, title: "Task 1", done: false },
      { id: 2, title: "Task 2", done: true },
    ];
    const result = formatTasks(tasks);
    const expected = "1. [ ] Task 1\n2. [x] Task 2";
    assert.strictEqual(result, expected);
  });
});
