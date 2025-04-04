const User = require("../models/user");
const authService = require("../services/authServices");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config();

const forgetUsername = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "r75118106@gmail.com",
      pass: "bcmiawurnnoaxoeg",
    },
  });

  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User not found");
  }
  transporter.sendMail(
    {
      from: "r75118106@gmail.com",
      to: email,
      subject: "Here is your username",
      text: `Hi there, your username is: ${user.userName}`,
    },
    (err, info) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to send email: ", error: err.message });
      }
      res.send("Email sent");
    }
  );
};

const forgetPassword = async (req, res, next) => {
  try {
    console.log("=== FORGOT PASSWORD REQUEST RECEIVED ===");
    console.log("Request body:", req.body);
    console.log("Email from request:", req.body.email);

    // Use hardcoded email credentials that are already working
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "r75118106@gmail.com",
        pass: "bcmiawurnnoaxoeg",
      },
    });

    const { email } = req.body;
    if (!email) {
      console.log("Error: Email is missing in request");
      return res.status(400).json({
        message: "Email is required",
        success: false
      });
    }

    console.log("Looking for user with email:", email);

    // Find user by email (case-insensitive)
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, 'i') }
    });

    if (!user) {
      console.log(`No user found with email: ${email}`);
      return res.status(404).json({
        message: "Email not found",
        success: false
      });
    }

    console.log(`User found: ${user.userName} (${user.email})`);

    // Generate a secure reset token that expires in 1 hour
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Reset token generated:", resetToken);

    // Save the reset token to the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();
    console.log("Reset token saved to user document");

    // Create the reset password URL - HARDCODE to use port 5173
    // This is a direct fix to ensure we're using the correct port
    const frontendUrl = 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(resetToken)}`;

    console.log(`Reset URL: ${resetUrl}`);

    // Send the reset password email
    console.log("Sending reset password email to:", email);
    const mailResult = await transporter.sendMail({
      from: "r75118106@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>If the link doesn't work, copy and paste this URL into your browser:</p>
        <p>${resetUrl}</p>
      `,
    });

    console.log("Email sent successfully:", mailResult);
    console.log("=== FORGOT PASSWORD REQUEST COMPLETED SUCCESSFULLY ===");

    return res.status(200).json({
      message: "Password reset email sent successfully",
      success: true
    });
  } catch (error) {
    console.error("=== ERROR IN FORGOT PASSWORD FUNCTION ===");
    console.error("Error details:", error);
    console.error("Error stack:", error.stack);
    return res.status(500).json({
      message: "Failed to send password reset email",
      success: false,
      error: error.message
    });
  }
};

const resetPassword = async (req, res) => {
  console.log("Reset password request received:", {
    token: req.body.token ? "present" : "missing",
    newPassword: req.body.newPassword ? "present" : "missing"
  });

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    console.error("Missing required fields:", { token: !!token, newPassword: !!newPassword });
    return res.status(400).json({
      success: false,
      message: "Token and new password are required"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully:", { userId: decoded.userId });

    // Find user with this token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.error("No valid user found with token");
      return res.status(404).json({
        success: false,
        message: "Password reset token is invalid or has expired"
      });
    }

    console.log("User found with token:", { userId: user._id, email: user.email });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    console.log("Password updated successfully for user:", user._id);

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully"
    });

  } catch (error) {
    console.error("Error in resetPassword:", error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token"
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: "Reset token has expired"
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred while resetting your password"
    });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userName, password, email } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) {
      return res
        .status(400)
        .json({
          message: "user not found",
          code: 4000
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({
          message: "Invalid password",
          code: 4001
        });
    }
    await user.save();
    const payload = {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        type: "normal",
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 500000000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: "User logged in successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logout = async (req, res, next) => {
  const userId = req.currentUser?.user?.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res
        .status(200)
        .clearCookie("token")
        .json({ message: "User logged out successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { userName, email, password, gender } = req.body;

  try {

    let uemail = await User.findOne({ email });
    let uname = await User.findOne({ userName });
    if (uname) {
      return res.status(400).json({ message: "userName already exists", code: 4002 });
    } else if (uemail) {
      return res.status(400).json({ message: "Email already exists", code: 4003 });
    }

    user = new User({
      userName,
      email,
      password,
      gender,
      registerGoogle: false,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const newUser = await user.save();

    const payload = {
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        type: "normal",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 500000000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: "User registered successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const generateUserName = async (req, res, next) => {
  try {
    const userNames = await authService.generateRandomUsername();
    res.status(200).json({
      message: "Usernames created Successfully",
      usernames: userNames,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Creating usernames", error: err.message });
  }
};

const updatePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.currentUser?.user?.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  res.json({ message: "Password updated successfully" });
};

const updateEmail = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;
  const userId = req.currentUser?.user?.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  user.email = email;
  await user.save();
  res.json({ message: "Email updated successfully" });
};

const changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.currentUser?.user?.id;
  // console.log(userId);

  const { oldPassword, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid old password" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error Changing user Password" });
  }
};

module.exports = {
  register,
  login,
  logout,
  forgetUsername,
  forgetPassword,
  resetPassword,
  generateUserName,
  updatePassword,
  updateEmail,
  changePassword,
};
