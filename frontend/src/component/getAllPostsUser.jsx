import { useContext, useEffect } from "react";
import "./getAllPostsUser.css";
import SessionContext from "../context/sessionContext.js";

export default function GetAllPostsUser() {
  const { session, posts, setPosts } = useContext(SessionContext);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(
          `http://localhost:3002/api/post/all/${session.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    getPosts();
  }, []);

  return (
    <div className="container">
      {posts.map((value, index) => (
        <div key={index} className="divBorder">
          <h1>{value.title}</h1>
          <p>{value.category}</p>
          <p>{value.place}</p>
          <p>{value.date}</p>
          <p
              style={
                value.status === "Submited"
                  ? { color: "orange" }
                  : value.status === "Not-Approved"
                  ? { color: "red" }
                  : { color: "green" }
              }
            >
              {value.status}
            </p>
        </div>
      ))}
    </div>
  );
}