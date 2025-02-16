const express = require('express');
const router = express.Router();
const dbpool = require('../config/pgdb');

router.get("/", async (req, res) => {
    try {
        const select_query = "SELECT * FROM persons";
        const allpersonals = await dbpool.query(select_query);
        console.log("Fetched all personals:", allpersonals.rows);
        res.json(allpersonals.rows);
    } catch (error) {
        console.error("Error fetching personals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
