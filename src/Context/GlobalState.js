import React, { useState } from "react";
import blogContext from "./blogContext";
import jwt_decode from "jwt-decode";

function GlobalState({ children }) {
  const [expiredToken, setExpiredToken] = useState(true);

  const tokenExp = () => {
    if (localStorage.getItem("token")) {
      let decoded = jwt_decode(localStorage.getItem("token"));
      console.log(Date.now());
      if (decoded.exp - Date.now() / 1000 > 0) {
        localStorage.setItem("login",true);
        setExpiredToken(false);
      } else {
        localStorage.setItem("login",false);
        setExpiredToken(true);
      }
    }
  };

  return <blogContext.Provider value={{ expiredToken, setExpiredToken, tokenExp }}>{children}</blogContext.Provider>;
}

export default GlobalState;
