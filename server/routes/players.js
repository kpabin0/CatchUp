const express = require('express');
const router = express.Router();
const dbpool = require('../config/pgdb');

router.post("/create", async (req, res) => {
    const { name, seats, location } = req.body; 
    console.log("Creating a new player:", req.body);

    try {
        if (!name || !seats || !location) {
            return res.status(400).json({ error: "Missing required fields" });
        } else {
            
            const result = await dbpool.query("SELECT playerid FROM players ORDER BY playerid DESC LIMIT 1;");
            const playerid = result.rows.length > 0 ? result.rows[0].playerid + 1 : 1;
            
        
            const query = `INSERT INTO players (playerid, name, seats, location) VALUES ($1, $2, $3, $4);`;
            const newplayer = await dbpool.query(query, [playerid, name, seats, location]);
            console.log("Created player:", newplayer.rows[0]);
            res.json(newplayer.rows[0]);
        }
    } catch (error) {
        console.error("Error creating player:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/top", async (req, res) => {
    const { count } = req.params;
    try {
        const allplayers = await dbpool.query("SELECT * FROM players");
        const retCount = count ? count : 4;
        console.log("Fetched all players:", allplayers.rows);
        if(allplayers.rows.length > retCount)
            res.json(allplayers.rows.slice(allplayers.rows.length - retCount - 1, allplayers.rows.length - 1));
        else
            res.json(allplayers.rows);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const allplayers = await dbpool.query("SELECT * FROM players");
        console.log("Fetched all players:", allplayers.rows);
        res.json(allplayers.rows);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:playerid", async (req, res) => {
    const playerid = req.params.playerid;
    console.log("Deleting player with id:", playerid);

    try {
       
        const playerCheckResult = await dbpool.query("SELECT * FROM players WHERE playerid = $1", [playerid]);
        if (playerCheckResult.rows.length === 0) {
            return res.status(404).json({ error: "player not found" });
        }

        await dbpool.query("DELETE FROM players WHERE playerid = $1", [playerid]);

        const result = await dbpool.query("DELETE FROM players WHERE playerid = $1 RETURNING *", [playerid]);
        console.log("Deleted player:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error deleting player:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put("/:playerid", async (req, res) => {
    try{
        const { playerid } = req.params;
    
        const {  name, seats, location } = req.body;    
        console.log("Updating player with id:", playerid);
        const updatedplayer = await dbpool.query("UPDATE players SET name = $1, seats = $2, location = $3 WHERE playerid = $4 RETURNING *", [name, seats, location, playerid]);
        console.log("Updated player:", updatedplayer.rows[0]);   
        if (updatedplayer.rowCount === 0) {
            console.log(`player not found for update with id: ${playerid}`);
            return res.status(404).json({ error: " player not found for update" });
        }
        res.json(updatedplayer.rows[0]);
    }  
    catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({ error: "Internal Server Error" });  
    }
    }
)


router.get("/:playerid", async (req, res) => {
    const { playerid } = req.params;
    console.log("Fetching player with id:", playerid);
    try{
        const player = await dbpool.query("SELECT * FROM players WHERE playerid = $1", [playerid]);
        if (player.rows.length === 0) {
            console.log(`player not found with id: ${playerid}`);
            return res.status(404).json({ error: "player not found" });
        }
        console.log("Fetched player:", player.rows[0]);
        res.json(player.rows[0]);
    }
    catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
