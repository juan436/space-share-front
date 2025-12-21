export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export class AuthenticationError extends DomainError {
  constructor(message: string = "Authentication failed") {
    super(message, "AUTH_ERROR");
    this.name = "AuthenticationError";
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string = "Unauthorized access") {
    super(message, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message, "CONFLICT");
    this.name = "ConflictError";
  }
}
