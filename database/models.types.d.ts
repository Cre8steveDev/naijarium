import { Schema, Document } from 'mongoose';

// Define the User schema
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  gender: string;
  profile_photo: string;
  posts?: Schema.Types.ObjectId[];
  comments?: Schema.Types.ObjectId[];
  friends?: Schema.Types.ObjectId[];
  likedPosts?: Schema.Types.ObjectId[];
  upvotedPosts?: Schema.Types.ObjectId[];
}

export interface IPost extends Document {
  author: Schema.Types.ObjectId;
  title: string;
  category: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  comments?: Schema.Types.ObjectId[];
  upvotes?: Schema.Types.ObjectId[];
}

export interface IComment extends Document {
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes?: Schema.Types.ObjectId[];
}
