const express = require('express');
const app = express();
const cors = require('cors');

const PORT_NUMBER = 8080;

const tournamentsRoutes = require('./tournament');
const authenticateRoutes = require("./authenticate")
const venuesRoutes = require('./venue');
const teamRoutes=require('./team')
const dbpool = require('./pgdb');

app.use(express.json());
app.use(cors());


app.use('/tournaments', tournamentsRoutes);
app.use('/auth', authenticateRoutes);
app.use('/venues', venuesRoutes);
app.use('/team',teamRoutes)


app.get('/', async (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT_NUMBER, () => {
  console.log(`Server running on port ${PORT_NUMBER}`);
});