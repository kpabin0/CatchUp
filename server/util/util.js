// This file contains the helpful function for the postgresql with few of the common commands

const dbpool = require('../config/pgdb');


class util {
    /** 
    - Function to get the highest number from given table of selected col (name)
    
    ### args
    - table: table name
    - col: column name to filter/select
     */
    static get_col_max = async (table, col) => (await dbpool.query(`SELECT ${col} FROM ${table} ORDER BY ${col} DESC LIMIT 1;`)).rows[0][col] || -1;

    /**
    - Function to query all the field of the table matching certain column with given condition
    
    ### args
    - table: table name
    - col: column name to filter
    - f: condition/item to check
     */
    static query_all_f = async (table, col, f) => (await dbpool.query(`SELECT * FROM ${table} WHERE ${col} = $1`, [f])).rows[0]
}

module.exports = util