import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: String, required: true },
});
export default mongoose.model("user", userSchema);
