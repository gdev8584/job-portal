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

    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      succcess: true,
      message: "User is created Successfully",
      user,
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
