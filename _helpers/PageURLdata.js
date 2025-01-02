import BlogPage from '../model/BlogPage.js'

const PageData = async () => {
  return await BlogPage.aggregate([
    {
      $group: {
        _id: "$PageUrl", // Group by the PageUrl field
        count: { $sum: 1 }, // Count the occurrences of each unique PageUrl
      },
    },
    {
      $project: {
        _id: 0, // Exclude the default _id field
        PageUrl: "$_id", // Rename _id to PageUrl
        count: 1, // Include the count field
      },
    },
  ]);
};

export default  PageData;