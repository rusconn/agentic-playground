import * as fs from "node:fs";

import { TASKS_FILE } from "./config.ts";
import type { Task } from "./types.ts";

export function loadTasks(): Task[] {
  if (!fs.existsSync(TASKS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(TASKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tasks file:", error);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing tasks file:", error);
  }
}
