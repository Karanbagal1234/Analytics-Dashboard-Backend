// Importing necessary modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Importing custom services and routes
import connect from './service/DB.js';
import errorHandler from './service/errorHandler.js';
import router from './routes/Client.Data.js';
import AnlyticsRouter from './routes/Analytics.js';

// Load environment variables
dotenv.config({ path: '.env' });

// Initialize the Express app
const app = express();

// Middleware configuration
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data
// Connect to the database
connect();

// Rate limiting setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Allow 100 requests per window (per 15 minutes)
  standardHeaders: 'draft-8', // Rate limit headers
  legacyHeaders: false, // Disable legacy rate limit headers
});

// Apply the rate limiting middleware globally
// app.use(limiter);

// Security setup using Helmet
app.use(helmet()); 

// Define the routes
app.use("/api/v1", router); // Client data route
app.use("/api/v1", AnlyticsRouter); // Analytics route

// Catch-All for Undefined Routes
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error); // Pass the error to the error handler
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
