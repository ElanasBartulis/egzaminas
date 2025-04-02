import { Route, Routes } from "react-router";
import "./App.css";
import SessionContext from "./context/sessionContext.js";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import { useEffect, useState } from "react";
import Navigation from "./component/navigation.jsx";

function App() {
  const [session, setSession] = useState({});
  const [posts, setPosts] = useState([]);
  const SessionValue = {
    session,
    setSession,
    posts,
    setPosts,
  };

  useEffect(() => {
    async function getSession() {
      try {
        const promise = await fetch("http://localhost:3002/api/user/session", {
          method: "GET",
          credentials: "include",
        });
        const response = await promise.json();
        setSession({
          message: response.message,
          isLogged: response.isLogged,
          id: response.user?.id,
          email: response.user?.email,
          admin: response.user?.admin,
        });
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    }
    getSession();
  }, []);
  return (
    <>
      <SessionContext.Provider value={SessionValue}>
        <Navigation />
        <Routes>
          <Route path="/" element={session.isLogged ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </SessionContext.Provider>
    </>
  );
}

export default App;