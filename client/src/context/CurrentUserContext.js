import React, { useState, createContext, useEffect, useContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:31415/api/me/profile")
      .then((res) => res.json())
      .then((json) => {
        setCurrentUser(json.profile);
        setStatus("idle");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
