import mongoose from "mongoose";
const questionSchema = mongoose.Schema({
  id: { type: String, required: true },
  question_text: { type: String, required: true },
  date: { type: Date, required: true },
  user_id: { type: String, required: true },
});
export default mongoose.model("question", questionSchema);
