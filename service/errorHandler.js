// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    // Default to 500 if no status code is provided
    const statusCode = err.statusCode || 500;

    // Log the error message and stack trace (if available) for debugging purposes
    console.error(err.message);
  
    // Handle validation errors from Joi (or any validation library)
    if (err.isJoi) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            details: err.details.message || err.message,  // Include details or the error message
        });
    }

    // Handle other error types (for example, database errors)
    if (err.name === 'MongoError') {
        return res.status(500).json({
            success: false,
            message: 'Database error',
            details: err.message,  // Include database error message
        });
    }

    // Catch any unhandled errors (e.g., programming errors, unknown errors)
    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        details: err.details || null,  // Include error details if available
    });
};

export default errorHandler;