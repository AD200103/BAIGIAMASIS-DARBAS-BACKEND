import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../model/answer.js";
import updateLikeDislike from "../utils/updateLikesDislikes.js";
const POST_ANSWER = async (req, res) => {
  try {
    const newAnswer = {
      id: uuidv4(),
      answer_text: req.body.answer_text.trim(),
      date: new Date(),
      question_id: req.params.id,
      userId: req.body.userId,
      email: req.body.userEmail,
      name: req.body.userName,
      pressed: "default",
      usersWhoLikedTheAnswer: [],
      usersWhoDislikedTheAnswer: [],
    };
    const answer = new AnswerModel(newAnswer);
    const response = await answer.save();
    return res
      .status(201)
      .json({ message: "Answer was posted successfully!", answer: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
const GET_ANSWERS = async (req, res) => {
  try {
    const answers = await AnswerModel.find({ question_id: req.params.id });
    return res.status(200).json({ answers: answers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
const DELETE_ANSWER = async (req, res) => {
  try {
    const findAnswer = await AnswerModel.findOne({ id: req.params.id });
    if (!findAnswer) {
      return res.status(404).json({ message: "No such answer exists!" });
    }
    if (req.body.userId !== findAnswer.userId) {
      return res.status(403).json({ message: "Access denied!" });
    }
    await AnswerModel.findOneAndDelete({
      id: req.params.id,
    });
    return res.status(200).json({ message: "Answer deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const UPDATE_ANSWER = async (req, res) => {
  try {
    const findAnswerToUpdate = await AnswerModel.findOne({ id: req.params.id });
    const body = updateLikeDislike(req, findAnswerToUpdate);
    const updateAnswer = await AnswerModel.findOneAndUpdate(
      { id: req.params.id },
      { ...body },
      { new: true }
    );

    if (!updateAnswer) {
      return res.status(404).json({ message: "No such answer exists!" });
    }
    return res
      .status(200)
      .json({ message: "Updated successfully!", answer: updateAnswer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { POST_ANSWER, GET_ANSWERS, DELETE_ANSWER, UPDATE_ANSWER };
