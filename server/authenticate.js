// const express = require("express");
// const dbpool = require('./pgdb');
// const router = express.Router();
// require("dotenv").config()


// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     console.log("Creating a new User:", req.body);
//     // this is to grab the last userid 
//     let userid = (await dbpool.query("SELECT userid FROM users ORDER BY userid DESC LIMIT 1;")).rows[0].userid;
//     // console.log(userid)
//     const result = await dbpool.query(
//       "INSERT INTO users (userid, name, email, password) VALUES ($1, $2, $3, $4)",
//       [++userid, name, email, password]
//     );
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error: error.message });
//   }
// });


// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log("Log In of a User:", req.body);
//     const result = await dbpool.query("SELECT * FROM users WHERE email = $1", [email]);
//     const user = result.rows[0];
//     console.log(user)

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isValid = password === user.password;
//     if (!isValid) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.json({ message: "Login successfullllll"});
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// });

// module.exports = router;






//authenticate.js



const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('./pgdb');
const router = express.Router();
require("dotenv").config()

// Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Creating a new User:", req.body);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log the hashed password to console
    console.log("Hashed Password:", hashedPassword);

    // Insert the new user into the database
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
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
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }  
    const isAdmin = email === "admin12@gmail.com";

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

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log("Log In of a User:", req.body); // Log the incoming request body

//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     const user = result.rows[0];

//     console.log("User found:", user); // Log the retrieved user object

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isValid = await bcrypt.compare(password, user.password);
//     console.log("Password match result:", isValid); // Log the password comparison result

//     if (!isValid) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isAdmin = email === "admin@gmail.com";
//     console.log("Is Admin:", isAdmin); // Log if the user is an admin

//     const token = jwt.sign(
//       { id: user.id, email: user.email, isAdmin },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     console.log("Generated token:", token); // Log the generated token

//     res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error logging in:", error); // Log any error that occurs
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// });


module.exports = router;

