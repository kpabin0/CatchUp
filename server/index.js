<<<<<<< HEAD
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');



const tournamentsRoutes = require('./tournament');

const pool = require('./db');

app.use(express.json());
app.use(cors());


app.use('/players', playerRoutes);
app.use('/tournaments', tournamentsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
=======
const app = require('./config/express.config')

const PORT_NUMBER = 8080

app.listen(PORT_NUMBER, () => {
    console.log("Server is listening at " + PORT_NUMBER)
})
>>>>>>> 4148974305215ddea8f241ded5eb750b521c0e5b
