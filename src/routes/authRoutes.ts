import express from "express";
import { registerController } from "../controllers/authController";

// router object
const router = express.Router();

router.post("/register", registerController);

// export
export default router;
