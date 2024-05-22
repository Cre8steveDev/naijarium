import mongoose, { Schema } from 'mongoose';

// Define the Comments Schema
export const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
  content: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Define the Posts Schema
export const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Define the User schema
export const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  profile_photo: { type: String, default: '/images/profile.png' },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  upvotedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});
