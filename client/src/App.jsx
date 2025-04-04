import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import LandingPage from "./pages/LandingPage/LandingPage";
import { UserProvider } from "./contexts/User";
import { useState } from "react";
import Track from "./pages/Track/Track";
import Private from "./pages/Private/Private";
import UserDetails1 from "./pages/UserDetails/UserDetails";
import UserProfile from "./pages/UserProfile/UserProfile";
import HomePage from "./pages/HomePage/HomePage";
import Plan from "./pages/Plan/Plan";
import Plans from "./pages/Plans/Plans";
import Layout2 from "./pages/Layout/Layout2";
import Team from "./pages/Team/Team";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";


function App() {
  const userData = localStorage.getItem("token")
  const userData2 = sessionStorage.getItem("token")
  const [loggedUser, setLoggedUser] = useState(userData ? userData : userData2);
  // console.log(userData)
  // console.log(userData2)

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />} errorElement={<h1>Erorr.....</h1>}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Track" element={<Private Component={Track} />} />
            <Route path="/HomePage" element={<Private Component={HomePage} />} />
            <Route path="/Myprofile" element={<Private Component={UserProfile} />} />
            <Route path="/plan" element={<Private Component={Plan} />} />
            <Route path="/plans" element={<Private Component={Plans} />} />
            <Route path="/team" element={<Team />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/userDetails" element={<Layout2 />} errorElement={<h1>Erorr.....</h1>}>
            <Route path="/userDetails" element={<Private Component={UserDetails1} />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
