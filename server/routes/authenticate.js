const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbpool = require('../config/pgdb');
const router = express.Router();
require("dotenv").config()

// Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let userid = (await dbpool.query("SELECT userid FROM users ORDER BY userid DESC LIMIT 1;")).rows[0].userid;
    console.log(userid)

    console.log("Creating a new User:", req.body);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password to console
    console.log("Hashed Password:", hashedPassword);

    // Insert the new user into the database
    const result = await dbpool.query(
      "INSERT INTO users (userid, name, email, password) VALUES ($1, $2, $3, $4)",
      [++userid, name, email, hashedPassword]
    );
    
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Log In of a User:", req.body);
    const result = await dbpool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }  
    const isAdmin = email === "admin123@gmail.com";

    if (isAdmin) {
      console.log("Logged-in user is an Admin.");
    } else {
      console.log("Logged-in user is a Regular User.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});


router.post("/reset", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      console.log("Received reset request:", email);

      const result = await dbpool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];

      if (!user) {
          console.log("User not found:", email);
          return res.status(400).json({ message: "User not found" });
      }

   
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Hashed password:", hashedPassword);

      await dbpool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email]);

      
      console.log("New password has been set for user:", email);
     

      res.json({ message: "Password reset successfully!" });
  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Error resetting password", error: error.message });
  }
});



module.exports = router;

