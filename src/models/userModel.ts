import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  createJWT(): string;
  comparePassword(userPassword: string): Promise<boolean>;
}

// schema
const userSchema = new Schema<IUser>(
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
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

// middleware mongoose
userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// mangoose custome middleware
userSchema.methods.createJWT = function (): string {
  return JWT.sign({ userId: this._id }, String(process.env.JWT_SECRET), {
    expiresIn: "1d",
  });
};
userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default mongoose.model<IUser>("User", userSchema);
