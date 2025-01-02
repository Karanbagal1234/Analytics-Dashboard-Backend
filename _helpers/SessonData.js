import session from '../model/session.js';

function formatDuration(seconds) {
    const units = [
        { label: "y", seconds: 60 * 60 * 24 * 365 }, // Year
        { label: "mo", seconds: 60 * 60 * 24 * 30 }, // Month (approx. 30 days)
        { label: "d", seconds: 60 * 60 * 24 },       // Day
        { label: "h", seconds: 60 * 60 },             // Hour
        { label: "m", seconds: 60 },                  // Minute
        { label: "s", seconds: 1 },                   // Second
    ];

    const result = [];
    for (const unit of units) {
        if (seconds >= unit.seconds) {
            const value = Math.floor(seconds / unit.seconds);
            seconds %= unit.seconds;
            result.push(`${value}${unit.label}`);
        }
    }

    return result.length > 0 ? result.join(" ") : "0s";
}

export const average = async () => {
    let sessionData = await session.aggregate([
        {
            $match: {
                end: { $ne: null }, // Only include sessions where end date is not null
            },
        },
        {
            $project: {
                duration: { $subtract: ['$end', '$start'] }, // Calculate the duration in milliseconds
            },
        },
        {
            $group: {
                _id: null, // Group all sessions together
                averageDuration: { $avg: '$duration' }, // Calculate the average duration
            },
        },
    ]);

    // Handle empty session data case
    if (sessionData.length === 0) {
        return "0s";  // Return "0s" if no data found
    }

    // Convert from milliseconds to seconds before formatting
    const averageDurationInSeconds = sessionData[0].averageDuration / 1000;  // Convert to seconds
    return formatDuration(averageDurationInSeconds);
}

// Calculate the bounce rate
export const bounceRate = async () => {
    const totalSessions = await session.countDocuments();  // Total number of sessions

    // Check if there are any sessions to avoid division by zero
    if (totalSessions === 0) {
        return "0.00";  // If no sessions, return bounce rate as 0.00%
    }

    const bouncedSessions = await session.countDocuments({ pageViews: 1 });  // Sessions with 1 pageView (bounce sessions)
  
    // Calculate and return the bounce rate rounded to two decimal places
    return ((bouncedSessions / totalSessions) * 100).toFixed(2);  // Multiply by 100 to get percentage and format to 2 decimals
}
