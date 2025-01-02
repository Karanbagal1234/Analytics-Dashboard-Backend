// Custom Error Class
class CustomError extends Error {
    constructor(message, statusCode, details = null) {
        super(message); // Call the parent Error class's constructor
        this.statusCode = statusCode;
        this.details = details; // Additional metadata (optional)

        // Capture the stack trace (only in non-production environments)
        if (process.env.NODE_ENV !== "production") {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Error Factory Function
export const createError = (message, statusCode = 500, details = null) => {
    return new CustomError(message, statusCode, details);
};

// Predefined Error Helpers
export const errors = {
    notFound: (resource = "Resource") => createError(`${resource} not found`, 404),
    unauthorized: () => createError("Unauthorized access", 401),
    forbidden: () => createError("Access forbidden", 403),
    badRequest: (message = "Invalid request") => createError(message, 400),
    serverError: () => createError("Internal Server Error", 500),
    conflict: (message = "Conflict occurred") => createError(message, 409),
};

