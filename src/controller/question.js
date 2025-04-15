/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";

const POST_QUESTION = async (req, res) => {
  try {
    const newQuestion = {
      id: uuidv4(),
      question_text: req.body.question_text.trim(),
      title: req.body.title.trim(),
      date: new Date(),
      user_id: req.body.userId,
      email: req.body.userEmail,
      name: req.body.userName,
      answers: 0,
    };
    const question = new QuestionModel(newQuestion);
    const response = await question.save();
    return res.status(201).json({
      message: "Question added successfully!",
      question: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const GET_QUESTIONS = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const questionsPerPage = req.query.q || 5;
    const sortBy = req.query.sortVal || "All";
    const questionAmmount = await QuestionModel.countDocuments();

    let query = {};
    if (sortBy == "Answered") {
      query = { answers: { $gte: 1 } };
    } else if (sortBy == "Unanswered") {
      query = { answers: 0 };
    }

    const questions = await QuestionModel.find(query)
      .sort({ date: -1 })
      .skip(page * questionsPerPage)
      .limit(questionsPerPage);
    return res
      .status(200)
      .json({ questions: questions, questionAmmount: questionAmmount });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const GET_QUESTION = async (req, res) => {
  try {
    const question = await QuestionModel.findOne({ id: req.params.id });
    if (!question) {
      return res.status(404).json({ message: "Such question doesnt exist!" });
    }
    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const DELETE_QUESTION = async (req, res) => {
  try {
    const findOuestion = await QuestionModel.findOne({ id: req.params.id });
    if (!findOuestion) {
      return res.status(404).json({ message: "No such question exists!" });
    }
    if (req.body.userId !== findOuestion.user_id) {
      return res.status(403).json({ message: "Access denied!" });
    }
    const questionToDel = await QuestionModel.findOneAndDelete({
      id: req.params.id,
    });
    return res.status(200).json({ message: "Question deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const UPDATE_QUESTION = async (req, res) => {
  const findQuestion = await QuestionModel.findOne({ id: req.params.id });
  if (!findQuestion) {
    return res.status(404).json({ message: "No such question exists!" });
  }
  const updatedQuestion = await QuestionModel.findOneAndUpdate(
    { id: req.params.id },
    { ...req.body },
    { new: true }
  );
  return res.status(200).json({
    message: "Question updated successfully!",
    updatedQuestion: updatedQuestion,
  });
};
export {
  POST_QUESTION,
  GET_QUESTIONS,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  GET_QUESTION,
};
