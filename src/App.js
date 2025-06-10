import React, { Component } from "react";
import "./App.css";
import SliderLayout from "./components/layout";
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import NotFound from "./components/404";
import Login from "./components/login";
import socketIOClient from "socket.io-client";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/main">
              <SliderLayout />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
