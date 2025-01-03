import express from "express";
const router = express.Router();
import {
  POST_QUESTION,
  GET_QUESTIONS,
  DELETE_QUESTION,
} from "../controller/question.js";
import auth from "../utils/authorization.js";

router.post("/question", auth, POST_QUESTION);
router.get("/questions", GET_QUESTIONS);
router.delete("/question/:id", auth, DELETE_QUESTION);
export default router;
