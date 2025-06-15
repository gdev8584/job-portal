import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "./config/db";
import authRouter from "./src/routes/authRoutes";
import errorMiddelware from "./src/middlewares/errorMiddleware";
import cors from "cors";

dotenv.config(); // config dotenv
const app = express();
const port = process.env.PORT;

// connectDB to mongodb
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRouter);

// add validation middelware
app.use(errorMiddelware);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to JOB PORTAL</h1>");
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
