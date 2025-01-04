import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import User from "../models/User";
const searchUserRouter = express.Router();

searchUserRouter.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      const user = req.user;
      const users = await User.find({
        username: new RegExp(query as string, "i"),
      }) // regex for case insensitive
        .select("username _id");

      const filteredUsers = users.filter(
        (u) => u._id.toString() !== user._id.toString()
      );
      res.json(filteredUsers);
    } catch (error) {
      res.status(500).json({ message: "Error searching users" });
    }
  }
);
searchUserRouter.get("/recommendations",authMiddleware, async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
})
export default searchUserRouter;
