import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";

const POST_QUESTION = async (req, res) => {
  try {
    const newQuestion = {
      id: uuidv4(),
      question_text: req.body.question,
      date: new Date(),
      user_id: req.body.userId,
    };
    console.log(newQuestion);
    const question = new QuestionModel(newQuestion);
    const response = question.save();
    const questionAdded = await response;
    return res.status(201).json({
      message: "Question added successfully!",
      question: questionAdded,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
export { POST_QUESTION };
