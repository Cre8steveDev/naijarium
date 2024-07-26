import mongoose from 'mongoose';
import { userSchema, postSchema, commentSchema } from './schemas';
import { IUser, IPost, IComment } from './models.types';

const User = mongoose.models?.User
  ? mongoose.models.User
  : mongoose.model<IUser>('User', userSchema);

// Create a model for Posts
const Post = mongoose.models?.Post
  ? mongoose.models.Post
  : mongoose.model<IPost>('Post', postSchema);

const Comment = mongoose.models?.Comment
  ? mongoose.models.Comment
  : mongoose.model<IComment>('Comment', commentSchema);

// Export all the Models
export { User, Comment, Post };
