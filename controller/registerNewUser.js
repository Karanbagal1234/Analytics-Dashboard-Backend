// Importing necessary modules
import shortid from 'shortid';        // Import shortid for generating unique user IDs
import User from '../model/User.js';   // Import the User model

// Controller to handle user registration
const Register = async (req, res, next) => {
    // Generate a unique ID for the new user
    const Id = shortid.generate();

    // Create a new user instance with the generated ID
    const NewUser = new User({ UserName: Id });

    // Save the new user to the database
    await NewUser.save();

    // Send a response back to the client with success message and user ID
    res.json({ message: "User registered successfully", Data:{UserName:NewUser['_id'] }});
};

export default Register;
