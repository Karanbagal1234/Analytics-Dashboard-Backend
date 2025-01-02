import Anlytics from "../model/Anlytics.js";

// Function to fetch and process the analytics data by day of the week
const DaySortArray = async () => {
  const data = await Anlytics.aggregate([
    {
      $project: {
        dayOfWeek: { $dayOfWeek: "$createdAt" }, // Extract the day of the week (1 = Sunday, 7 = Saturday)
      },
    },
    {
      $group: {
        _id: "$dayOfWeek", // Group by the day of the week
        count: { $sum: 1 }, // Count occurrences for each day of the week
      },
    },
    {
      $sort: { _id: 1 }, // Sort by day of the week (1 to 7: Sunday to Saturday)
    },
    {
      $project: {
        dayOfWeek: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $group: {
        _id: null,
        days: { $push: { dayOfWeek: "$dayOfWeek", count: "$count" } }, // Push the counts into an array
      },
    },
    {
      $project: {
        days: {
          $map: {
            input: [1, 2, 3, 4, 5, 6, 7], // Represent days of the week (Mon-Sun)
            as: "day",
            in: {
              $let: {
                vars: {
                  dayData: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$days",
                          cond: { $eq: ["$$this.dayOfWeek", "$$day"] },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: {
                  $ifNull: ["$$dayData.count", 0], // Default to 0 if no data exists
                },
              },
            },
          },
        },
      },
    },
  ]);


  return data[0]?.days || [];
};

export default DaySortArray;
