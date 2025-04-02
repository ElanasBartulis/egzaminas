import { useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router";
import SessionContext from "../context/sessionContext";

export default function Register() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();

  if (session.isLogged) return navigate("/");

  async function sendData(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const validatePsw =
      formData.get("password") === formData.get("repeat-password");

    const registerData = {
      email: formData.get("email"),
      password: validatePsw ? formData.get("password") : "",
    };

    try {
      const promise = await fetch("http://localhost:3002/api/user/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const response = await promise.json();

      if (!promise.ok) return alert(response.error[0]?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={sendData} className="login-container">
        <h1>Register</h1>
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input
          name="repeat-password"
          type="password"
          placeholder="Repeat password"
          required
        />
        <Link to="/login">Login</Link>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}