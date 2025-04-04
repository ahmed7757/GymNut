const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get("/test", (req, res) => {
    res.json({ message: "Server is working!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
}); 