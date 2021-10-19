import React, { useState } from "react";
import blogContext from "./blogContext";

function GlobalState({ children }) {
  // const [userLogin, setUserLogin] = useState(false);
  const [loginTime, setLoginTime] = useState(localStorage.getItem("date"));

  const loginUser = (token) => {
    // setUserLogin(true);
    //Token lasts for 2 hours, 7200000
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
