import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import blogContext from "../Context/blogContext";

function LoginPage() {
  const context = useContext(blogContext);
  const history = useHistory();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  console.log("loading: " + loading);

  const handleSubmit = (e) => {
    console.log(JSON.stringify(form));
    context.setExpiredToken(false);
    fetch("https://agustingrm-blog-api.herokuapp.com/users/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          localStorage.setItem("token", result.token);
          context.tokenExp();
          history.push("/home");
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    e.preventDefault();
  };

  useEffect(() => {
    context.tokenExp();
    console.log(context.expiredToken);
    if (localStorage.getItem("login")) {
      history.push("/home");
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input type="text" label="username" name="username" value={form.username} onChange={handleChange} />
      <label>Password</label>
      <input type="password" label="password" name="password" value={form.password} onChange={handleChange} />
      <input type="submit" />
    </form>
  );
}

export default LoginPage;
