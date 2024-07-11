import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  // id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      // hook to remove password field from the JSON object sent in response
      transform: function (doc, user) {
        delete user.password;
        delete user.__v;
        return user;
      },
    },
  }
);

export const User = mongoose.model<IUser>('User', userSchema);
