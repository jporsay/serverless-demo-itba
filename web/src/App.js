import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "typeface-roboto";
import AppContainer from "./containers/AppContainer";

class App extends Component {
  render() {
    return (
      <div>
        <AppContainer />
      </div>
    );
  }
}

export default App;
