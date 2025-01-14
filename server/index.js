const http = require('http');
const app = require('./config/sql.config');

const server = http.createServer(app);
server.listen(5000, '127.0.0.1', () => {
  console.log('Server is running on port 5000');
  console.log('Press CTRL + C to disconnect');
});
