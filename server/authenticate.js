const express = require("express");
const dbpool = require('./pgdb');
const router = express.Router();
require("dotenv").config()


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Creating a new User:", req.body);
    // this is to grab the last userid 
    let userid = (await dbpool.query("SELECT userid FROM users ORDER BY userid DESC LIMIT 1;")).rows[0].userid;
    // console.log(userid)
    const result = await dbpool.query(
      "INSERT INTO users (userid, name, email, password) VALUES ($1, $2, $3, $4)",
      [++userid, name, email, password]
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
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = password === user.password;
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successfullllll"});
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;