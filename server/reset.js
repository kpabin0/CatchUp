const express = require('express');
const pool = require('./pgdb');  // Ensure proper database connection
const router = express.Router();


router.post("/reset", async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      console.log("Received reset request:", email);
  
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];
  
      if (!user) {
        console.log("User not found:", email);
        return res.status(400).json({ message: "User not found" });
      }
  
      await pool.query("UPDATE users SET password = $1 WHERE email = $2", [newPassword, email]);
  
      res.json({ message: "Password reset successfully!" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Error resetting password", error: error.message });
    }
});
  
module.exports = router;
