import Analytics from "../model/Anlytics.js"; // Ensure the model name matches

const Device = async () => {
  const data = await Analytics.aggregate([
    {
      $group: {
        _id: "$Device",  // Group by the Source field
        count: { $sum: 1 } // Count occurrences for each Source
      }
    },
    {
      $project: {
        name: "$_id", // Rename _id to name
        y: "$count",  // Rename count to y
        _id: 0 // Exclude the _id field from the result
      }
    },
    {
      $sort: { y: -1 } // Optionally, you can sort the results by count (y) in descending order
    }
  ]);

  // Return the formatted data as required
  return data;
};

export default Device;
