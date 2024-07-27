import mongoose, { Schema } from 'mongoose';

// Define the Comments Schema
export const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    author_username: String,
    author_picture: String,
    content: { type: String, required: true, trim: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// Define the Posts Schema
export const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, trim: true },
    author_username: { type: String, trim: true },
    author_picture: { type: String, trim: true },
    category: { type: String, required: true, trim: true },
    post_picture1: String,
    post_picture2: String,
    isFeatured: { type: Boolean, default: false },
    isClosed: { type: Boolean, default: false },
    content: { type: String, required: true, trim: true },
    views: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// Define the User schema
export const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    profile_photo: { type: String, default: '/images/profile-icon.jpg' },
    isSuspended: { type: Boolean, default: false },
    suspensionTimeExpiration: { type: Date, default: Date.now },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    upvotedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    // likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);
