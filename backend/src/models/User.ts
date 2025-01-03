import mongoose, { Document, Schema } from "mongoose";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  friends: Schema.Types.ObjectId[];
  friendRequests: Schema.Types.ObjectId[];
}
const userschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
export default mongoose.model<IUser>("User", userschema);
