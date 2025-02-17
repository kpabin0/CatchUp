const express = require('express');
const router = express.Router();
const dbpool = require('../config/pgdb');
router.post("/", async (req, res) => {
  const { playerid, matchid, balls_played, balls_bowled, runs, runs_conceded, wickets, sixes, fours, playing_status } = req.body;
  try {
    await pool.query(
      "INSERT INTO player_stats (playerid, matchid, balls_played, balls_bowled, runs, runs_conceded, wickets, sixes, fours, playing_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [playerid, matchid, balls_played, balls_bowled, runs, runs_conceded, wickets, sixes, fours, playing_status]
    );
    res.status(201).json({ message: "Player stats created successfully" });
  } catch (error) {
    console.error("Error creating player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM player_stats");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:id", async (req, res) => {
  const { playerid, matchid } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM player_stats WHERE playerid = $1 AND matchid = $2",
      [playerid, matchid]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Player stats not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

});


router.put("/:id", async (req, res) => {
  const { playerid, matchid } = req.params;
  const { balls_played, balls_bowled, runs, runs_conceded, wickets, sixes, fours, playing_status } = req.body;
  try {
    await pool.query(
      "UPDATE player_stats SET balls_played = $1, balls_bowled = $2, runs = $3, runs_conceded = $4, wickets = $5, sixes = $6, fours = $7, playing_status = $8 WHERE playerid = $9 AND matchid = $10",
      [balls_played, balls_bowled, runs, runs_conceded, wickets, sixes, fours, playing_status, playerid, matchid]
    );
    res.json({ message: "Player stats updated successfully" });
  } catch (error) {
    console.error("Error updating player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { playerid, matchid } = req.params;
  try {
    await pool.query("DELETE FROM player_stats WHERE playerid = $1 AND matchid = $2", [playerid, matchid]);
    res.json({ message: "Player stats deleted successfully" });
  } catch (error) {
    console.error("Error deleting player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;



