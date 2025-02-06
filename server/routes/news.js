const express = require('express');
const router = express.Router();
const dbpool = require('../config/pgdb');

router.post("/create", async (req, res) => {
    const { title, img, description } = req.body; 
    console.log("Creating a new news:", req.body);

    try {
        if (!title || !img || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        } else {
            
            const insert_query = `INSERT INTO news (title, img, description) VALUES ($1, $2, $3);`;
            const newnews = await dbpool.query(insert_query, [title, img, description]);
            console.log("Created news:", newnews.rows[0]);
            res.json(newnews.rows[0]);
        }
    } catch (error) {
        console.error("Error creating news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.delete("/:newsid", async (req, res) => {
    const newsid = req.params.newsid;
    console.log("Deleting news with id:", newsid);

    try {
       
        const newsCheckResult = await dbpool.query("SELECT * FROM news WHERE newsid = $1", [newsid]);
        if (newsCheckResult.rows.length === 0) {
            return res.status(404).json({ error: "news not found" });
        }

        await dbpool.query("DELETE FROM news WHERE newsid = $1", [newsid]);

        const result = await dbpool.query("DELETE FROM news WHERE newsid = $1 RETURNING *", [newsid]);
        console.log("Deleted news:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put("/:newsid", async (req, res) => {
try{
    const { newsid } = req.params;
   
    const {  name, seats, location } = req.body;    
    console.log("Updating news with id:", newsid);
    const update_query = "UPDATE news SET name = $1, seats = $2, location = $3 WHERE newsid = $4 RETURNING *";
    const updatednews = await dbpool.query(update_query, [name, seats, location, newsid]);
    console.log("Updated news:", updatednews.rows[0]);   
    if (updatednews.rowCount === 0) {
        console.log(`news not found for update with id: ${newsid}`);
        return res.status(404).json({ error: " news not found for update" });
    }
    res.json(updatednews.rows[0]);
}  
 catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ error: "Internal Server Error" });  
    }
});


router.get("/:newsid", async (req, res) => {
    const { newsid } = req.params;
    console.log("Fetching news with id:", newsid);
    try{
        const news = await dbpool.query("SELECT * FROM news WHERE newsid = $1", [newsid]);
        if (news.rows.length === 0) {
            console.log(`news not found with id: ${newsid}`);
            return res.status(404).json({ error: "news not found" });
        }
        console.log("Fetched news:", news.rows[0]);
        res.json(news.rows[0]);
    }
    catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
