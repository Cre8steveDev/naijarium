import { Schema, Document } from 'mongoose';

// Define the User schema
export interface IUser extends Document {
  _id?: Schema.Types.ObjectId | string;
  username: string;
  email: string;
  password?: string;
  gender?: string;
  profile_photo?: string;
  posts?: Schema.Types.ObjectId[];
  comments?: Schema.Types.ObjectId[];
  friends?: Schema.Types.ObjectId[];
  notifications?: number;
  likedPosts?: Schema.Types.ObjectId[];
  upvotedPosts?: Schema.Types.ObjectId[];
}

export interface IPost extends Document {
  author: Schema.Types.ObjectId;
  author_username: string;
  author_picture: string;
  title: string;
  category: string;
  content: string;
  views: number;
  isFeatured?: boolean;
  isClosed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Schema.Types.ObjectId[];
  upvotes?: Schema.Types.ObjectId[];
}

export interface IComment extends Document {
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  content: string;
  author_username: string;
  author_picture: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: Schema.Types.ObjectId[];
}
