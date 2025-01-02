// Import necessary modules and controllers
import express from 'express';
import Register from '../controller/registerNewUser.js';
import AnalyticsData from '../controller/analyticsController.js';
import StartSessions from '../controller/StartSessions.js';
import EndSessions from '../controller/EndSessions.js';
import asyncWrapper from "../_helpers/asyncWrapper.js";
import BlogPageRegister from '../controller/BlogPageRegister.js';
// Initialize express Router
const router = express.Router();

// Define the routes for various client data actions

// Route to register a new user
router.get("/users/register", asyncWrapper(Register));

// Route to handle analytics data
router.post("/analytics" ,asyncWrapper(AnalyticsData));

// Route to start a session
router.post("/sessions/start", asyncWrapper(StartSessions));

// Route to end a session
router.post("/sessions/end", asyncWrapper(EndSessions));

// Route to register a new blog page
router.post("/blogs/page", asyncWrapper(BlogPageRegister));

// Export the router to use in other files
export default router;
