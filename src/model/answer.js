import mongoose from "mongoose";
const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answer_text: { type: String, required: true },
  date: { type: Date, required: true },
  like_status: { type: Boolean, required: true },
  gained_likes_number: { type: Number, required: true },
  dislike_status: { type: Boolean, required: true },
  gained_dislikes_number: { type: Number, required: true },
  question_id: { type: String, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  usersWhoLikedTheAnswer: { type: [String], required: true },
});
export default mongoose.model("answer", answerSchema);
