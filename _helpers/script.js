import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from '../model/User.js'; // Assuming this file contains the User model
import Session from '../model/session.js'; // Assuming this file contains the Session model
import AnalyticsData from '../model/Anlytics.js'; // Assuming this file contains the AnalyticsData model
import BlogPage from '../model/BlogPage.js'; // Import the BlogPage model
import connect from '../service/DB.js'; // MongoDB connection

dotenv.config({ path: '.env' });

// Connect to MongoDB
connect();

// Function to create fake blog pages
const createFakeBlogPages = async () => {
    try {
        const urls = [];
        for (let i = 0; i < 10; i++) {
            const url = faker.internet.url(); // Generate a random URL
            const occurrences = Math.floor(Math.random() * 5) + 3; // Random number of occurrences (min 3, max 7)
            for (let j = 0; j < occurrences; j++) {
                urls.push({ PageUrl: url });
            }
        }

        // Insert URLs into the database
        await BlogPage.insertMany(urls);
        console.log(`${urls.length} blog page records created successfully`);
    } catch (error) {
        console.error('Error creating fake blog pages:', error);
    }
};

// Main function to generate and insert all fake data
const generateFakeData = async () => {
    try {
        const numUsers = 500; // Number of users to create
        const numSessions = 20000; // Number of sessions to create
        const numAnalytics = 50000; // Number of analytics data to create

        // Create users
        const users = await createFakeUsers(numUsers);

        // Create sessions
        await createFakeSessions(numSessions, users);

        // Create analytics data
        await createFakeAnalyticsData(numAnalytics, users);

        // Create blog pages
        await createFakeBlogPages();

        console.log('Fake data generated successfully!');
    } catch (error) {
        console.error('Error generating fake data:', error);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed after execution
    }
};

// Functions for Users, Sessions, and Analytics (same as original script)

// Function to create fake users
const createFakeUsers = async (numUsers) => {
    let users = [];
    for (let i = 0; i < numUsers; i++) {
        const user = new User({
            UserName: faker.internet.userName(),
            Status: faker.helpers.arrayElement(['Active', 'Inactive']),
        });
        users.push(user);
    }
    const insertedUsers = await User.insertMany(users);
    console.log(`${numUsers} users created successfully`);
    return insertedUsers;
};

// Function to create fake sessions
const createFakeSessions = async (numSessions, users) => {
    let sessions = [];
    for (let i = 0; i < numSessions; i++) {
        const session = new Session({
            SessionID: faker.string.uuid(),
            User: users[Math.floor(Math.random() * users.length)]._id,
            start: faker.date.past(),
            end: faker.date.recent(),
            pageViews: faker.helpers.rangeToNumber({ min: 1, max: 2 }),
        });
        sessions.push(session);
    }
    await Session.insertMany(sessions);
    console.log(`${numSessions} sessions created successfully`);
};

// Function to create fake analytics data
const createFakeAnalyticsData = async (numAnalytics, users) => {
    let analyticsData = [];
    for (let i = 0; i < numAnalytics; i++) {
        const analytics = new AnalyticsData({
            UserName: users[Math.floor(Math.random() * users.length)]._id,
            Source: faker.helpers.arrayElement(['Direct', 'Search', 'Referral']),
            Device: faker.helpers.arrayElement(['Mobile', 'DeskTop', 'Tablet']),
            Age: faker.helpers.rangeToNumber({ min: 18, max: 65 }),
            Session: faker.helpers.rangeToNumber({ min: 1, max: 100 }),
        });
        analyticsData.push(analytics);
    }
    await AnalyticsData.insertMany(analyticsData);
    console.log(`${numAnalytics} analytics records created successfully`);
};

// Run the script
generateFakeData().catch((err) => console.error(err));
