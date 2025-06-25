import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController";
import userAuth from "../middlewares/authMiddleware";

// router object
const router = express.Router();

// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);
// export
export default router;
