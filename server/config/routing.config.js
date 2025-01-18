const express = require("express")
const mainRoute = express.Router()

mainRoute.get("/", (req, res) => {
    console.log("Request recieved in backend")
    res.json("Backend response")
})

module.exports = mainRoute