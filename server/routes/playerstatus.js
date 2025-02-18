// const express = require('express');
// const router = express.Router();
// const pool = require('../config/pgdb');

// router.post("/", async (req, res) => {
//   const { playerid, matchid, balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours} = req.body;
//   try {
//     await pool.query(
//       "INSERT INTO player_stats (playerid, matchid, balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
//       [playerid, matchid, balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours]
//     );
//     res.status(201).json({ message: "Player stats created successfully" });
//   } catch (error) {
//     console.error("Error creating player stats:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.get("/:playerid/:matchid", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM player_stats");
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching player stats:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.get("/:playerid/:matchid", async (req, res) => {
//   const { playerid, matchid } = req.params;
//   console.log(playerid, matchid);
//   try {
//     const result = await pool.query(
//       "SELECT * FROM player_stats WHERE playerid = $1 AND matchid = $2",
//       [playerid, matchid]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Player stats not found" });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error fetching player stats:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.put("/:playerid/:matchid", async (req, res) => {
//   const { playerid, matchid } = req.params;
//   const { balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours } = req.body;
//   try {
//     await pool.query(
//       "UPDATE player_stats SET balls_played = $1, balls_bowled = $2, runs = $3, runs_concieved = $4, wickets = $5, sixes = $6, fours = $7 WHERE playerid = $9 AND matchid = $10",
//       [balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours, playerid, matchid]
//     );
//     res.json({ message: "Player stats updated successfully" });
//   } catch (error) {
//     console.error("Error updating player stats:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.delete("/:playerid/:matchid", async (req, res) => {
//   const { playerid, matchid } = req.params;
//   try {
//     await pool.query("DELETE FROM player_stats WHERE playerid = $1 AND matchid = $2", [playerid, matchid]);
//     res.json({ message: "Player stats deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting player stats:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// module.exports = router;




const express = require('express');
const router = express.Router();
const pool = require('../config/pgdb');

router.post("/", async (req, res) => {
  console.log("POST /player_stats called", req.body);
  const { playerid, matchid, balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours } = req.body;
  try {
    await pool.query(
      "INSERT INTO player_stats (playerid, matchid, balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [playerid, matchid, balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours]
    );
    console.log("Player stats inserted successfully");
    res.status(201).json({ message: "Player stats created successfully" });
  } catch (error) {
    console.error("Error creating player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  console.log("GET /player_stats called");
  try {
    const result = await pool.query("SELECT * FROM player_stats");
    console.log("Fetched all player stats");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:playerid/:matchid", async (req, res) => {
  const { playerid, matchid } = req.params;
  console.log(`GET /player_stats/${playerid}/${matchid} called`);
  try {
    const result = await pool.query(
      "SELECT * FROM player_stats WHERE playerid = $1 AND matchid = $2",
      [playerid, matchid]
    );
    if (result.rows.length === 0) {
      console.log("Player stats not found");
      return res.status(404).json({ error: "Player stats not found" });
    }
    console.log("Fetched player stats:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:playerid/:matchid", async (req, res) => {
  const { playerid, matchid } = req.params;
  console.log(`PUT /player_stats/${playerid}/${matchid} called`, req.body);
  const { balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours } = req.body;
  try {
    await pool.query(
      "UPDATE player_stats SET balls_played = $1, balls_bowled = $2, runs = $3, runs_concieved = $4, wickets = $5, sixes = $6, fours = $7 WHERE playerid = $8 AND matchid = $9",
      [balls_played, balls_bowled, runs, runs_concieved, wickets, sixes, fours, playerid, matchid]
    );
    console.log("Player stats updated successfully");
    res.json({ message: "Player stats updated successfully" });
  } catch (error) {
    console.error("Error updating player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:playerid/:matchid", async (req, res) => {
  const { playerid, matchid } = req.params;
  console.log(`DELETE /player_stats/${playerid}/${matchid} called`);
  try {
    await pool.query("DELETE FROM player_stats WHERE playerid = $1 AND matchid = $2", [playerid, matchid]);
    console.log("Player stats deleted successfully");
    res.json({ message: "Player stats deleted successfully" });
  } catch (error) {
    console.error("Error deleting player stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
