class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    // this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}
class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

export {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  DatabaseError,
};
