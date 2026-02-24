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

describe("Integration Tests", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "validate-test-"));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("should output Valid and exit 0 for a valid JSON", async () => {
    const jsonPath = path.join(tempDir, "valid.json");
    const user = {
      id: 1,
      name: "John",
      email: "john@example.com",
    };
    fs.writeFileSync(jsonPath, JSON.stringify(user));

    const { stdout, stderr } = await execAsync(`node "${MAIN_SCRIPT}" validate "${jsonPath}"`);

    assert.strictEqual(stdout.trim(), "Valid");
    assert.strictEqual(stderr, "");
  });

  it("should output Invalid and errors and exit 1 for invalid fields", async () => {
    const jsonPath = path.join(tempDir, "invalid.json");
    const user = {
      id: 0,
      name: "",
      email: "no-at",
    };
    fs.writeFileSync(jsonPath, JSON.stringify(user));

    try {
      await execAsync(`node "${MAIN_SCRIPT}" validate "${jsonPath}"`);
      assert.fail("Should have failed with exit code 1");
    } catch (error: unknown) {
      const err = error as { code: number; stdout: Buffer };
      assert.strictEqual(err.code, 1);
      const stdout = err.stdout.toString();
      assert.ok(stdout.includes("Invalid:"));
      assert.ok(stdout.includes("- id must be >= 1"));
      assert.ok(stdout.includes("- name must be 1-20 characters"));
      assert.ok(stdout.includes("- email must contain '@'"));
    }
  });

  it("should output property is required and exit 1 for missing fields", async () => {
    const jsonPath = path.join(tempDir, "missing.json");
    const user = {
      id: 1,
      // name missing
      email: "john@example.com",
    };
    fs.writeFileSync(jsonPath, JSON.stringify(user));

    try {
      await execAsync(`node "${MAIN_SCRIPT}" validate "${jsonPath}"`);
      assert.fail("Should have failed with exit code 1");
    } catch (error: unknown) {
      const err = error as { code: number; stdout: Buffer };
      assert.strictEqual(err.code, 1);
      const stdout = err.stdout.toString();
      assert.ok(stdout.includes("Invalid:"));
      assert.ok(stdout.includes("- name is required"));
    }
  });

  it("should output Invalid JSON and exit 1 for malformed JSON", async () => {
    const jsonPath = path.join(tempDir, "malformed.json");
    fs.writeFileSync(jsonPath, "{ invalid json }");

    try {
      await execAsync(`node "${MAIN_SCRIPT}" validate "${jsonPath}"`);
      assert.fail("Should have failed with exit code 1");
    } catch (error: unknown) {
      const err = error as { code: number; stdout: Buffer };
      assert.strictEqual(err.code, 1);
      const stdout = err.stdout.toString();
      assert.ok(stdout.includes("Invalid:"));
      assert.ok(stdout.includes("- Invalid JSON"));
    }
  });
});
