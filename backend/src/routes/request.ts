import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import User from "../models/User";
const requestRouter = express.Router();
requestRouter.get(
  "/myrequest",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const myRequests = user?.friendRequests;
    //   if (myRequests.length === 0) {
    //     res.status(200).json({ message: "You have no friend requests" });
    //     return;
    //   }
      res.status(200).json({ message: "Your friend requests", myRequests });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong while getting your friend requests",
      });
    }
  }
);
requestRouter.post(
  "/:status/:id",
  authMiddleware,
  async(req: Request, res: Response) => {
    try {
      const user = req.user;
      const friendId = req.params.id;
      const status = req.params.status;
      if (!friendId) {
        res.status(400).json({ message: "Invalid friend id" });
        return;
      }
      if (status !== "accept" && status !== "reject") {
        res.status(400).json({ message: "Invalid status" });
        return;
      }
      const isRequestValid = user?.friendRequests.includes(friendId);
      if (!isRequestValid) {
        res.status(400).json({ message: "Invalid friend request" });
        return;
      }
      if (status === "accept") {
        const myFriend = await User.findById(friendId);
        user?.friendRequests.pull(friendId);
        user?.friends.push(friendId);
        myFriend?.friends.push(user._id);
        myFriend?.save();
        user?.save();
        res.status(200).json({ message: "Friend request accepted" });
      }
      if (status === "reject") {
        user?.friendRequests.pull(friendId);
        user?.save();
        res.status(200).json({ message: "Friend request rejected" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            "Something went wrong while accepting/rejecting friend request",
        });
    }
  }
);
export default requestRouter;
