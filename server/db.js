const { Pool } = require('pg'); 

const dbPool = new Pool({
    user: "postgres",
    password: "THAPATHALI078!a",  
    host: "localhost",
    port: 5432,
    database: "neha"
});



module.exports = dbPool;
