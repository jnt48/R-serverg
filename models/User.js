import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'institution', 'employee', 'company'],
      required: true,
    },
    // Common fields
    fullName: { type: String },
    
    // Student-specific
    universityName: { type: String },
    major: { type: String },
    
    // Institution-specific
    institutionName: { type: String },
    website: { type: String },
    contactPerson: { type: String },
    
    // Employee-specific
    currentCompany: { type: String },
    jobTitle: { type: String },
    
    // Company-specific
    companyName: { type: String },
    industry: { type: String },
    hrEmail: { type: String },
  },
  { timestamps: true }
);


export default mongoose.model('User', userSchema);
