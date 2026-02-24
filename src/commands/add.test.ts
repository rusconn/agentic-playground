import * as assert from "node:assert";
import { describe, it } from "node:test";

import { addTaskToList } from "../commands/add.ts"; // Import addTaskToList
import type { Task } from "../types.ts"; // Import Task

describe("Unit Tests for addTaskToList function", () => {
  it("should add a task to an empty list", () => {
    const tasks: Task[] = [];
    const title = "New Task";
    const updatedTasks = addTaskToList(tasks, title);

    assert.strictEqual(updatedTasks.length, 1);
    assert.strictEqual(updatedTasks[0]!.id, 1);
    assert.strictEqual(updatedTasks[0]!.title, title);
    assert.strictEqual(updatedTasks[0]!.done, false);
  });

  it("should add a task to an existing list and increment ID", () => {
    const tasks: Task[] = [
      { id: 1, title: "Existing Task 1", done: false },
      { id: 2, title: "Existing Task 2", done: true },
    ];
    const title = "New Task";
    const updatedTasks = addTaskToList(tasks, title);

    assert.strictEqual(updatedTasks.length, 3);
    assert.strictEqual(updatedTasks[2]!.id, 3);
    assert.strictEqual(updatedTasks[2]!.title, title);
    assert.strictEqual(updatedTasks[2]!.done, false);
  });

  it("should add a task when previous IDs are not sequential", () => {
    const tasks: Task[] = [
      { id: 1, title: "Existing Task 1", done: false },
      { id: 5, title: "Existing Task 5", done: true },
    ];
    const title = "New Task";
    const updatedTasks = addTaskToList(tasks, title);

    assert.strictEqual(updatedTasks.length, 3);
    assert.strictEqual(updatedTasks[2]!.id, 6); // Max ID (5) + 1
    assert.strictEqual(updatedTasks[2]!.title, title);
    assert.strictEqual(updatedTasks[2]!.done, false);
  });
});
