import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredUserData = () => {
  const storedToken = JSON.parse(localStorage.getItem("userData"));

  if (storedToken) {
    const remainingTime = calculateRemainingTime(storedToken.expirationTime);

    if (remainingTime <= 50000) {
      localStorage.removeItem("userData");
      return null;
    }
  }

  return storedToken;
};

export const AuthContextProvider = (props) => {
  const storedUserData = retrieveStoredUserData();

  let initialUserData = {
    userId: null,
    token: null,
    expirationTime: null,
  };

  if (storedUserData) {
    initialUserData = storedUserData;
  }

  const [userId, setUserId] = useState(initialUserData.userId);
  const [token, setToken] = useState(initialUserData.token);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback((uid, newToken, expirationTime) => {
    setUserId(uid);
    setToken(newToken);

    const updatedExpirationTime =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60 * 2);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: newToken,
        expirationTime: updatedExpirationTime,
      })
    );

    const remainingTime = calculateRemainingTime(updatedExpirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  }, []);

  useEffect(() => {
    if (storedUserData) {
      const remainingTime = calculateRemainingTime(
        storedUserData.expirationTime
      );
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
  }, [storedUserData]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        token: token,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
