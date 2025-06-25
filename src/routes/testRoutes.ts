import express, { Request, Response, NextFunction} from "express";
import userAuth from "../middlewares/authMiddleware";

// router object
const router = express.Router();


// dashboard || POST
router.post("/dashboard", userAuth, (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to my dashboard page"
    })
});
// export
export default router;
