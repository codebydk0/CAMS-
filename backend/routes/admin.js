const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const db = require("../config/db");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

// Create a new student account (Admin only)
router.post(
  "/students",
  requireAuth,
  requireRole("Admin"),
  async (req, res) => {
    try {
      const { name, email, phone } = req.body;

      // Validate required fields
      if (!name?.trim() || !email?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Student name and college email are required.",
        });
      }

      const studentName = name.trim();
      const studentEmail = email.trim().toLowerCase();

      // Allow only college email addresses
      if (!/^[^\s@]+@(mitmeerut\.ac\.in|gmail\.com)$/i.test(studentEmail)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid college email or Gmail address.",
        });
      }

      // Validate name length
      if (studentName.length > 100) {
        return res.status(400).json({
          success: false,
          message: "Student name must be within 100 characters.",
        });
      }

      // Validate optional phone number
      const studentPhone = phone?.trim() || null;

      if (
        studentPhone &&
        (studentPhone.length > 20 || !/^[0-9+\-\s()]+$/.test(studentPhone))
      ) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid phone number.",
        });
      }

      // Check whether this email is already registered
      const [existingUsers] = await db.execute(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [studentEmail],
      );

      if (existingUsers.length > 0) {
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }

      // Generate a temporary password
      const temporaryPassword = crypto.randomBytes(12).toString("base64url");

      // Store only its bcrypt hash
      const passwordHash = await bcrypt.hash(temporaryPassword, 12);

      // Create the student account
      await db.execute(
        `INSERT INTO users
          (name, email, password_hash, role, first_login, is_active, phone)
         VALUES (?, ?, ?, 'Student', 1, 1, ?)`,
        [studentName, studentEmail, passwordHash, studentPhone],
      );

      return res.status(201).json({
        success: true,
        message: "Student account created successfully.",
        student: {
          name: studentName,
          email: studentEmail,
          role: "Student",
          firstLogin: true,
        },
        temporaryPassword,
        note: "Show this temporary password only to the intended student through a secure channel. The student must change it after the first login.",
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "This email or phone number is already registered.",
        });
      }

      console.error("Create student error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to create the student account.",
      });
    }
  },
);

module.exports = router;
