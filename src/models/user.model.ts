import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
