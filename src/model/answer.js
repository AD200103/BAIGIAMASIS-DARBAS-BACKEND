import mongoose from "mongoose";
const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answer_text: { type: String, required: true },
  date: { type: Date, required: true },
  question_id: { type: String, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  usersWhoLikedTheAnswer: { type: [String], required: true },
  usersWhoDislikedTheAnswer: { type: [String], required: true },
});
export default mongoose.model("answer", answerSchema);
