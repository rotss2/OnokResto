import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ReservationForm from "./components/ReservationForm";
import Reservations from "./components/Reservations";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/book" component={ReservationForm} />
        <Route path="/reservations" component={Reservations} />
      </Switch>
    </Router>
  );
}

export default App;