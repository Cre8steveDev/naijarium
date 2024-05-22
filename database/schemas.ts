import mongoose, { Schema, Document } from 'mongoose';

// Define the User schema
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile_photo: string;
  posts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  likedPosts: Schema.Types.ObjectId[];
  upvotedPosts: Schema.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  upvotedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
