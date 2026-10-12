const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db = require("../config/db");
const { sendPasswordResetOTP } = require("../utils/mailer");

const router = express.Router();

const ALLOWED_ROLES = ["Student", "Faculty", "Admin"];

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    message,
  });
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function validatePasswordInput(newPassword, confirmPassword) {
  if (!newPassword || !confirmPassword) {
    return "Please enter and confirm your new password.";
  }

  if (newPassword.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (newPassword !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null;
}

function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return sendError(res, 401, "Please log in first.");
  }

  next();
}

// =====================================================
// 1. LOGIN
// POST /api/auth/login
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");
    const role = String(req.body.role || "").trim();

    if (!email || !password || !role) {
      return sendError(
        res,
        400,
        "Please enter email, password and select your role.",
      );
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return sendError(res, 400, "Invalid account role.");
    }

    const [users] = await db.query(
      `SELECT
          id,
          name,
          email,
          password_hash,
          role,
          first_login,
          is_active,
          DATE_FORMAT(dob, '%d-%m-%Y') AS dob_formatted
       FROM users
       WHERE LOWER(email) = ?
       LIMIT 1`,
      [email],
    );

    if (users.length === 0) {
      return sendError(res, 401, "Invalid email or password.");
    }

    const user = users[0];

    if (!user.is_active) {
      return sendError(
        res,
        403,
        "Your account is inactive. Please contact the administrator.",
      );
    }

    if (user.role !== role) {
      return sendError(res, 401, "Invalid email or password.");
    }

    let passwordMatch = false;

    // First login for Student and Faculty: DOB in DDMMYYYY format
    if (
      (user.role === "Student" || user.role === "Faculty") &&
      Boolean(user.first_login)
    ) {
      const enteredDOB = password.trim();

      const storedDOB = user.dob_formatted
        ? user.dob_formatted.replace(/-/g, "")
        : "";

      passwordMatch =
        /^\d{8}$/.test(enteredDOB) &&
        Boolean(storedDOB) &&
        enteredDOB === storedDOB;
    } else if (user.password_hash) {
      // Admin and subsequent logins use the saved password hash
      passwordMatch = await bcrypt.compare(password, user.password_hash);
    }

    if (!passwordMatch) {
      return sendError(res, 401, "Invalid email or password.");
    }

    // Create a fresh session after successful authentication
    req.session.regenerate((sessionError) => {
      if (sessionError) {
        console.error("Session regeneration error:", sessionError.message);

        return sendError(
          res,
          500,
          "Unable to create login session. Please try again.",
        );
      }

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        firstLogin: Boolean(user.first_login),
      };

      req.session.save((saveError) => {
        if (saveError) {
          console.error("Session save error:", saveError.message);

          return sendError(
            res,
            500,
            "Unable to save login session. Please try again.",
          );
        }

        return res.status(200).json({
          success: true,
          message: "Login successful.",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            firstLogin: Boolean(user.first_login),
          },
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error);

    return sendError(res, 500, "Internal server error.");
  }
});

// =====================================================
// 2. CHANGE PASSWORD
// POST /api/auth/change-password
// =====================================================

