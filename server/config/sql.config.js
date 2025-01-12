const dotenv = require('dotenv');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



module.exports = app;
