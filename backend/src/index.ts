import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnection } from "./config/dbConnection";
import authRouter from "./routes/auth";
import friendRouter from "./routes/friend";
import requestRouter from "./routes/request";
import searchUserRouter from "./routes/searchUser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const Port = process.env.PORT;

dbConnection()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/friend", friendRouter);
app.use("/api/v1/search", searchUserRouter);
