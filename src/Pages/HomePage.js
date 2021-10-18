import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import blogContext from "../Context/blogContext";
import Posts from "../Components/Posts";

function HomePage() {
  const context = useContext(blogContext);
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch("https://agustingrm-blog-api.herokuapp.com/posts/");
      const productData = await response.json();
      setPosts(productData);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  if (Date.now() - context.loginTime > 7200000 || context.loginTime === undefined) {
    return history.push("/");
  } else {
    return (
      <div>
        <h1>Posts</h1>
        {posts.map((post) => (
          <Posts post={post} />
        ))}
        <Link to="/create-new-post">New Post</Link>
      </div>
    );
  }
}

export default HomePage;
