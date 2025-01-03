import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import questionRouter from "./src/route/question.js";
import answerRouter from "./src/route/answer.js";
import userRouter from "./src/route/user.js";
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Bad connection!"));

app.use(questionRouter);
app.use(answerRouter);
app.use(userRouter);

app.use((req, res) => {
  return res.status(404).json("No such endpoint exists!");
});
app.listen(process.env.PORT, () => {
  console.log(`Application started successfully on port: ${process.env.PORT}!`);
});
