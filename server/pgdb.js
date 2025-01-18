const { Pool } = require('pg'); 
require('dotenv').config()

const isDev = false;

const dbPool = isDev ? new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,  
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,

    ssl: {
        rejectUnauthorized: false
    }
}) : new Pool({
    connectionString: process.env.CONNECTION_URL,

    ssl: {
        rejectUnauthorized: false
    }
});

// dbPool.connect()

module.exports = dbPool;
