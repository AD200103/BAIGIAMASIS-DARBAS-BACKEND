import mongoose from "mongoose";
const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answer_text: { type: String, required: true },
  date: { type: Date, required: true },
  gained_likes_number: { type: Number, required: true },
  question_id: { type: String, required: true },
});
export default mongoose.model("answer", answerSchema);
