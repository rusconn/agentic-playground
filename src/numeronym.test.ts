import { strictEqual } from "node:assert";
import { describe, it } from "node:test";

import { numeronym } from "./numeronym.ts";

describe("numeronym", () => {
  it("should convert 'kubernetes' to 'k8s'", () => {
    strictEqual(numeronym("kubernetes"), "k8s");
  });

  it("should convert 'internationalization' to 'i18n'", () => {
    strictEqual(numeronym("internationalization"), "i18n");
  });

  it("should return the same string if length is 2", () => {
    strictEqual(numeronym("at"), "at");
  });

  it("should return the same string if length is 1", () => {
    strictEqual(numeronym("a"), "a");
  });

  it("should convert 'apple' to 'a3e'", () => {
    strictEqual(numeronym("apple"), "a3e");
  });
});
