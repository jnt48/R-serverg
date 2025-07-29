import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  currentCompany: { type: String, required: true },
  jobTitle: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
