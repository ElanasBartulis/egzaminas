import { useContext } from "react";
import { Link } from "react-router";
import SessionContext from "../context/sessionContext";
import "./navigation.css";

export default function Navigation() {
  const { session } = useContext(SessionContext);

  async function logout() {
    await fetch("http://localhost:3002/api/user/logout", {
      method: "GET",
      credentials: "include",
    });
    window.location.reload();
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {session.isLogged ? (
            <Link onClick={logout} className="logout">
              Logout
            </Link>
          ) : (
            ""
          )}
        </li>
      </ul>
    </nav>
  );
}