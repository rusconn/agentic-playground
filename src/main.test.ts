import * as assert from "node:assert";
import { exec } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, beforeEach, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);
const MAIN_SCRIPT = path.join(__dirname, "main.ts");

describe("Integration Tests for CLI Commands", () => {
  let tempDir: string;
  let tasksFile: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "cli-test-"));
    tasksFile = path.join(tempDir, "tasks.json");
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("should add a task", async () => {
    const title = "Test Task 1";

    // Execute command in tempDir
    const { stderr } = await execAsync(`node "${MAIN_SCRIPT}" add "${title}"`, {
      cwd: tempDir,
    });

    // Verify output
    assert.strictEqual(stderr, "");
    // stdout check removed as per previous instruction

    // Verify file content
    assert.ok(fs.existsSync(tasksFile));
    const content = fs.readFileSync(tasksFile, "utf-8");
    const tasks = JSON.parse(content);

    assert.strictEqual(tasks.length, 1);
    assert.strictEqual(tasks[0].id, 1);
    assert.strictEqual(tasks[0].title, title);
    assert.strictEqual(tasks[0].done, false);
  });

  it("should add a second task with incremented ID", async () => {
    const title1 = "Test Task 1";
    const title2 = "Test Task 2";

    // Add first task
    await execAsync(`node "${MAIN_SCRIPT}" add "${title1}"`, { cwd: tempDir });

    // Add second task
    await execAsync(`node "${MAIN_SCRIPT}" add "${title2}"`, { cwd: tempDir });

    // stdout check removed as per previous instruction

    const content = fs.readFileSync(tasksFile, "utf-8");
    const tasks = JSON.parse(content);

    assert.strictEqual(tasks.length, 2);
    assert.strictEqual(tasks[0].title, title1);
    assert.strictEqual(tasks[1].id, 2);
    assert.strictEqual(tasks[1].title, title2);
  });

  it("should list tasks", async () => {
    const title1 = "Test Task 1";
    const title2 = "Test Task 2";

    // Add tasks
    await execAsync(`node "${MAIN_SCRIPT}" add "${title1}"`, { cwd: tempDir });
    await execAsync(`node "${MAIN_SCRIPT}" add "${title2}"`, { cwd: tempDir });

    // List tasks
    const { stdout, stderr } = await execAsync(`node "${MAIN_SCRIPT}" ls`, {
      cwd: tempDir,
    });

    assert.strictEqual(stderr, "");
    assert.ok(stdout.includes("1. [ ] Test Task 1"));
    assert.ok(stdout.includes("2. [ ] Test Task 2"));
  });

  it("should mark a task as done", async () => {
    const title = "Test Task";

    // Add task
    await execAsync(`node "${MAIN_SCRIPT}" add "${title}"`, { cwd: tempDir });

    // Mark as done
    const { stderr } = await execAsync(`node "${MAIN_SCRIPT}" done 1`, {
      cwd: tempDir,
    });

    assert.strictEqual(stderr, "");

    // Verify file content
    const content = fs.readFileSync(tasksFile, "utf-8");
    const tasks = JSON.parse(content);

    assert.strictEqual(tasks.length, 1);
    assert.strictEqual(tasks[0].id, 1);
    assert.strictEqual(tasks[0].done, true);

    // Verify list output
    const { stdout } = await execAsync(`node "${MAIN_SCRIPT}" ls`, {
      cwd: tempDir,
    });
    assert.ok(stdout.includes("1. [x] Test Task"));
  });
});
