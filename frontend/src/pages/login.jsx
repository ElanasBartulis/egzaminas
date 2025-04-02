import { useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router";
import SessionContext from "../context/sessionContext";

export default function Login() {
  const { session, setSession } = useContext(SessionContext);
  const navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const promise = await fetch("http://localhost:3002/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const response = await promise.json();

      if (!promise.ok) return alert(response.message);
      setSession({
        message: response.message,
        isLogged: response.session.user?.isLogged,
        id: response.session.user?.id,
        email: response.session.user?.email,
        admin: response.session.user?.admin,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={sendData} className="login-container">
        <h1>Login</h1>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <Link to="/register">Register</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}