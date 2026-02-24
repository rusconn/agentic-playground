import { loadTasks, saveTasks } from "../storage.ts";
import type { Task } from "../types.ts";

export function add(title: string): void {
  let tasks = loadTasks();
  tasks = addTaskToList(tasks, title);
  saveTasks(tasks);
}

export function addTaskToList(tasks: Task[], title: string): Task[] {
  const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask: Task = {
    id,
    title,
    done: false,
  };
  return [...tasks, newTask];
}
