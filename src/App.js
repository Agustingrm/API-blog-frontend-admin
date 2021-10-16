import { BrowserRouter, Route } from "react-router-dom";
import GlobalState from "./Context/GlobalState";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <GlobalState>
      <BrowserRouter>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
