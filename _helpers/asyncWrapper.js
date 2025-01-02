// Async Handler Higher Order Function (HOF)
// This function ensures that any async route handler properly handles errors by passing them to the next middleware

export default (fn) => {
    // Return a function that wraps the async route handler
    return (req, res, next) => {
        // Resolve the async function and catch any potential errors, forwarding them to the error handler
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
