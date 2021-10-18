import React, { useState } from "react";
import blogContext from "./blogContext";

function GlobalState({ children }) {
  // const [userLogin, setUserLogin] = useState(false);
  const [loginTime, setLoginTime] = useState(localStorage.getItem("date"));

  const loginUser = (token) => {
    // setUserLogin(true);
    //Passport cookie last two hours, 7200000 miliseconds
    localStorage.setItem("date", Date.now());
  };

  const logoutUser = () => {
    // setUserLogin(false);
    localStorage.removeItem("date");
  };

  return (
    <blogContext.Provider value={{loginUser, logoutUser, loginTime, setLoginTime }}>{children}</blogContext.Provider>
  );
}

export default GlobalState;
