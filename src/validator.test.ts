import * as assert from "node:assert";
import { describe, it } from "node:test";

import { validateUser } from "./validator.ts";

describe("validateUser", () => {
  describe("Success cases", () => {
    const successCases = [
      {
        name: "valid user",
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          age: 25,
        },
      },
      {
        name: "valid user without optional age",
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
        },
      },
      {
        name: "valid user with emoji in name",
        user: {
          id: 1,
          name: "😀".repeat(20),
          email: "john@example.com",
        },
      },
    ];

    for (const { name, user } of successCases) {
      it(`should return no errors for ${name}`, () => {
        const errors = validateUser(user);
        assert.strictEqual(errors.length, 0);
      });
    }
  });

  describe("Validation errors", () => {
    const errorCases = [
      // Required checks
      {
        name: "missing id",
        user: {
          name: "John Doe",
          email: "john@example.com",
        },
        expected: ["id is required"],
      },
      {
        name: "missing name",
        user: {
          id: 1,
          email: "john@example.com",
        },
        expected: ["name is required"],
      },
      {
        name: "missing email",
        user: {
          id: 1,
          name: "John Doe",
        },
        expected: ["email is required"],
      },
      {
        name: "multiple missing properties",
        user: {},
        expected: ["id is required", "name is required", "email is required"],
      },
      // Type checks
      {
        name: "invalid id type",
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
        expected: ["id must be a number"],
      },
      {
        name: "invalid name type",
        user: {
          id: 1,
          name: 123,
          email: "john@example.com",
        },
        expected: ["name must be a string"],
      },
      {
        name: "invalid email type",
        user: {
          id: 1,
          name: "John Doe",
          email: true,
        },
        expected: ["email must be a string"],
      },
      {
        name: "invalid age type",
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          age: "25",
        },
        expected: ["age must be a number"],
      },
      // Value constraints
      {
        name: "id too small",
        user: {
          id: 0,
          name: "John Doe",
          email: "john@example.com",
        },
        expected: ["id must be >= 1"],
      },
      {
        name: "name too long",
        user: {
          id: 1,
          name: "A".repeat(21),
          email: "john@example.com",
        },
        expected: ["name must be 1-20 characters"],
      },
      {
        name: "name empty after trim",
        user: {
          id: 1,
          name: "   ",
          email: "john@example.com",
        },
        expected: ["name must be 1-20 characters"],
      },
      {
        name: "emoji name too long",
        user: {
          id: 1,
          name: "😀".repeat(21),
          email: "john@example.com",
        },
        expected: ["name must be 1-20 characters"],
      },
      {
        name: "email missing @",
        user: {
          id: 1,
          name: "John",
          email: "john_example.com",
        },
        expected: ["email must contain '@'"],
      },
      {
        name: "email with multiple @",
        user: {
          id: 1,
          name: "John",
          email: "john@@example.com",
        },
        expected: ["email must contain '@'"],
      },
      {
        name: "email starting with @",
        user: {
          id: 1,
          name: "John",
          email: "@example.com",
        },
        expected: ["email must contain '@'"],
      },
      {
        name: "age negative",
        user: {
          id: 1,
          name: "John",
          email: "john@example.com",
          age: -1,
        },
        expected: ["age must be >= 0"],
      },
      {
        name: "multiple validation errors",
        user: {
          id: 0,
          name: "",
          email: "invalid-email",
          age: -5,
        },
        expected: [
          "id must be >= 1",
          "name must be 1-20 characters",
          "email must contain '@'",
          "age must be >= 0",
        ],
      },
    ];

    for (const { name, user, expected } of errorCases) {
      it(`should return error for ${name}`, () => {
        const errors = validateUser(user);
        assert.deepStrictEqual(errors, expected);
      });
    }
  });
});
