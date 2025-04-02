import { useContext, useEffect, useState } from "react";
import "./getAllPostsUser.css";
import SessionContext from "../context/sessionContext.js";

export default function GetAllPosts() {
  const { posts, setPosts } = useContext(SessionContext);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(`http://localhost:3002/api/post/all`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    getPosts();
  }, []);

  return (
    <div className="container">
      {allPosts.map((value, index) => (
        <div key={index} className="divBorder">
          <h1>{value.title}</h1>
          <p>{value.category}</p>
          <p>{value.place}</p>
          <p>{value.date}</p>
        </div>
      ))}
    </div>
  );
}