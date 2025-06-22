import { isLength } from "validator";
import userModel from "../models/userModel";

export const registerController = async (req: any, res: any, next: any) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      next("name is required");
      // return res.status(400).send({message: "please provide name"})
    }
    if (!email) {
      next("email is required");
      // return res.status(400).send({message: "please provide email"})
    }
    if (!password) {
      next("password is required and greater than 6 characters");
      // return res.status(400).send({message: "please provide password"})
    }
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(200).send({
        success: false,
        message: "Email already regiter please Login",
      });
    }

    const user: any = await userModel.create({ name, email, password });
    // token
    const token = user.createJWT();
    res.status(201).send({
      succcess: true,
      message: "User is created Successfully",
      user: {
        name: user?.name,
        email: user?.email,
        location: user?.location,
      },
      token,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
    // res.status(400).send({
    //   message: "Error in register controller",
    //   success: false,
    //   error,
    // });
  }
};

export const loginController = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next("please provide all the fields");
  }
  // find user by emails
  let user: any = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid UserName or password");
  }
  // comapare password
  const isMatch = await user?.comparePassword(password);
  if (!isMatch) {
    next("Invalid UserName or Password");
  }
  user.password = undefined;
  const token = user?.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
