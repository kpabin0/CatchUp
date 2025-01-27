const express = require('express');
const router = express.Router();
const pool = require('./pgdb');

router.post("/create", async (req, res) => {
    const { name, seats, location } = req.body; 
    console.log("Creating a new Venue:", req.body);

    try {
        if (!name || !seats || !location) {
            return res.status(400).json({ error: "Missing required fields" });
        } else {
            
            const result = await pool.query("SELECT venueid FROM venues ORDER BY venueid DESC LIMIT 1;");
            const venueid = result.rows.length > 0 ? result.rows[0].venueid + 1 : 1;
            
        
            const query = `INSERT INTO venues (venueid, name, seats, location) VALUES ($1, $2, $3, $4);`;
            const newVenue = await pool.query(query, [venueid, name, seats, location]);
            console.log("Created venue:", newVenue.rows[0]);
            res.json(newVenue.rows[0]);
        }
    } catch (error) {
        console.error("Error creating venue:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.get("/", async (req, res) => {
    try {
        const allVenues = await pool.query("SELECT * FROM venues");
        console.log("Fetched all venues:", allVenues.rows);
        res.json(allVenues.rows);
    } catch (error) {
        console.error("Error fetching venues:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:venueid", async (req, res) => {
    const venueid = req.params.venueid;
    console.log("Deleting venue with id:", venueid);

    try {
       
        const venueCheckResult = await pool.query("SELECT * FROM venues WHERE venueid = $1", [venueid]);
        if (venueCheckResult.rows.length === 0) {
            return res.status(404).json({ error: "Venue not found" });
        }

        await pool.query("DELETE FROM venues WHERE venueid = $1", [venueid]);

        const result = await pool.query("DELETE FROM venues WHERE venueid = $1 RETURNING *", [venueid]);
        console.log("Deleted venue:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error deleting venue:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put("/:venueid", async (req, res) => {
try{
    const { venueid } = req.params;
   
    const {  name, seats, location } = req.body;    
    console.log("Updating venue with id:", venueid);
    const updatedVenue = await pool.query("UPDATE venues SET name = $1, seats = $2, location = $3 WHERE venueid = $4 RETURNING *", [name, seats, location, venueid]);
    console.log("Updated venue:", updatedVenue.rows[0]);   
    if (updatedVenue.rowCount === 0) {
        console.log(`Venue not found for update with id: ${venueid}`);
        return res.status(404).json({ error: " Venue not found for update" });
    }
}  
 catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ error: "Internal Server Error" });  
}
}
)


router.get("/:venueid", async (req, res) => {
    const { venueid } = req.params;
    console.log("Fetching venue with id:", venueid);
    try{
        const venue = await pool.query("SELECT * FROM venues WHERE venueid = $1", [venueid]);
        if (venue.rows.length === 0) {
            console.log(`Venue not found with id: ${venueid}`);
            return res.status(404).json({ error: "Venue not found" });
        }
        console.log("Fetched venue:", venue.rows[0]);
        res.json(venue.rows[0]);
    }
    catch (error) {
        console.error("Error fetching venue:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
