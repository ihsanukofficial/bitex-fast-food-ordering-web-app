/**
 * Thrown for expected request failures (validation, auth, not-found) so the
 * central error handler can respond with the intended status code and message.
 */
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
