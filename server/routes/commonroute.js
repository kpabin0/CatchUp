const express = require('express')
const router = express.Router()
const util = require('../util/util')

const getPoints = [
    '/users',
    '/matches',
    '/news',
    '/subnews',
    '/teams',
    '/tournaments',
    '/venues',
    '/players'
];

// get the number of rows on given table
const getRowCounts = [...getPoints].map((i) => i + '/count')
// get items (i.e rows) of the table with optional limit (#note: when no limit it is same as getAll below)
const getList = [...getPoints].map((i) => i + '/list')
// get all the rows name or title only
const getListName = [...getPoints].map((i) => i + '/entries')
// get all the the table rows items
const getAll = [...getPoints].map((i) => i)

getRowCounts.forEach((url) => {
    return router.get(`${url}`, async (req, res) => {
        try {
            const tableName = url.split('/')[1]
            console.log("Common called")
            res.json(await util.query_row_c(tableName))
        } catch(eror) {
            console.log("error with ", url)
            res.status(500).json({error: "Internal Server Error"});
        }
    })
})

getList.forEach((url) => {
    router.get(`${url}/:limit?`, async (req, res) => {
        try {
            // when limit not given will be undefined i.e select all
            const { limit } = req.params
            console.log("Common called first", limit);
            const tableName = url.split('/')[1]
            
            res.json(await util.query_rows(tableName, limit))
        } catch(eror) {
            console.log("error with ", url)
            res.status(500).json({error: "Internal Server Error"});
        }
    })
})

getAll.forEach((url) => {
    router.get(`${url}`, async (req, res) => {
        try {
            const tableName = url.split('/')[1]
            console.log("Common called")
            res.json(await util.query_rows(tableName))
        } catch(eror) {
            console.log("error with ", url)
            res.status(500).json({error: "Internal Server Error"});
        }
    })
})

getListName.forEach((url) => {
    router.get(`${url}`, async (req, res) => {
        try {
            const tableName = url.split('/')[1]
            const entires = await util.query_rows(tableName)
            console.log("Common called")
    
            const nameList = entires.map((e) => e.name || e.title)
            res.json(nameList)
        } catch(eror) {
            console.log("error with ", url)
            res.status(500).json({error: "Internal Server Error"});
        }
    })
})

module.exports = router