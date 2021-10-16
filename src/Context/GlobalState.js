import React, { useState } from "react";
import blogContext from "./blogContext";

function GlobalState({ children }) {
  const [userLogin, setUserLogin] = useState();
  const [loginTime, setLoginTime] = useState(localStorage.getItem("date"));

  const loginUser = (token) => {
    console.log('asdasd')
    setUserLogin(true);
    localStorage.setItem("token", token);
    //The token last two hours, 7200000 miliseconds
    localStorage.setItem("date", Date.now());
  };

  const logoutUser = () => {
    setUserLogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("date");
  };

  return (
    <blogContext.Provider value={{ userLogin, loginUser, logoutUser, loginTime, setLoginTime }}>{children}</blogContext.Provider>
  );
}

export default GlobalState;
