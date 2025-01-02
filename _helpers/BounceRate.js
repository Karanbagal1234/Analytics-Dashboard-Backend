import mongoose from "mongoose";
import User from "../model/User.js"; // Adjust the import path

const getBounceRateData = async () => {
  // Calculate the total count of users for each day of the week
 
 try {
  
 } catch (error) {
  
 }
  const totalUsersPerDay = await User.aggregate([
    {
      $project: {
        dayOfWeek: { $dayOfWeek: "$createdAt" } // Extract the day of the week (1 = Sunday, 7 = Saturday)
      }
    },
    {
      $group: {
        _id: "$dayOfWeek", // Group by day of the week
        totalCount: { $sum: 1 } // Count total users per day
      }
    }
  ]);

  // Calculate the number of bounced users for each day (status is "Inactive")
  const bouncedUsersPerDay = await User.aggregate([
    {
      $project: {
        dayOfWeek: { $dayOfWeek: "$createdAt" }, // Extract the day of the week
        status: "$Status"
      }
    },
    {
      $match: {
        status: "Inactive" // Filter for "Inactive" users (bounced users)
      }
    },
    {
      $group: {
        _id: "$dayOfWeek", // Group by day of the week
        bouncedCount: { $sum: 1 } // Count bounced users per day
      }
    }
  ]);

  // Merge the data: Calculate the bounce rate as (bounced / total) * 100
  const bounceRateData = totalUsersPerDay.map(total => {
    const bounced = bouncedUsersPerDay.find(item => item._id === total._id);
    const bouncedCount = bounced ? bounced.bouncedCount : 0;
    const bounceRate = (bouncedCount / total.totalCount) * 100; // Bounce rate percentage

    return {
      dayOfWeek: total._id,
      bounceRate: bounceRate
    };
  });

  // Define categories for the X-axis (days of the week)
  const categories = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Map the data to be used directly in the Highcharts series data
  const chartData = categories.map((day, index) => {
    const dayData = bounceRateData.find(item => item.dayOfWeek === index + 1);
    return dayData ? dayData.bounceRate : 0; // Default to 0 if no data exists for the day
  });

  // Return the data for Highcharts
  return {
    categories,
    seriesData: chartData
  };
};

export default getBounceRateData;
