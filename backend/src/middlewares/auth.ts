import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedId = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const { id } = decodedId;
    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({ message: "Invalid user, please login again" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong in verfying you", error });
  }
};
