// Importing necessary modules
import shortid from "shortid";        // Import shortid for generating unique session IDs
import Session from "../model/session.js";  // Import the Session model
import User from "../model/User.js";       // Import the User model
import { errors } from "../_helpers/Error.js";  // Import custom error handling utilities
import { startSessionSchema } from "../_helpers/validate.js";

// Controller to handle starting a session
const StartSessions = async (req, res, next) => {
         // Validate the request body
         const { UserName } = await startSessionSchema.validateAsync(req.body);

         // Generate a unique session ID
         const SesId = shortid.generate();
 
         // Find the user in the database using the UserName
         const SesUser = await User.findOne({ _id: UserName });
 
         // If the user is not found, return a 'not found' error
         if (!SesUser) {
             return next(errors.notFound("User"));  // Use the custom error handler
         }
 
         // Check for any active (non-ended) sessions for the user
         const activeSessions = await Session.find({ User: SesUser._id, end: { $eq: null } });
 
         if (activeSessions.length > 0) {
             // End all active sessions
             await Promise.all(
                 activeSessions.map(async (session) => {
                     session.end = new Date(); // Set the end time
                     await session.save();    // Save the updated session
                 })
             );
         }
 
         // Create a new session document
         let Sessions = new Session({
             SessionID: SesId,
             User: SesUser,  // Associating the session with the found user
             start: new Date(),  // Start time of the session
         });
 
         // Save the new session to the database
         Sessions = await Sessions.save();
 let {SessionID } = Sessions
         // Send a response back to the client indicating the session has started
         res.json({ message: "New session started. Any previously open sessions were closed.", SessionID });
 
};

export default StartSessions;
