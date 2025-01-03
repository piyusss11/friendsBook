import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnection } from "./config/dbConnection";
import authRouter from "./routes/auth";

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
