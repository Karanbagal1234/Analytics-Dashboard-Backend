import mongoose from "mongoose";
import Session from '../model/session.js'; // Adjust the import path

const getSessionDurationData = async () => {
  const sessionData = await Session.aggregate([
    {
      // Add a field to determine the day of the week
      $addFields: {
        dayOfWeek: { $dayOfWeek: "$start" } // Extract the day of the week (1 = Sunday, 7 = Saturday)
      }
    },
    {
      // Calculate session duration in minutes
      $addFields: {
        sessionDuration: {
          $divide: [
            { $subtract: ["$end", "$start"] }, // Duration in milliseconds
            1000 * 60 // Convert milliseconds to minutes
          ]
        }
      }
    },
    {
      // Group by the day of the week and calculate the average session duration
      $group: {
        _id: "$dayOfWeek", // Group by day of the week (1 = Sunday, 7 = Saturday)
        avgSessionDuration: { $avg: "$sessionDuration" } // Calculate average duration
      }
    },
    {
      // Sort by day of the week (1 to 7: Sunday to Saturday)
      $sort: { _id: 1 }
    }
  ]);

  // Map the result to match the Highcharts data format
  const categories = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = categories.map((day, index) => {
    const dayData = sessionData.find(item => item._id === index + 1); // Match day of week (1 = Sunday)
    return dayData ? dayData.avgSessionDuration : 0; // Default to 0 if no data for that day
  });

  // Return data formatted for Highcharts
  return {
    categories,
    seriesData: chartData
  };
};

export default getSessionDurationData;

