import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import SignIn from "./SignIn";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Route exact path="/">
            <Redirect to="/signup" />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
        </AuthProvider>
      </Switch>
    </Router>
  );
};

export default App;
