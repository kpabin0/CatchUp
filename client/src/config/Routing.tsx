import { Route, Routes } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Matches from "../pages/Matches"
import Tournaments from "../pages/Tournaments"
import News from "../pages/News"
import Fixtures from "../pages/Fixtures"
import NotFound from "../pages/NotFound"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
<<<<<<< HEAD
import Teams from "../pages/team"
import CreateTournamentForm from "../pages/Tournaments/tournament .form"
import GetTournamentsPage from "../pages/Tournaments/alltournaments"
import EditTournamentPage from "../pages/Tournaments/edittournaments"
import TournamentDetailsPage from "../pages/Tournaments/tournamentsdeatils"

=======
import Login from "../pages/Login"
import Register from "../pages/Register"
import AboutUs from "../pages/AboutUs"
import Players from "../pages/Players"
import Player from "../pages/Player"
>>>>>>> 4148974305215ddea8f241ded5eb750b521c0e5b

const Routing = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/matches" element={<Matches />}/>
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/news" element={<News />} />
        <Route path="/fixtures" element={<Fixtures />} />
<<<<<<< HEAD
        <Route path="/team" element={<Teams/>} />
        <Route path="/tournament/create" element={<CreateTournamentForm />} />
        <Route path="/tournament/all" element={<GetTournamentsPage />} />
        <Route path="/edit-tournament/:tid" element={<EditTournamentPage />} />
        <Route path="/tournament/:tid" element={<TournamentDetailsPage />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/players" element={<Players />}>
          <Route path=":id" element={<Player />} />
        </Route>

>>>>>>> 4148974305215ddea8f241ded5eb750b521c0e5b
        <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Routing