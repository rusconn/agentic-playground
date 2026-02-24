/**
 * Validates a user object against the schema and returns a list of error messages.
 */
export function validateUser(data: unknown): string[] {
  const errors: string[] = [];

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    errors.push("Invalid JSON");
    return errors;
  }

  const obj = data as Record<string, unknown>;

  // Check for additional properties
  const allowedKeys = ["id", "name", "email", "age"];
  const actualKeys = Object.keys(obj);
  for (const key of actualKeys) {
    if (!allowedKeys.includes(key)) {
      errors.push(`Additional property '${key}' is not allowed`);
    }
  }

  // id validation
  if (!("id" in obj)) {
    errors.push("id is required");
  } else {
    const idError = validateId(obj.id);
    if (idError) errors.push(idError);
  }

  // name validation
  if (!("name" in obj)) {
    errors.push("name is required");
  } else {
    const nameError = validateName(obj.name);
    if (nameError) errors.push(nameError);
  }

  // email validation
  if (!("email" in obj)) {
    errors.push("email is required");
  } else {
    const emailError = validateEmail(obj.email);
    if (emailError) errors.push(emailError);
  }

  // age validation
  const ageError = validateAge(obj.age);
  if (ageError) errors.push(ageError);

  return errors;
}

function validateId(id: unknown): string | null {
  if (typeof id !== "number") {
    return "id must be a number";
  }
  if (!Number.isInteger(id) || id < 1) {
    return "id must be >= 1";
  }
  return null;
}

function validateName(name: unknown): string | null {
  if (typeof name !== "string") {
    return "name must be a string";
  }
  const trimmed = name.trim();
  const length = [...trimmed].length;
  if (length < 1 || length > 20) {
    return "name must be 1-20 characters";
  }
  return null;
}

function validateEmail(email: unknown): string | null {
  if (typeof email !== "string") {
    return "email must be a string";
  }
  const parts = email.split("@");
  if (parts.length !== 2 || email.startsWith("@") || email.endsWith("@")) {
    return "email must contain '@'";
  }
  return null;
}

function validateAge(age: unknown): string | null {
  if (age === undefined) {
    return null;
  }
  if (typeof age !== "number") {
    return "age must be a number";
  }
  if (!Number.isInteger(age) || age < 0) {
    return "age must be >= 0";
  }
  return null;
}
