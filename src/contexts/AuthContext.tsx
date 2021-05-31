import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext({
  currentUser: undefined,
  signup: (email: string, password: string) => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProps = {
  children: any;
};

export const AuthProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
