const express = require('express');
const router = express.Router();
const dbpool = require('../config/pgdb');

router.post("/create", async (req, res) => {
    const { name, seats, location } = req.body; 
    console.log("Creating a new team:", req.body);

    try {
        if (!name || !seats || !location) {
            return res.status(400).json({ error: "Missing required fields" });
        } else {
            
            const result = await dbpool.query("SELECT teamid FROM teams ORDER BY teamid DESC LIMIT 1;");
            const teamid = result.rows.length > 0 ? result.rows[0].teamid + 1 : 1;
            
        
            const query = `INSERT INTO teams (teamid, name, seats, location) VALUES ($1, $2, $3, $4);`;
            const newteam = await dbpool.query(query, [teamid, name, seats, location]);
            console.log("Created team:", newteam.rows[0]);
            res.json(newteam.rows[0]);
        }
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.get("/", async (req, res) => {
    try {
        const allteams = await dbpool.query("SELECT * FROM teams");
        console.log("Fetched all teams:", allteams.rows);
        res.json(allteams.rows);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:teamid", async (req, res) => {
    const teamid = req.params.teamid;
    console.log("Deleting team with id:", teamid);

    try {
       
        const teamCheckResult = await dbpool.query("SELECT * FROM teams WHERE teamid = $1", [teamid]);
        if (teamCheckResult.rows.length === 0) {
            return res.status(404).json({ error: "team not found" });
        }

        await dbpool.query("DELETE FROM teams WHERE teamid = $1", [teamid]);

        const result = await dbpool.query("DELETE FROM teams WHERE teamid = $1 RETURNING *", [teamid]);
        console.log("Deleted team:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put("/:teamid", async (req, res) => {
try{
    const { teamid } = req.params;
   
    const {  name, seats, location } = req.body;    
    console.log("Updating team with id:", teamid);
    const updatedteam = await dbpool.query("UPDATE teams SET name = $1, seats = $2, location = $3 WHERE teamid = $4 RETURNING *", [name, seats, location, teamid]);
    console.log("Updated team:", updatedteam.rows[0]);   
    if (updatedteam.rowCount === 0) {
        console.log(`team not found for update with id: ${teamid}`);
        return res.status(404).json({ error: " team not found for update" });
    }
    res.json(updatedteam.rows[0]);
}  
 catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ error: "Internal Server Error" });  
}
}
)


router.get("/:teamid", async (req, res) => {
    const { teamid } = req.params;
    console.log("Fetching team with id:", teamid);
    try{
        const team = await dbpool.query("SELECT * FROM teams WHERE teamid = $1", [teamid]);
        if (team.rows.length === 0) {
            console.log(`team not found with id: ${teamid}`);
            return res.status(404).json({ error: "team not found" });
        }
        console.log("Fetched team:", team.rows[0]);
        res.json(team.rows[0]);
    }
    catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
