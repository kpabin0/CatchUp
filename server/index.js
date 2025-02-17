const app = require('./config/express.config');

const PORT_NUMBER = 8080;


app.get('/', async (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT_NUMBER, () => {
  console.log(`Server running on port ${PORT_NUMBER}`);
});