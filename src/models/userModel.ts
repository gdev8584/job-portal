import { AnyARecord } from "dns";
import mongoose from "mongoose";
import validator from "validator";

// schema

const userSchema: any = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
      minlength: [7, "Password must be more than 6 characters"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
