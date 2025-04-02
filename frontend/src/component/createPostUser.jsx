import { useContext } from "react";
import "./createPostUser.css";
import SessionContext from "../context/sessionContext";

export default function Create() {
  const { setPosts } = useContext(SessionContext);
  async function sendData(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const createPostData = {
      title: formData.get("title"),
      category: formData.get("category"),
      place: formData.get("place"),
      date: formData.get("date"),
    };

    try {
      const promise = await fetch("http://localhost:3002/api/post/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(createPostData),
      });
      const response = await promise.json();

      if (!promise.ok) {
        return console.log("Promise has not been sent.");
      }

      setPosts((prevValue) => [...prevValue, response]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={sendData} className="create">
        <h2>Create post</h2>
        <input name="title" type="text" placeholder="Title" required />
        <select name="category">
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Festival">Festival</option>
            <option value="Other">Other</option>
        </select>
        <select name="place">
            <option value="Kaunas">Kaunas</option>
            <option value="Vilnius">Vilnius</option>
            <option value="Klaipeda">Klaipeda</option>
        </select>
        <input name="date" type="date" placeholder="Date" required/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}