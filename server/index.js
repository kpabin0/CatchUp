const http = require('http');
const app = require('./config/sql.config');

const PORT_NUMBER = 8080

const server = http.createServer(app);
server.listen(PORT_NUMBER, '127.0.0.1', () => {
  console.log('Server is running on port ' + PORT_NUMBER);
  console.log('Press CTRL + C to disconnect');
});
