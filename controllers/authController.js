import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Institution from "../models/Institution.js";
import Employee from "../models/Employee.js";
import Company from "../models/Company.js";

const generateToken = (id, role) =>
  jwt.sign({ userId: id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ---------------- STUDENT ----------------
export const registerStudent = async (req, res) => {
  try {
    const { fullName, university, major, email, password } = req.body;
    if (await Student.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await new Student({ fullName, university, major, email, password: hashedPassword }).save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Student Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- INSTITUTION ----------------
export const registerInstitution = async (req, res) => {
  try {
    const { institutionName, website, contactPerson, email, password } = req.body;
    if (await Institution.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await new Institution({ institutionName, website, contactPerson, email, password: hashedPassword }).save();

    res.status(201).json({ message: "Institution registered successfully" });
  } catch (error) {
    console.error("Institution Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- EMPLOYEE ----------------
export const registerEmployee = async (req, res) => {
  try {
    const { fullName, currentCompany, jobTitle, email, password } = req.body;
    if (await Employee.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await new Employee({ fullName, currentCompany, jobTitle, email, password: hashedPassword }).save();

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Employee Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- COMPANY ----------------
export const registerCompany = async (req, res) => {
  try {
    const { companyName, industry, hrEmail, password } = req.body;
    if (await Company.findOne({ hrEmail }))
      return res.status(400).json({ message: "HR Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await new Company({ companyName, industry, hrEmail, password: hashedPassword }).save();

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Company Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Student.findOne({ email });
    let role = user ? "student" : null;

    if (!user) { user = await Institution.findOne({ email }); role = user ? "institution" : role; }
    if (!user) { user = await Employee.findOne({ email }); role = user ? "employee" : role; }
    if (!user) { user = await Company.findOne({ hrEmail: email }); role = user ? "company" : role; }

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, role);
    res.json({ token, user: { id: user._id, role, email: user.email || user.hrEmail } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
