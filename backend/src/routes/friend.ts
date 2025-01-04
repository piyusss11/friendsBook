import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
import User from "../models/User";
const friendRouter = express.Router();
friendRouter.post(
  "/addfriend/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const friendId = req.params.id;
      const user = req.user;
      const friend = await User.findById(friendId);
      if (user._id.toString() === friendId) {
        res
          .status(400)
          .json({ message: "You cannot add yourself as a friend" });
        return;
      }
      if (!friend) {
        res.status(404).json({ message: "Friend not found" });
        return;
      }
      // checking if the logged in user is already friends with the friendId
      if (user?.friends.includes(friendId)) {
        res.status(400).json({ message: "You are already friends" });
        return;
      }
      // checking if the logged in user has already sent a friend request to the friendId
      if (friend.friendRequests.includes(user._id)) {
        res.status(400).json({ message: "Friend request already sent" });
        return;
      }
      // checking if the logged in user has already received a friend request from the friendId
      if (user?.friendRequests.includes(friendId)) {
        res
          .status(400)
          .json({
            message: "The friend has already sent you a friend request",
          });
        return;
      }
      friend.friendRequests.push(user._id);
      await friend.save();
      res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong while adding friend" });
    }
  }
);
friendRouter.delete(
  "/removefriend/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const friendId = req.params.id;
      const friend = await User.findById(friendId);
      if (!friend) {
        res.status(404).json({ message: "Friend not found" });
        return;
      }
      if (!user.friends.includes(friendId)) {
        res.status(400).json({ message: "You are not friends with this user" });
        return;
      }
      // removing the friend from the logged in user's friends list and friend's friends list
      friend.friends = friend.friends.filter(
        (id) => id.toString() !== user._id.toString()
      );
      await friend.save();
      user.friends.pull(friendId);
      await user.save();
      res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong while removing friend" });
    }
  }
);
friendRouter.get(
  "/myfriends",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const myFriends = user?.friends;
      res.status(200).json({ myFriends });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong while getting your friends" });
    }
  }
);
export default friendRouter;
