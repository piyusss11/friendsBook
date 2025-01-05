export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  friends: string[];
  friendRequests: string[];
}
