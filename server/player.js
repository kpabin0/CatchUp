const express = require('express');
const router = express.Router();
const pool = require("./pgdb");

// Get all players with team details
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT Players.playerid, Players.name AS player_name, 
              Teams.teamid, Teams.name AS team_name 
       FROM Players 
       JOIN Teams ON Players.teamid = Teams.teamid`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single player by ID with team details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT Players.playerid, Players.name AS player_name, 
              Teams.teamid, Teams.name AS team_name 
       FROM Players 
       JOIN Teams ON Players.teamid = Teams.teamid
       WHERE Players.playerid = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new player with team validation
router.post("/", async (req, res) => {
  try {
    const { teamid, name } = req.body;

    // Check if the team exists
    const teamCheck = await pool.query("SELECT * FROM Teams WHERE teamid = $1", [teamid]);
    if (teamCheck.rows.length === 0) {
      return res.status(400).json({ error: "Invalid team ID" });
    }

    const result = await pool.query(
      "INSERT INTO Players (teamid, name) VALUES ($1, $2) RETURNING *",
      [teamid, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a player (with team validation)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { teamid, name } = req.body;

    // Check if the team exists
    const teamCheck = await pool.query("SELECT * FROM Teams WHERE teamid = $1", [teamid]);
    if (teamCheck.rows.length === 0) {
      return res.status(400).json({ error: "Invalid team ID" });
    }

    const result = await pool.query(
      "UPDATE Players SET teamid = $1, name = $2 WHERE playerid = $3 RETURNING *",
      [teamid, name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a player
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM Players WHERE playerid = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
