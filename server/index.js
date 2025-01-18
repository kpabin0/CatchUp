const express = require('express');
const app = express();
const cors = require('cors');

const PORT_NUMBER = 8080;

const tournamentsRoutes = require('./tournament');

const dbpool = require('./pgdb');

app.use(express.json());
app.use(cors());


// app.use('/players', playerRoutes);
app.use('/tournaments', tournamentsRoutes);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT_NUMBER, () => {
  console.log(`Server running on port ${PORT_NUMBER}`);
});