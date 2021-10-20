import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import blogContext from "../Context/blogContext";

function NewPost() {
  const history = useHistory();
  const context = useContext(blogContext);
  const decodeToken = () => {
    if (localStorage.getItem("token")) {
      let decoded = jwt_decode(localStorage.getItem("token"));
      return decoded.username;
    } else {
      history.push("/");
      return "";
    }
  };
  let author = decodeToken();
  const [form, setForm] = useState({ author: author, title: "", content: "" });

  const handleSubmit = (e) => {
    console.log(JSON.stringify(form));
    fetch("https://agustingrm-blog-api.herokuapp.com/posts/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          history.push("/home");
        },
        (error) => {
          console.log(error);
        }
      );
    e.preventDefault();
  };

  useEffect(() => {
    context.tokenExp();
    if (context.expiredToken) {
      history.push("/");
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Post Title</label>
        <input type="text" label="title" name="title" value={form.title} onChange={handleChange} />
        <label>Post Content</label>
        <textarea type="text" label="content" name="content" value={form.content} onChange={handleChange}></textarea>
        <input type="submit" />
      </form>
      <Link to="/home">Back to Home</Link>
    </div>
  );
}

export default NewPost;
