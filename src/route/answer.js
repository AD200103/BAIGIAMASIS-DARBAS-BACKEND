import express from "express";
const router = express.Router();
import {
  POST_ANSWER,
  GET_ANSWERS,
  DELETE_ANSWER,
} from "../controller/answer.js";
import auth from "../utils/authorization.js";
router.post("/question/:id/answers", auth, POST_ANSWER);
router.get("/question/:id/answers", GET_ANSWERS);
router.delete("/answer/:id", auth, DELETE_ANSWER);
export default router;
