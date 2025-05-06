import mongoose, { Document, Model, Schema } from "mongoose";

//Password optional due to OAuth
interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  id: string;
  createdAt: Date;
  course?: string;
  year?: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  course: {
    type: String,
    default: "Not specified",
  },
  year: {
    type: String,
    default: "Not specified",
  },
});
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
