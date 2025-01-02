// Importing mongoose to handle database connections
import mongoose from "mongoose";

// Function to connect to MongoDB
export default async function connectDB() {
    try {
        // Attempt to connect to the MongoDB database
        await mongoose.connect(process.env.URL);

        // Log a success message when connected
        console.log("Connected to the database successfully");

    } catch (error) {
        // Log the error if the connection fails
        console.error("Database connection failed:", error.message);
        process.exit(1);  // Exit the process with failure code if the connection fails
    }
}