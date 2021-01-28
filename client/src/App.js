import React from 'react';
import "./App.css";
// import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            {/* <Navbar /> */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
