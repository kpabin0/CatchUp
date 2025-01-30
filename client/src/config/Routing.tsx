import { Route, Routes } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Matches from "../pages/Matches/Matches"
import News from "../pages/News"
import Fixtures from "../pages/Fixtures"
import NotFound from "../pages/NotFound"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import TeamsForm from "../pages/Teams/TeamForm"
import CreateTournamentForm from "../pages/Tournaments/TournamentForm"
import Tournaments from "../pages/Tournaments/Tournaments"
import EditTournament from "../pages/Tournaments/EditTournament"
import TournamentDetails from "../pages/Tournaments/TournamentDetails"
import Login from "../pages/Login"
import Register from "../pages/Register"
import AboutUs from "../pages/AboutUs"
import Players from "../pages/Players"
import Player from "../pages/Player"
import Dashboard from "../pages/Dashboard"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import { checkAdminStatus, loggedInStatus } from "../data/utils"
import ResetPassword from "../pages/ResetPassword"
import VenueCreateForm from "../pages/venues/venue.form"
import Venue from "../pages/venues/venue.all"
import EditVenue from "../pages/venues/venue.edit"
import EditTeam from "../pages/Teams/Editteam"
import AllTeams from "../pages/Teams/AllTeams"
import TeamDetails from "../pages/Teams/team.details"
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
    window.addEventListener("resize", handleResize)
    setIsLoggedIn(loggedInStatus())
    setIsAdmin(checkAdminStatus())
  }, [])


  return (
    <>
    {isSideBar || isAdmin || isLoggedIn ? <Sidebar /> : <Navbar />}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={isAdmin ? <Dashboard /> : isLoggedIn ? <Home /> : <Login />}/>
      <Route>
        <Route path="/matches" element={<Matches />} />
      </Route>
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/news" element={<News />} />
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/teams/create" element={<TeamsForm/>} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      <Route>
        <Route path="/tournaments/" element={<Tournaments />} />
        <Route path="/tournaments/create" element={<CreateTournamentForm />} />
        <Route path="/tournaments/edit/:tid" element={<EditTournament />} />
        <Route path="/tournaments/:tid" element={<TournamentDetails />} />
      </Route>
        <Route path="/teams/create" element={<TeamsForm/>} />
        <Route path="/teams" element={<AllTeams/>}/>
        <Route path="/teams/:teamid" element={<TeamDetails/>}/>
        <Route path="/teams/edit/:teamid" element={<EditTeam/>}/>
        <Route>
          
        </Route>

      <Route>
        <Route path="/venues" element={< Venue/>} />
        <Route path="/venues/create" element={< VenueCreateForm/>} />
        <Route path="/venues/edit/:venueid" element={< EditVenue/>} />
      </Route>
      <Route path="/login" element={isAdmin ? <Dashboard /> : isLoggedIn ? <Home /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route>
        <Route path="/players" element={<Players />} />
        <Route path="/players/:tid/:pid" element={<Player />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Routing