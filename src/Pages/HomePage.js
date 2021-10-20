import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Posts from "../Components/Posts";
import blogContext from "../Context/blogContext";

function HomePage() {
  const history = useHistory();
  const context = useContext(blogContext);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch("https://agustingrm-blog-api.herokuapp.com/posts/");
      const postsData = await response.json();
      setPosts(postsData);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    context.tokenExp();
    if (context.expiredToken) {
      history.push("/");
    }
  }, []);

  const handleSubmitLogout = (e) => {
    localStorage.setItem("token", "");
    localStorage.setItem("date", "");
    history.push("/");
  };

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Posts post={post} key={post._id} />
      ))}
      <Link to="/create-new-post">New Post</Link>
      <button onClick={handleSubmitLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
