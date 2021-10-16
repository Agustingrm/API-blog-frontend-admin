import { useContext } from "react";
import blogContext from "../Context/blogContext";

function Menu() {
  const context = useContext(blogContext);

  return (
    <div>
      <h1>Title</h1>
      <ul>
        <li>Log in</li>
        <li>Log out</li>
      </ul>
    </div>
  );
}

export default Menu;
