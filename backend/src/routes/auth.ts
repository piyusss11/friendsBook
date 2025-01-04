import express, { Response, Request } from "express";
import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { validateUser } from "../utils/zod";

const authRouter = express.Router();
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const validatedData = validateUser(req.body);
    // if(!validatedData.success){
    //   res.status(400).json({message: validatedData.error});
    //   return
    // }
    const { username, email, password } = validatedData;
    const alreadyUser = await User.findOne({ $or: [{ username }, { email }] });
    if (alreadyUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hasedPassword = await bcyrpt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hasedPassword,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while creating a User", error });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const validatedData = validateUser(req.body);
    const { username, password } = validatedData;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordCorrect = await bcyrpt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while logging in", error });
  }
});
export default authRouter;
