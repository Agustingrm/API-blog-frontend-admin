import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loading from "../Components/Loading";
import Comments from "../Components/Comments";
import blogContext from "../Context/blogContext";

function UpdatePost(e) {
  const urlId = e.match.params.id;
  const context = useContext(blogContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [data, setData] = useState({ title: "", content: "" });
  const [commentsArray, setCommentsArray] = useState([]);
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

  const getPostData = async () => {
    try {
      const response = await fetch("https://agustingrm-blog-api.herokuapp.com/posts/");
      const postData = await response.json();
      for (let i = 0; i < postData.length; i++) {
        if (postData[i]._id === urlId) {
          setData(postData[i]);
        }
      }
      setLoading(false);
      setForm({ author: author, title: data.title, content: data.content });
    } catch (e) {
      alert(e);
    }
  };

  const [form, setForm] = useState({ author: author, title: data.title, content: data.content });

  const handleSubmit = (e) => {
    fetch("https://agustingrm-blog-api.herokuapp.com/posts/esp/" + urlId + "/", {
      method: "PUT",
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
          history.push("/home");
        },
        (error) => {
          console.log(error);
        }
      );
    e.preventDefault();
  };

  const getPostComments = async () => {
    try {
      const response = await fetch("https://agustingrm-blog-api.herokuapp.com/comments/");
      const data = await response.json();
      let commentsAccu = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].post === urlId) {
          commentsAccu.push(data[i]);
        }
      }
      setCommentsArray(commentsAccu);
      setLoadingComments(false);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getPostData();
  }, [loading]);

  useEffect(() => {
    getPostComments();
  }, [loadingComments]);

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

  if (data.title !== "" && commentsArray !== []) {
    return (
      <div>
        <h1>Update Post</h1>
        <form onSubmit={handleSubmit}>
          <label>Post Title</label>
          <input type="text" label="title" name="title" value={form.title} onChange={handleChange} />
          <label>Post Content</label>
          <textarea type="text" label="content" name="content" value={form.content} onChange={handleChange}></textarea>
          <input type="submit" />
        </form>
        {commentsArray.map((comment) => (
          <Comments comment={comment} key={comment._id} />
        ))}
        <Link to="/home">Back to Home</Link>
      </div>
    );
  } else
    return (
      <div>
        <Loading />
      </div>
    );
}

export default UpdatePost;
