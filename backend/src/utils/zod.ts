import { z } from "zod";
import { IUser } from "../models/User";

const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, "username must be at least 3 characters long")
    .max(20, "username must be atmost 20 characters long"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password must be at least 8 characters long")
    .max(20, "password must be atmost 20 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

export const validateUser = (data: IUser) => {
  return registerUserSchema.parse(data);
};
