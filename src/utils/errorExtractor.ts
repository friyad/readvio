export function extractErrorMessage(error: unknown): string {
  // Better Auth errors (usually { error: { message: string } } or { message: string })
  if (error && typeof error === "object") {
    const err = error as Record<string, any>;

    // better-auth wrapped error
    if (
      err.error &&
      typeof err.error === "object" &&
      typeof err.error.message === "string"
    ) {
      return err.error.message;
    }

    // Express/REST-shaped error: { message, error, errors, ... }
    if (typeof err.message === "string") {
      return err.message;
    }
    // Express/REST errors: array of error objects
    if (Array.isArray(err.errors) && err.errors.length) {
      // e.g., error format: { errors: [{ msg: "Required field", param: ... }, ...] }
      const firstError = err.errors[0];
      if (
        typeof firstError === "object" &&
        typeof firstError.msg === "string"
      ) {
        return firstError.msg;
      }
      // fallback to first error as string
      if (typeof firstError === "string") {
        return firstError;
      }
    }
    // Some APIs may return 'error' as string
    if (typeof err.error === "string") {
      return err.error;
    }
    // 'detail' or 'description' fields are sometimes used (e.g., openapi)
    if (typeof err.detail === "string") {
      return err.detail;
    }
    if (typeof err.description === "string") {
      return err.description;
    }
  }

  // JS native Error or thrown string
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }

  // Nothing useful found
  return "An unknown error occurred. Please try again.";
}
