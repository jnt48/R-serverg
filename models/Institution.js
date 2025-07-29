import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  institutionName: { type: String, required: true },
  website: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Institution", institutionSchema);
