export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 400
): Promise<T> {
  let lastError: unknown;

  for (
    let attempt = 0;
    attempt <= retries;
    attempt++
  ) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === retries) {
        break;
      }

      const delay =
        baseDelay *
          Math.pow(2, attempt) +
        Math.floor(
          Math.random() * 250
        );

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw lastError;
}