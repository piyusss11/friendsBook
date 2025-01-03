import { IUser } from "./schema";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
