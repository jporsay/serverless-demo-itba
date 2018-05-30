import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "typeface-roboto";
import AppContainer from "containers/AppContainer";
import LoginContainer from "containers/LoginContainer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    display3: {
      color: "#FFFFFF"
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  render() {
    const content =
      this.state.user != null ? (
        <AppContainer />
      ) : (
        <LoginContainer onSuccess={this.onLoginSuccess} />
      );
    return <MuiThemeProvider theme={theme}>{content}</MuiThemeProvider>;
  }

  onLoginSuccess = user => {
    this.setState({ user });
  };
}

export default App;
