import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../Components/Loading";
import blogContext from "../Context/blogContext";

function LoginPage() {
  const context = useContext(blogContext);
  const history = useHistory();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    console.log(JSON.stringify(form));
    setLoading(true);
    fetch("https://agustingrm-blog-api.herokuapp.com/users/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // 'x-access-token':localStorage.getItem("token")
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          context.loginUser(result.token);
          console.log(result);
          history.push("/");
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    e.preventDefault();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };
  if (context.userLogin && context.loginTime - Date.now()) {
    return (
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" label="name" name="username" value={form.username} onChange={handleChange} />
        <label>Password</label>
        <input type="password" label="password" name="password" value={form.password} onChange={handleChange} />
        <input type="submit" />
      </form>
    );
  } else {
    console.log(context.userLogin)
    console.log(context.loginTime - Date.now())
    console.log(context.loginTime - Date.now() > -70)
    history.push("/home")
    return <Loading />;
  }
}

export default LoginPage;
