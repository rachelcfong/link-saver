import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "firebase";

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
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      const user = firebase.auth().currentUser;
      db.collection("users")
        .doc(user?.uid)
        .set({ email: email })
        .then(() => {
          console.log("added new user");
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
