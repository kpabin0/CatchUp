// const express = require('express');
// const router = express.Router();
// const dbpool = require('../config/pgdb');
// const util = require('../util/util')

// router.post("/create", async (req, res) => {
//     const { team_1, team_2, date, venue } = req.body; 
//     console.log("Creating a new match:", req.body);

//     try {
//         if (!team_1 || !team_2 || !date || !venue) {
//             return res.status(400).json({ error: "Missing required fields" });
//         } else {
            
//             const result = await util.get_col_max('matches', 'matchid');
//             const matchid = result !== -1 ? result + 1 : 1;
            
//             const insert_query = `INSERT INTO matches (matchid, teamid_1, teamid_2, date, venue) VALUES ($1, $2, $3, $4, $5);`;
//             const newmatch = await dbpool.query(insert_query, [matchid, team_1, team_2, date, venue]);
//             console.log("Created match:", newmatch.rows[0]);
//             res.json(newmatch.rows[0]);
//         }
//     } catch (error) {
//         console.error("Error creating match:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// async function get_unique_match(ml1, ml2)
// {
//     // exctracting unique match id
//     const resMatchid = ml1.map((m) => m.matchid)
    
//     return resMatchid.map((val) => {
//         temp1 = ml1.filter((m) => m.matchid === val)[0]
//         temp2 = ml2.filter((m) => m.matchid === val)[0]

//         return {
//             team_1: {
//                 name: temp1.name,
//                 runs: temp1.runs_team1,
//                 wickets: temp1.wickets_team2,
//                 over: temp1.overs_team2
//             },
//             team_2: {
//                 name: temp2.name,
//                 runs: temp2.runs_team2,
//                 wickets: temp2.wickets_team1,
//                 over: temp2.overs_team1
//             },
//             isLive: true
//         }
//     })
// }

// router.get("/highlight", async (req, res) => {
//     try {
//         const match1 = await dbpool.query("SELECT * FROM MatchHighlights_1;");
//         const match2 = await dbpool.query("SELECT * FROM MatchHighlights_2;");
//         const resMatches = await get_unique_match(match1.rows, match2.rows)
        
//         res.json(resMatches);
//     } catch (error) {
//         console.error("Error fetching matches:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// })

// router.get("/hot", async (req, res) => {
//     try {
//         const match1 = await dbpool.query("SELECT * FROM MatchHighlights_1;");
//         const match2 = await dbpool.query("SELECT * FROM MatchHighlights_2;");
//         const resMatches = await get_unique_match(match1.rows, match2.rows)
//         const retCount = 3;
        
//         if(resMatches.length > retCount)
//             res.json(resMatches.slice(resMatches.length - retCount - 1, resMatches.length -1));
//         else
//             res.json(resMatches);
//     } catch (error) {
//         console.error("Error fetching matches:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// router.delete("/:matchid", async (req, res) => {
//     const matchid = req.params.matchid;
//     console.log("Deleting match with id:", matchid);

//     try {
       
//         const matchCheckResult = await dbpool.query("SELECT * FROM matches WHERE matchid = $1", [matchid]);
//         if (matchCheckResult.rows.length === 0) {
//             return res.status(404).json({ error: "match not found" });
//         }

//         await dbpool.query("DELETE FROM matches WHERE matchid = $1", [matchid]);

