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

const GET_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    return res.status(200).json({ questions: questions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const DELETE_QUESTION = async (req, res) => {
  try {
    const findOuestion = await QuestionModel.findOne({ id: req.params.id });
    if (req.body.userId !== findOuestion.userId) {
      return res.status(403).json({ message: "Access denied!" });
    }
    const questionToDel = await QuestionModel.findOneAndDelete({
      id: req.params.id,
    });
    if (!questionToDel) {
      return res.status(404).json({ message: "No such question exists!" });
    }
    return res.status(200).json({ message: "Question deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
export { POST_QUESTION, GET_QUESTIONS, DELETE_QUESTION };
