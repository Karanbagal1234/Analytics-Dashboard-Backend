// Importing necessary modules
import Session from "../model/session.js";      // Import the Session model
import { errors } from "../_helpers/Error.js";  // Import custom error handling utilities
import { endSessionSchema } from "../_helpers/validate.js";

// Controller to handle ending a session
const EndSessions = async (req, res, next) => {
 // Validate the request body
 const { SessionID, pageViews } = await endSessionSchema.validateAsync(req.body);

 // Find the session by SessionID
 const session = await Session.findOne({ SessionID });

 // If the session is not found, return a 'not found' error
 if (!session) {
     return next(errors.notFound("Session"));  // Using the custom error handler for session not found
 }

 // Check if the session has already ended
 if (session.end) {
     return next(errors.conflict("Session has already ended.")); // Using custom conflict error
 }

 // Update the session details to end it
 session.end = new Date();
 session.pageViews = pageViews;
 await session.save();

 // Send a response back to the client indicating the session has ended
 res.json({ message: "Session ended successfully", session });
};

export default EndSessions;
