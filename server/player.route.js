const express = require('express');
const router = express.Router();
const pool = require('./db');


router.post("/", async (req, res) => {
  try {
      const { players } = req.body; 
      console.log("Received players data:", players); 
      if (!Array.isArray(players) || players.length === 0) {
          return res.status(400).json({ error: "Invalid or empty players array" });
      }

      const query = "INSERT INTO players (pId, teamId, role) VALUES ($1, $2, $3) RETURNING *";
      const playerPromises = players.map(player => {
          const { pid, teamid, role } = player;
          if (!pid || !teamid || !role) {
              console.log(`Skipping player with missing data: ${JSON.stringify(player)}`);
              return null;
          }
          console.log(`Inserting player with pid: ${pid}, teamid: ${teamid}, role: ${role}`);
          return pool.query(query, [pid, teamid, role]);
      }).filter(Boolean); 

      if (playerPromises.length === 0) {
          return res.status(400).json({ error: "All players data was invalid" });
      }

      const newPlayers = await Promise.all(playerPromises);
      console.log("Inserted players:", newPlayers.map(result => result.rows[0]));
      res.json(newPlayers.map(result => result.rows[0]));
  } catch (err) {
      console.error("Error inserting players:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
      const allPlayers = await pool.query("SELECT * FROM players");
      console.log("Fetched all players:", allPlayers.rows);
      res.json(allPlayers.rows);
  } catch (err) {
      console.error("Error fetching players:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:pid/:teamid", async (req, res) => {
  try {
      const { pid, teamid } = req.params;
      console.log(`Fetching player with pid: ${pid}, teamid: ${teamid}`);
      const player = await pool.query("SELECT * FROM players WHERE pId = $1 AND teamId = $2", [pid, teamid]);
      if (player.rows.length === 0) {
          console.log(`Player not found for pid: ${pid}, teamid: ${teamid}`);
          return res.status(404).json({ error: "Player not found" });
      }
      console.log("Fetched player:", player.rows[0]);
      res.json(player.rows[0]);
  } catch (err) {
      console.error("Error fetching player:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/:pid/:teamid", async (req, res) => {
  try {
      const { pid, teamid } = req.params;
      const { role } = req.body;
      console.log(`Updating player with pid: ${pid}, teamid: ${teamid}, new role: ${role}`);
      
      if (!role) {
          return res.status(400).json({ error: "Missing required field 'role'" });
      }
      
      const updatePlayer = await pool.query(
        "UPDATE players SET role = $1 WHERE pId = $2 AND teamId = $3", 
        [role, pid, teamid]
      );

      if (updatePlayer.rowCount === 0) {
          console.log(`Player not found for update with pid: ${pid}, teamid: ${teamid}`);
          return res.status(404).json({ error: "Player not found for update" });
      }

      console.log(`Updated player's role with pid: ${pid}, teamid: ${teamid}`);
      res.json("Player's role was updated");
  } catch (err) {
      console.error("Error updating player:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/:pid/:teamid", async (req, res) => {   
  try {
      const { pid, teamid } = req.params;
      console.log(`Deleting player with pid: ${pid}, teamid: ${teamid}`);
      
      const deletePlayer = await pool.query(
        "DELETE FROM players WHERE pId = $1 AND teamId = $2", 
        [pid, teamid]
      );

      if (deletePlayer.rowCount === 0) {
          console.log(`Player not found for deletion with pid: ${pid}, teamid: ${teamid}`);
          return res.status(404).json({ error: "Player not found for deletion" });
      }

      console.log(`Deleted player with pid: ${pid}, teamid: ${teamid}`);
      res.json("Player was deleted");
  } catch (err) {
      console.error("Error deleting player:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
