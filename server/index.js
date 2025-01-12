import express from 'express'
import cors from 'cors'

const PORT_NUMBER = 8080

const app = express()

app.use(cors())

app.listen(PORT_NUMBER, () => {
    console.log("Listening in Port number", PORT_NUMBER);
})

app.get("/", (req, res) => {
    console.log("Request in server /");

    res.json("This is response json");
})