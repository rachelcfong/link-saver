import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </div>
  );
};

export default App;
