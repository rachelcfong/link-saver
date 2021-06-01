import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import AddLink from "./pages/AddLink";
import NewsFeed from "./pages/NewsFeed";
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
          <Route path="/addlink">
            <AddLink />
          </Route>
          <Route path="/newsfeed">
            <NewsFeed />
          </Route>
        </AuthProvider>
      </Switch>
    </Router>
  );
};

export default App;
