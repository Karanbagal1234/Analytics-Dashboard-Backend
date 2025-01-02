import mongoose from "mongoose";
import Session from '../model/session.js'; // Adjust the import path
import User from '../model/User.js'; // Adjust the import path

const getNewVsReturningData = async () => {
  // Aggregate the session data
  const result = await Session.aggregate([
    {
      // Lookup user data to group by users
      $lookup: {
        from: "users", // User collection
        localField: "User", // The User reference in Session
        foreignField: "_id", // The User _id in the User collection
        as: "userInfo"
      }
    },
    {
      // Unwind the user data from the lookup
      $unwind: "$userInfo"
    },
    {
      // Group by User and count the sessions per user
      $group: {
        _id: "$User", // Group by User (new vs returning will be based on session count)
        sessionCount: { $sum: 1 } // Count how many sessions each user has
      }
    },
    {
      // Categorize as new (1 session) or returning (>1 session)
      $project: {
        userType: {
          $cond: {
            if: { $eq: ["$sessionCount", 1] }, // If 1 session, it's a new user
            then: "New",
            else: "Returning"
          }
        }
      }
    },
    {
      // Group by userType to count the number of new vs returning visitors
      $group: {
        _id: "$userType",
        count: { $sum: 1 } // Count new and returning visitors
      }
    }
  ]);

  // Extract the data in a format compatible with the Highcharts pie chart
  const chartData = result.map(item => ({
    name: item._id,
    y: item.count
  }));

  return chartData;
};

export default getNewVsReturningData;
