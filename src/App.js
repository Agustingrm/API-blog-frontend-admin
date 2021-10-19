import { BrowserRouter, Route } from "react-router-dom";
import GlobalState from "./Context/GlobalState";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import NewPost from "./Pages/NewPost";
import UpdatePost from "./Pages/UpdatePost";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <GlobalState>
      <BrowserRouter>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/create-new-post" exact component={NewPost} />
        <Route path="/home/:id" exact component={UpdatePost} />
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
