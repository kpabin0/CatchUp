const express =require("express")
const router =express.Router()
const dbpool = require("../config/pgdb")
const util = require('../util/util')

router.post("/create", async(req,res)=>{
    const { name, description } = req.body;
   
    console.log("Received from frontend", req.body)
    if (!name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try{
        const result = await util.get_col_max('teams', 'teamid');
        const teamid = result !== -1 ? result + 1: 1;

        const query = `INSERT INTO teams (teamid, name, description) VALUES ($1, $2, $3 ) RETURNING *`;
        const newTeam = await dbpool.query(query,[teamid,name,description])
        console.log("New Team created",newTeam.rows[0])
        res.json(newTeam.rows[0]);
    }

    catch(error){
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.delete("/:teamid", async (req, res) => {
    const { teamid } = req.params; 
    console.log("Deleting Team ID:", teamid);

    try {
        const teamCheckResult = await dbpool.query("SELECT * FROM teams WHERE teamid = $1", [teamid]);
        
        if (teamCheckResult.rows.length === 0) {
            return res.status(404).json({ error: "Team not found" });
        }

        await dbpool.query("DELETE FROM teams WHERE teamid = $1", [teamid]);
        res.json({ message: "Team deleted successfully" });
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put("/:teamid", async (req, res) => {
    try {
      const { teamid } = req.params;
      const { name, description } = req.body;
  
      console.log("Updating team with id:", teamid);
  
      const updatedTeam = await dbpool.query(
        "UPDATE teams SET name = $1, description = $2 WHERE teamid = $3 RETURNING *",
        [name, description, teamid]
      );
  
      if (updatedTeam.rows.length === 0) {
        console.log(`Team not found for update with id: ${teamid}`);
        return res.status(404).json({ error: "Team not found for update" });
      }
  
      console.log("Updated team:", updatedTeam.rows[0]);
      res.json({ message: "Team updated successfully", team: updatedTeam.rows[0] });
  
    } catch (error) {
      console.error("Error updating team:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


router.get("/:teamid", async(req,res)=>{

    const { teamid } = req.params;
    console.log("Fetching team with id:", teamid);
    try{
        const team = await dbpool.query("SELECT * FROM teams WHERE teamid = $1", [teamid]);
        if (team.rows.length === 0) {
            console.log(`Team not found with id: ${teamid}`);
            return res.status(404).json({ error: "Team not found" });
        }
        console.log("Fetched team:", team.rows[0]);
        res.json(team.rows[0]);
    }
    catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


module.exports=router