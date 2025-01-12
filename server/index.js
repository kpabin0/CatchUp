import express from 'express'
import cors from 'cors'

import { newsJSON } from './routes/news.js'
import { tournamentJSON } from './routes/tournament.js'

const PORT_NUMBER = 8080

const app = express()

app.use(cors())

app.listen(PORT_NUMBER, () => {
    console.log("Listening in Port number", PORT_NUMBER);
})

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

app.get("/", (req, res) => {
    console.log("Request in server /");

    res.json("This is response json");
})

app.get("/news", async (req, res) => {
    await wait(1000);
    return await res.json(newsJSON);
})

app.get("/tournament", async (req, res) => {
    await wait(1000);
    return await res.json(tournamentJSON);
})