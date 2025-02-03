const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbpool = require('../config/pgdb');
const router = express.Router();
require("dotenv").config()
const util = require('../util/util')

// Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let userid = await util.get_col_max('users', 'userid')
    // console.log(userid)

    console.log("Creating a new User:", req.body);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password to console
    console.log("Hashed Password:", hashedPassword);

    const insert_query = "INSERT INTO users (userid, name, email, password) VALUES ($1, $2, $3, $4)";
    // Insert the new user into the database
    const result = await dbpool.query(insert_query, [++userid, name, email, hashedPassword]);
    
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Log In of a User:", req.body);
    const user = await util.query_all_f('users', 'email', email);
    console.log(user)

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

      const user = await util.query_all_f('users', 'email', email);

      if (!user) {
          console.log("User not found:", email);
          return res.status(400).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Hashed password:", hashedPassword);

      const update_query = "UPDATE users SET password = $1 WHERE email = $2";
      await dbpool.query(update_query, [hashedPassword, email]);
      console.log("New password has been set for user:", email);

      res.json({ message: "Password reset successfully!" });
  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Error resetting password", error: error.message });
  }
});



module.exports = router;

