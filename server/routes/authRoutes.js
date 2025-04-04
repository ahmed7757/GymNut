const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");
const { checkUserName, checkEmail, checkPassword, checkGender, checkEmailOrUserName } = require("../middleware/registerAuthentication");

// Test route to verify the router is working
router.get("/test", (req, res) => {
  console.log("Test route accessed");
  res.json({ message: "Auth routes are working!" });
});

// Password reset routes
router.post("/forgot-password", (req, res) => {
  console.log("=== FORGOT PASSWORD ROUTE ACCESSED ===");
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  return authController.forgetPassword(req, res);
});

router.post("/forgotPassword", (req, res) => {
  console.log("=== FORGOT PASSWORD ALTERNATIVE ROUTE ACCESSED ===");
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  return authController.forgetPassword(req, res);
});

router.post("/reset-password", checkPassword(), (req, res) => {
  console.log("=== RESET PASSWORD ROUTE ACCESSED ===");
  console.log("Request body:", {
    token: req.body.token ? "present" : "missing",
    newPassword: req.body.newPassword ? "present" : "missing"
  });
  return authController.resetPassword(req, res);
});

// Authentication routes
router.post("/register", checkUserName(), checkEmail(), checkPassword(), checkGender(), authController.register);
router.post("/login", checkEmailOrUserName(), checkPassword(), authController.login);
router.post("/logout", authenticateToken, authController.logout);

// Other routes
router.get("/generateUsernames", authController.generateUserName);
router.patch("/updatePassword", checkPassword().confirmPassword(), authenticateToken, authController.updatePassword);
router.patch("/email", checkEmail(), checkPassword(), authenticateToken, authController.updateEmail);
router.patch("/changePassword", checkPassword().confirmPassword().compareOldPasswords(), authenticateToken, authController.changePassword);

module.exports = router;