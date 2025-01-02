// Importing necessary modules
import Analytics from '../model/Anlytics.js';             // Import the Analytics model
import { analyticsDataSchema, validateInput } from '../_helpers/validate.js';  // Import validation schema and function
import Joi from 'joi';  // Import Joi for validation (though it's used within the helper)
import User from '../model/User.js';

// Controller to handle storing analytics data
const AnalyticsData = async (req, res, next) => {
    // Validate the incoming request data using the defined schema
  let val = await analyticsDataSchema.validateAsync(req.body)
  console.log(val)
    let user = User.findById(val.UserName)
    // Create a new Analytics document from the request body
    const analytics = new Analytics({...val});

    console.log(user);
    console.log('----------------------------')
    console.log(analytics)
    // Save the new analytics data to the database
    await analytics.save();

    // Send a response back to the client with success message and the stored analytics data
    res.json({ message: "Analytics stored successfully", analytics });
};

export default AnalyticsData;
