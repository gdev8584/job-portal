import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect(String(process.env.MONGO_URL))
      .then(() => console.log("Connected to mongodb!"));
  } catch (error) {
    console.log(`Mongodb Error ${error}`);
  }
};
