import mongoose from "mongoose";
import User from './User.js'

const SessionSchema = new mongoose.Schema({
  SessionID: {
    type: String,
    required: true,
    unique: true
  },
  User: {
    type: mongoose.Types.ObjectId,
    ref: 'User'  // References the 'User' collection
  },
  start: {
    type: Date,
    default: Date.now()
  },
  end: {
    type: Date,
  },
  pageViews: { // Add a field to count page views during the session
    type: Number,
    default: 1, // Initialize to 1 since a new session means at least 1 page is viewed
  }
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt automatically

const Session = mongoose.model('Sessions', SessionSchema);

export default Session;
