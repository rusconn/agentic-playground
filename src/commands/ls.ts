import { loadTasks } from "../storage.ts";
import type { Task } from "../types.ts";

export function ls(): void {
  const tasks = loadTasks();
  console.log(formatTasks(tasks));
}

export function formatTasks(tasks: Task[]): string {
  if (tasks.length === 0) {
    return "No tasks found.";
  }
  return tasks.map(formatTask).join("\n");
}

function formatTask(task: Task): string {
  return `${task.id}. [${task.done ? "x" : " "}] ${task.title}`;
}
