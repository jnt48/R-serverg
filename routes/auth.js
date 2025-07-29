import express from "express";
import {
  registerStudent,
  registerInstitution,
  registerEmployee,
  registerCompany,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// Registration Routes
router.post("/register/student", registerStudent);
router.post("/register/institution", registerInstitution);
router.post("/register/employee", registerEmployee);
router.post("/register/company", registerCompany);

// Login Route
router.post("/login", loginUser);

export default router;