//         const result = await dbpool.query("DELETE FROM matches WHERE matchid = $1 RETURNING *", [matchid]);
//         console.log("Deleted match:", result.rows[0]);
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error("Error deleting match:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// router.put("/:matchid", async (req, res) => {
//     try{
//         const { matchid } = req.params;
    
//         const { team_1, team_2, date, venue } = req.body; 
//         console.log("Updating match with id:", matchid);
//         const updatedmatch = await dbpool.query("UPDATE matches SET teamid_1 = $1, teamid_2 = $2, date = $3, venue = $4 WHERE matchid = $5 RETURNING *", [team_1, team_2, date, venue, matchid]);
//         console.log("Updated match:", updatedmatch.rows[0]);   
//         if (updatedmatch.rowCount === 0) {
//             console.log(`match not found for update with id: ${matchid}`);
//             return res.status(404).json({ error: " match not found for update" });
//         }
//         res.json(updatedmatch.rows[0]);
//     }  
//     catch (error) {
//         console.error("Error updating match:", error);
//         res.status(500).json({ error: "Internal Server Error" });  
//     }
// })


// router.get("/:matchid", async (req, res) => {
//     const { matchid } = req.params;
//     console.log("Fetching match with id:", matchid);
//     try{
//         const match = await dbpool.query("SELECT * FROM matches WHERE matchid = $1", [matchid]);
//         if (match.rows.length === 0) {
//             console.log(`match not found with id: ${matchid}`);
//             return res.status(404).json({ error: "match not found" });
//         }
//         console.log("Fetched match:", match.rows[0]);
//         res.json(match.rows[0]);
//     }
//     catch (error) {
//         console.error("Error fetching match:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });



// module.exports = router;


const express = require('express');
const router = express.Router();
const dbpool = require('../config/pgdb');
const util = require('../util/util');
router.post("/create", async (req, res) => {
    const { team_1, team_2, date, venueid } = req.body;
    console.log("Creating a new match:", req.body);

    try {
        if (!team_1 || !team_2 || !date || !venueid) {
            return res.status(400).json({ error: "Missing required fields" });
        } else {
            const result = await util.get_col_max('matches', 'matchid');
            const matchid = result !== -1 ? result + 1 : 1;

            const insert_query = `INSERT INTO matches (matchid, teamid_1, teamid_2, date, venueid) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;  // Add RETURNING * here
            const newmatch = await dbpool.query(insert_query, [matchid, team_1, team_2, date, venueid]);

            console.log("Created match:", newmatch.rows[0]); // Check what is returned
            if (newmatch.rows.length > 0) {
                res.json(newmatch.rows[0]);
            } else {
                res.status(500).json({ error: "Failed to create match" });
            }
        }
    } catch (error) {
        console.error("Error creating match:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


async function get_unique_match(ml1, ml2) {
    // extracting unique match id
    const resMatchid = ml1.map((m) => m.matchid);

    return resMatchid.map((val) => {
        temp1 = ml1.filter((m) => m.matchid === val)[0];
        temp2 = ml2.filter((m) => m.matchid === val)[0];

        return {
            team_1: {
                name: temp1.name,
                runs: temp1.runs_team1,
                wickets: temp1.wickets_team2,
                over: temp1.overs_team2
            },
            team_2: {
                name: temp2.name,
                runs: temp2.runs_team2,
                wickets: temp2.wickets_team1,
                over: temp2.overs_team1
            },
            isLive: true
        }
    });
}

router.get("/highlight", async (req, res) => {
    try {
        const match1 = await dbpool.query("SELECT * FROM MatchHighlights_1;");
        const match2 = await dbpool.query("SELECT * FROM MatchHighlights_2;");
        const resMatches = await get_unique_match(match1.rows, match2.rows);

        res.json(resMatches);
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/hot", async (req, res) => {
    try {
        const match1 = await dbpool.query("SELECT * FROM MatchHighlights_1;");
        const match2 = await dbpool.query("SELECT * FROM MatchHighlights_2;");
        const resMatches = await get_unique_match(match1.rows, match2.rows);
        const retCount = 3;

        if (resMatches.length > retCount)
            res.json(resMatches.slice(resMatches.length - retCount - 1, resMatches.length - 1));
        else
            res.json(resMatches);
    } catch (error) {
        console.error("Error fetching matches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:matchid", async (req, res) => {
    const matchid = req.params.matchid;
    console.log("Deleting match with id:", matchid);

    try {
        const matchCheckResult = await dbpool.query("SELECT * FROM matches WHERE matchid = $1", [matchid]);
        if (matchCheckResult.rows.length === 0) {
            return res.status(404).json({ error: "match not found" });
        }

        await dbpool.query("DELETE FROM matches WHERE matchid = $1", [matchid]);

        const result = await dbpool.query("DELETE FROM matches WHERE matchid = $1 RETURNING *", [matchid]);
        console.log("Deleted match:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error deleting match:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:matchid", async (req, res) => {
    try {
        const { matchid } = req.params;
        const { team_1, team_2, date, venueid } = req.body;  // Changed 'venue' to 'venueid'
        console.log("Updating match with id:", matchid);
        const updatedmatch = await dbpool.query("UPDATE matches SET teamid_1 = $1, teamid_2 = $2, date = $3, venueid = $4 WHERE matchid = $5 RETURNING *", [team_1, team_2, date, venueid, matchid]);  // Changed 'venue' to 'venueid'
        console.log("Updated match:", updatedmatch.rows[0]);

        if (updatedmatch.rowCount === 0) {
            console.log(`match not found for update with id: ${matchid}`);
            return res.status(404).json({ error: " match not found for update" });
        }
        res.json(updatedmatch.rows[0]);
    }
    catch (error) {
        console.error("Error updating match:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:matchid", async (req, res) => {
    const { matchid } = req.params;
    console.log("Fetching match with id:", matchid);
    try {
        const match = await dbpool.query("SELECT * FROM matches WHERE matchid = $1", [matchid]);
        if (match.rows.length === 0) {
            console.log(`match not found with id: ${matchid}`);
            return res.status(404).json({ error: "match not found" });
        }
        console.log("Fetched match:", match.rows[0]);
        res.json(match.rows[0]);
    }
    catch (error) {
        console.error("Error fetching match:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const matches = await dbpool.query("SELECT * FROM matches");
        console.log("Fetched all matches:", matches.rows);
        
       
        res.json(matches.rows);
    } catch (error) {
        console.error("Error fetching all matches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
