import CreatePostUser from "../component/createPostUser";
import "./home.css";
import GetAllPostsUser from "../component/getAllPostsUser";
import GetAllPostsAdmin from "../component/getAllPostsAdmin";
import GetAllPosts from "../component/getAllPosts";
import { useContext } from "react";
import SessionContext from "../context/sessionContext";

export default function Home() {
  const { session } = useContext(SessionContext);
  return (
    <div className="main-container">
      <div className="create">{<CreatePostUser />}</div>
      {session.admin ? <GetAllPostsAdmin /> : <GetAllPostsUser />}
    </div>
  );
}