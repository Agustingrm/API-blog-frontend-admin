import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import blogContext from "../Context/blogContext";

function NewPost() {
  const context = useContext(blogContext);
  const history = useHistory();
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    console.log(JSON.stringify(form));
    fetch("https://agustingrm-blog-api.herokuapp.com/posts/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          history.push("/");
        },
        (error) => {
          console.log(error);
        }
      );
    e.preventDefault();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  if (Date.now() - context.loginTime > 7200000 || context.loginTime === undefined) {
    return history.push("/");
  } else {
    return (
      <div>
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
          <label>Post Title</label>
          <input type="text" label="title" name="title" value={form.title} onChange={handleChange} />
          <label>Post Content</label>
          <input type="text" label="content" name="content" value={form.content} onChange={handleChange} />
          <input type="submit" />
        </form>
        <Link to="/home">Back to Home</Link>
      </div>
    );
  }
}

export default NewPost;
