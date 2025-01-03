import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("Bad connection!"));

app.use((req, res) => {
  return res.status(404).json("No such endpoint exists!");
});
app.listen(process.env.PORT, () => {
  console.log(`Application started successfully on port: ${process.env.PORT}!`);
});
