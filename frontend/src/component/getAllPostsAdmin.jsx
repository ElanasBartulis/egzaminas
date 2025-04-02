import { useContext, useEffect } from "react";
import "./getAllPostsAdmin.css";
import SessionContext from "../context/sessionContext.js";

export default function GetAllPostsAdmin() {
  const { posts, setPosts } = useContext(SessionContext);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(`http://localhost:3002/api/post/allLogged`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    getPosts();
  }, []);

  async function deletePost(id) {
    try {
      await fetch(`http://localhost:3002/api/post/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const filteredPosts = posts.filter((post) => post.id !== id);
      setPosts(filteredPosts);
    } catch (error) {
      console.log("Delete Fetch Error: ", error);
    }
  }

  async function updatePost(id, e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedData = {
      title: formData.get("title"),
      category: formData.get("category"),
      place: formData.get("place"),
      date: formData.get("date"),
      status: formData.get("status"),
    };

    try {
      const promise = await fetch(
        `http://localhost:3002/api/post/update/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      const response = await promise.json();

      setPosts((prevValue) =>
        prevValue.map((post) => (post.id === id ? response : post))
      );
      // e.target.reset();
    } catch (error) {
      console.log("Update fetch error : ", error);
    }
  }

  return (
    <div className="container">
      {posts.map((value, index) => (
        <form
          key={index}
          onSubmit={(e) => {
            updatePost(value.id, e);
          }}
        >
          <div className="divBorder">
            <div className="inputs">
              <input type="text" name="title" defaultValue={value.title} />
              <input type="date" name="date" defaultValue={value.date} />
              <select name="category" defaultValue={value.category}>
                    <option value="Sports">Sports</option>
                    <option value="Music">Music</option>
                    <option value="Festival">Festival</option>
                    <option value="Other">Other</option>
            </select>
            <select name="place" defaultValue={value.place}>
                    <option value="Kaunas">Kaunas</option>
                    <option value="Vilnius">Vilnius</option>
                    <option value="Klaipeda">Klaipeda</option>
            </select>
              <select name="status" defaultValue={value.status}>
                <option value="Submited">Submited</option>
                <option value="Not-Approved">Not-Approved</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
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
            <p>{value.user?.email}</p>
            <button onClick={() => deletePost(value.id)} className="deleteBtn">
              delete
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      ))}
    </div>
  );
}