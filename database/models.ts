import mongoose from 'mongoose';
import { userSchema, postSchema, commentSchema } from './schemas';
import { IUser, IPost, IComment } from './models.types';

// // Create a model for the Comments Schema
// const Comment =
//   mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);

// // Create a model for Posts
// const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

// // Create a model from the User Schema
// //If the User collection does not exist create a new one.
// const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// // Export all the Models
// export { User, Comment, Post };

// Create a model for the Comments Schema
// const Comment = mongoose.models
//   ? mongoose.models.Comment
//   : mongoose.model<IComment>('Comment', commentSchema);

// // Create a model for Posts
// const Post = mongoose.models
//   ? mongoose.models.Post
//   : mongoose.model<IPost>('Post', postSchema);

// // Create a model from the User Schema
// //If the User collection does not exist create a new one.
// const User = mongoose.models
//   ? mongoose.models.User
//   : mongoose.model<IUser>('User', userSchema);

// // Export all the Models
// export { User, Comment, Post };

// Create a model from the User Schema
//If the User collection does not exist create a new one.
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
