import * as assert from "node:assert";
import { describe, it } from "node:test";

import type { Task } from "../types.ts";
import { markTaskAsDone } from "./done.ts";

describe("Unit Tests for markTaskAsDone function", () => {
  it("should mark the specified task as done", () => {
    const tasks: Task[] = [
      { id: 1, title: "Task 1", done: false },
      { id: 2, title: "Task 2", done: false },
    ];
    const result = markTaskAsDone(tasks, 1);
    assert.strictEqual(result[0]?.done, true);
    assert.strictEqual(result[1]?.done, false);
  });

  it("should not change anything if ID does not exist", () => {
    const tasks: Task[] = [{ id: 1, title: "Task 1", done: false }];
    const result = markTaskAsDone(tasks, 2);
    assert.strictEqual(result[0]?.done, false);
  });

  it("should handle an empty list", () => {
    const tasks: Task[] = [];
    const result = markTaskAsDone(tasks, 1);
    assert.deepStrictEqual(result, []);
  });
});
