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
import Login from "../pages/Login"
import Register from "../pages/Register"
import AboutUs from "../pages/AboutUs"
import Players from "../pages/Players"
import Player from "../pages/Player"

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/players" element={<Players />}>
          <Route path=":id" element={<Player />} />
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  )
}

export default Routing