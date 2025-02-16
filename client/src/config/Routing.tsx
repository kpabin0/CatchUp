import { App, Home, NotFound, Footer, Navbar, Sidebar, Register, Login, ResetPassword, AboutUs } from "./BasicImport"

import { Route, Routes } from "react-router-dom"
import Matches from "../pages/Matches/Matches"
import News from "../pages/News/News"
import Fixtures from "../pages/Fixtures"
import Tournaments from "../pages/Tournaments/Tournaments"
import EditTournament from "../pages/Tournaments/EditTournament"
import TournamentDetails from "../pages/Tournaments/TournamentDetails"
import Players from "../pages/Players/Players"
import Player from "../pages/Players/PlayerDetails"
import Dashboard from "../pages/Dashboard"
import { useState, useEffect } from "react"
import { checkAdminStatus, loggedInStatus } from "../utils/utils"
import AllTeams from "../pages/Teams/Teams"
import CreateTournament from "../pages/Tournaments/CreateTournament"
import CreateTeam from "../pages/Teams/CreateTeam"
import EditTeam from "../pages/Teams/EditTeam"
import Venues from "../pages/Venues/Venues"
import CreateVenue from "../pages/Venues/CreateVenue"
import EditVenue from "../pages/Venues/EditVeneue"
import TeamDetails from "../pages/Teams/TeamDetails"
import CreatePlayer from "../pages/Players/CreatePlayer"
import EditPlayer from "../pages/Players/EditPlayer"
import CreateNews from "../pages/News/CreateNews"
import CreateMatch from "../pages/Matches/CreateMatches"
import EditNews from "../pages/News/EditNews"
import EditSubnews from "../pages/News/EditSubNews"

const Routing = () => {

  const [isSideBar, setIsSideBar] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
 
  const handleResize = () => {
    if (window.innerWidth < 780) {
        setIsSideBar(true)
    } else {
        setIsSideBar(false)
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize)
    setIsLoggedIn(loggedInStatus())
    setIsAdmin(checkAdminStatus())
  }, [])


  return (
    <>
    {isSideBar || isAdmin || isLoggedIn ? <Sidebar /> : <Navbar />}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={isAdmin ? <Dashboard /> : isLoggedIn ? <Home /> : <Login />}/>
      <Route>
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/create" element={<CreateMatch />} />
      </Route>
      <Route path="/tournaments" element={<Tournaments />} />
      <Route>
        <Route  path="/news" element={<News />} />
        <Route  path="/subnews" element={<News />} />
        <Route  path="/news/create" element={<CreateNews />} />
        <Route  path="/news/edit/:newsid" element={<EditNews />} />
        <Route  path="/subnews/create" element={<CreateNews />} />
        <Route  path="/subnews/edit/:subnewsid" element={<EditSubnews />} />
      </Route>
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      <Route>
        <Route path="/tournaments/" element={<Tournaments />} />
        <Route path="/tournaments/create" element={<CreateTournament />} />
        <Route path="/tournaments/edit/:tid" element={<EditTournament />} />
        <Route path="/tournaments/:tid" element={<TournamentDetails />} />
      </Route>
      <Route>
        <Route path="/teams" element={<AllTeams/>}/>
        <Route path="/teams/create" element={<CreateTeam/>} />
        <Route path="/teams/:teamid" element={<TeamDetails/>}/>
        <Route path="/teams/edit/:teamid" element={<EditTeam/>}/>
      </Route>

      <Route>
        <Route path="/venues" element={< Venues/>} />
        <Route path="/venues/create" element={<CreateVenue/>} />
        <Route path="/venues/edit/:venueid" element={<EditVenue/>} />
      </Route>
      <Route path="/login" element={isAdmin ? <Dashboard /> : isLoggedIn ? <Home /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route>
        <Route path="/players" element={<Players />} />
        <Route path="/players/create" element={<CreatePlayer />} />
        <Route path="/players/edit/:pid" element={<EditPlayer />} />
        <Route path="/players/:tid/:pid" element={<Player />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Routing