import { loadTasks, saveTasks } from "../storage.ts";
import type { Task } from "../types.ts";

export function done(id: number): void {
  const tasks = loadTasks();
  const updatedTasks = markTaskAsDone(tasks, id);
  saveTasks(updatedTasks);
}

export function markTaskAsDone(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id === id) {
      return { ...task, done: true };
    }
    return task;
  });
}