router.post("/change-password", requireLogin, async (req, res) => {
  try {
    const newPassword = String(req.body.newPassword || "");
    const confirmPassword = String(req.body.confirmPassword || "");

    const validationError = validatePasswordInput(newPassword, confirmPassword);

    if (validationError) {
      return sendError(res, 400, validationError);
    }

    const sessionUser = req.session.user;

    if (!sessionUser.firstLogin) {
      return sendError(
        res,
        403,
        "Password change is not required for this account.",
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    const [result] = await db.query(
      `UPDATE users
       SET password_hash = ?, first_login = 0
       WHERE id = ? AND is_active = 1`,
      [passwordHash, sessionUser.id],
    );

    if (result.affectedRows !== 1) {
      return sendError(
        res,
        400,
        "Unable to update password. Please contact the administrator.",
      );
    }

    req.session.user.firstLogin = false;

    req.session.save((error) => {
      if (error) {
        console.error("Session save error:", error.message);

        return sendError(
          res,
          500,
          "Password changed, but session update failed. Please log in again.",
        );
      }

      return res.status(200).json({
        success: true,
        message: "Password changed successfully.",
        firstLogin: false,
      });
    });
  } catch (error) {
    console.error("Change password error:", error);

    return sendError(res, 500, "Internal server error.");
  }
});

// =====================================================
// 3. CHECK FIRST LOGIN
// GET /api/auth/check-first-login
// =====================================================

router.get("/check-first-login", requireLogin, (req, res) => {
  return res.status(200).json({
    success: true,
    firstLogin: Boolean(req.session.user.firstLogin),
  });
});

// =====================================================
// 4. GET LOGGED-IN USER
// GET /api/auth/me
// =====================================================

router.get("/me", requireLogin, async (req, res) => {
  try {
    const sessionUser = req.session.user;

    const [users] = await db.query(
      `SELECT id, name, email, role, first_login, is_active
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [sessionUser.id],
    );

    if (users.length === 0 || !users[0].is_active) {
      return req.session.destroy(() => {
        return sendError(res, 401, "Account not found or inactive.");
      });
    }

    const user = users[0];

    // Do not trust an outdated role stored in the session
    if (!ALLOWED_ROLES.includes(user.role)) {
      return sendError(res, 403, "Invalid account role.");
    }

    req.session.user.name = user.name;
    req.session.user.email = user.email;
    req.session.user.role = user.role;
    req.session.user.firstLogin = Boolean(user.first_login);

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        firstLogin: Boolean(user.first_login),
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return sendError(res, 500, "Internal server error.");
  }
});

// =====================================================
// 5. LOGOUT
// POST /api/auth/logout
// =====================================================

router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  }

  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error.message);

      return sendError(res, 500, "Unable to log out. Please try again.");
    }

    res.clearCookie("cams.sid", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  });
});

// =====================================================
// 6. FORGOT PASSWORD — SEND OTP
// POST /api/auth/forgot-password
// =====================================================

router.post("/forgot-password", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return sendError(res, 400, "Please enter your registered email.");
    }

    const [users] = await db.query(
      `SELECT id, email, name
       FROM users
       WHERE LOWER(email) = ? AND is_active = 1
       LIMIT 1`,
      [email],
    );

    // Do not reveal whether the email is registered
    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message:
          "If this email is registered, a password reset OTP will be sent.",
      });
    }

    const user = users[0];

    // Generate a six-digit OTP
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    // Invalidate previous unused OTPs for this user
    await db.query(
      `UPDATE password_reset_otps
       SET used = 1
       WHERE user_id = ? AND used = 0`,
      [user.id],
    );

    // Insert OTP using user_id, matching your database schema
    await db.query(
      `INSERT INTO password_reset_otps
         (user_id, otp_hash, expires_at, attempts, used)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE), 0, 0)`,
      [user.id, otpHash],
    );

    try {
      await sendPasswordResetOTP(user.email, otp);
    } catch (mailError) {
      console.error("OTP email error:", mailError);

      // Invalidate unused OTPs if email delivery fails
      await db.query(
        `UPDATE password_reset_otps
         SET used = 1
         WHERE user_id = ? AND used = 0`,
        [user.id],
      );

      return sendError(res, 500, "Unable to send OTP. Please try again later.");
    }

    return res.status(200).json({
      success: true,
      message:
        "If this email is registered, a password reset OTP will be sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return sendError(res, 500, "Internal server error.");
  }
});

// =====================================================
// 7. RESET PASSWORD
// POST /api/auth/reset-password
// =====================================================

router.post("/reset-password", async (req, res) => {
  let connection;

  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();
    const newPassword = String(req.body.newPassword || "");
    const confirmPassword = String(req.body.confirmPassword || "");

    if (!email || !otp || !newPassword || !confirmPassword) {
      return sendError(res, 400, "Please fill in all required fields.");
    }

    if (!/^\d{6}$/.test(otp)) {
      return sendError(res, 400, "Please enter a valid six-digit OTP.");
    }

    const validationError = validatePasswordInput(newPassword, confirmPassword);

    if (validationError) {
      return sendError(res, 400, validationError);
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    // Find account using the email entered by the user
    const [users] = await connection.query(
      `SELECT id
       FROM users
       WHERE LOWER(email) = ? AND is_active = 1
       LIMIT 1`,
      [email],
    );

    if (users.length === 0) {
      await connection.rollback();

      return sendError(
        res,
        400,
        "OTP is invalid or expired. Please request a new OTP.",
      );
    }

    const userId = users[0].id;

    // OTP table is linked through user_id, not email
    const [otpRows] = await connection.query(
      `SELECT id, otp_hash, expires_at, attempts, used
       FROM password_reset_otps
       WHERE user_id = ? AND used = 0
       ORDER BY id DESC
       LIMIT 1
       FOR UPDATE`,
      [userId],
    );

    if (otpRows.length === 0) {
      await connection.rollback();

      return sendError(
        res,
        400,
        "OTP is invalid or expired. Please request a new OTP.",
      );
    }

    const otpRecord = otpRows[0];

    if (
      Number(otpRecord.attempts) >= 5 ||
      new Date(otpRecord.expires_at).getTime() <= Date.now()
    ) {
      await connection.query(
        `UPDATE password_reset_otps
         SET used = 1
         WHERE id = ?`,
        [otpRecord.id],
      );

      await connection.commit();

      return sendError(
        res,
        400,
        "OTP is invalid or expired. Please request a new OTP.",
      );
    }

    const otpMatches = await bcrypt.compare(otp, otpRecord.otp_hash);

    if (!otpMatches) {
      const nextAttempts = Number(otpRecord.attempts) + 1;

      await connection.query(
        `UPDATE password_reset_otps
         SET attempts = ?, used = ?
         WHERE id = ?`,
        [nextAttempts, nextAttempts >= 5 ? 1 : 0, otpRecord.id],
      );

      await connection.commit();

      return sendError(
        res,
        400,
        nextAttempts >= 5
          ? "Too many incorrect OTP attempts. Please request a new OTP."
          : "Incorrect OTP. Please try again.",
      );
    }

    // Save the new password as a bcrypt hash
    const passwordHash = await bcrypt.hash(newPassword, 12);

    await connection.query(
      `UPDATE users
       SET password_hash = ?, first_login = 0
       WHERE id = ? AND is_active = 1`,
      [passwordHash, userId],
    );

    // Invalidate all unused OTPs for this user
    await connection.query(
      `UPDATE password_reset_otps
       SET used = 1
       WHERE user_id = ? AND used = 0`,
      [userId],
    );

    await connection.commit();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Transaction rollback error:", rollbackError.message);
      }
    }

    console.error("Reset password error:", error);

    return sendError(res, 500, "Internal server error.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;
