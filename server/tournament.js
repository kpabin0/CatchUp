const express = require('express');
const router = express.Router();
const pool = require('./db');


router.post("/", async (req, res) => {
    try {
        const { tournamentid, name, start, end_date } = req.body;

        console.log("Creating a new tournament:", req.body);

        if (!tournamentid || !name || !start || !end_date) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const query = `
            INSERT INTO tournaments (tournamentid, name, start, end_date)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const newTournament = await pool.query(query, [tournamentid, name, start, end_date]);

        console.log("Created tournament:", newTournament.rows[0]);
        res.json(newTournament.rows[0]);
    } catch (err) {
        console.error("Error creating tournament:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/", async (req, res) => {
    try {
        const allTournaments = await pool.query("SELECT * FROM tournaments");
        console.log("Fetched all tournaments:", allTournaments.rows);
        res.json(allTournaments.rows);
    } catch (err) {
        console.error("Error fetching tournaments:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:tournamentid", async (req, res) => {
    try {
        const { tournamentid } = req.params;
        console.log(`Fetching tournament with id: ${tournamentid}`);
        const tournament = await pool.query("SELECT * FROM tournaments WHERE tournamentid = $1", [tournamentid]);

        if (tournament.rows.length === 0) {
            console.log(`Tournament not found with id: ${tournamentid}`);
            return res.status(404).json({ error: "Tournament not found" });
        }

        console.log("Fetched tournament:", tournament.rows[0]);
        res.json(tournament.rows[0]);
    } catch (err) {
        console.error("Error fetching tournament:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:tournamentid", async (req, res) => {
    try {
        const { tournamentid } = req.params;
        const { name, start, end_date } = req.body;

        console.log(`Updating tournament with id: ${tournamentid}, new data:`, req.body);

        const updateQuery = `
            UPDATE tournaments 
            SET name = $1, start = $2, end_date = $3 
            WHERE tournamentid = $4 RETURNING *;
        `;

        const updatedTournament = await pool.query(updateQuery, [name, start, end_date, tournamentid]);

        if (updatedTournament.rowCount === 0) {
            console.log(`Tournament not found for update with id: ${tournamentid}`);
            return res.status(404).json({ error: "Tournament not found for update" });
        }

        console.log("Updated tournament:", updatedTournament.rows[0]);
        res.json(updatedTournament.rows[0]);
    } catch (err) {
        console.error("Error updating tournament:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete("/:tournamentid", async (req, res) => {
    try {
        const { tournamentid } = req.params;

        console.log(`Deleting tournament with id: ${tournamentid}`);
        const deleteTournament = await pool.query("DELETE FROM tournaments WHERE tournamentid = $1", [tournamentid]);

        if (deleteTournament.rowCount === 0) {
            console.log(`Tournament not found for deletion with id: ${tournamentid}`);
            return res.status(404).json({ error: "Tournament not found for deletion" });
        }

        console.log(`Deleted tournament with id: ${tournamentid}`);
        res.json("Tournament was deleted");
    } catch (err) {
        console.error("Error deleting tournament:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;