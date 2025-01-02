// Importing necessary modules
import { BlogPageSchema } from "../_helpers/validate.js";
import BlogPage from "../model/BlogPage.js";  // Import the BlogPage model

// Controller to handle blog page registration
const BlogPageRegister = async (req, res, next) => {
    const { PageUrl } = await BlogPageSchema.validateAsync(req.body);  // Destructure PageUrl from the request body

    // Create a new BlogPage instance with the provided PageUrl
    let page = new BlogPage({
        PageUrl
    });

    // Save the new page data to the database

        await page.save();  // Save the page data to the database
        res.json({ message: "Page data stored successfully", page });  // Send success response
  
};

export default BlogPageRegister;
