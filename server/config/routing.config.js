const express = require("express")
const mainRoute = express.Router()

const aboutRoutes = require('../routes/about')
const authenticateRoutes = require("../routes/authenticate");
const matchesRoutes = require('../routes/matches')
const newsRoutes = require('../routes/news') 
const subnewsRoutes = require('../routes/subnews')
const teamsRoutes = require('../routes/teams')
const tournamentsRoutes = require('../routes/tournament');
const venuesRoutes = require('../routes/venue');
const playersRoute = require('../routes/players')
const playerstatusRoutes= require('../routes/playerstatus')
const commonRoute = require('../routes/commonroute')

mainRoute.use('/', commonRoute)
mainRoute.use('/about', aboutRoutes);
mainRoute.use('/auth', authenticateRoutes);
mainRoute.use('/matches', matchesRoutes);
mainRoute.use('/news', newsRoutes);
mainRoute.use('/subnews', subnewsRoutes);
mainRoute.use('/teams', teamsRoutes);
mainRoute.use('/tournaments', tournamentsRoutes);
mainRoute.use('/venues', venuesRoutes);
mainRoute.use('/players', playersRoute);
mainRoute.use('/playerstatus', playerstatusRoutes);


module.exports = mainRoute