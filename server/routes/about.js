const express = require('express');
const router = express.Router();
const dbpool = require('../config/pgdb');

router.get("/", async (req, res) => {
    try {
        const allpersonals = await dbpool.query("SELECT * FROM persons");
        console.log("Fetched all personals:", allpersonals.rows);
        res.json(allpersonals.rows);
    } catch (error) {
        console.error("Error fetching personals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
