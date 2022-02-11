import { Routes, Route } from "react-router";

import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/Signup";
import Favorite from "./Pages/Favorite/Favorire";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Profile from "./Pages/Profile/Profile";
import Navbar from "./Components/Navbar/Navar";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/favorite" element={<Favorite/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
