import React, { Component } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Grid,
  withStyles,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import { PhotoLibrary, CameraAlt, CloudUpload } from "@material-ui/icons";
import LoginAware from "components/LoginAware";
import { logout, loginProvider } from "server/firebase";
import { Link, Redirect, withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flex: 1,
    flexGrow: 1,
    height: "100vh"
  },
  flex: {
    flex: 1
  },
  imageList: {
    padding: "8px",
    flex: 1
  }
});

const bottomStyles = theme => ({
  nav: {
    marginBottom: "auto"
  }
});

const AppBottomNavigation = withStyles(bottomStyles)(
  class extends Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
        value: props.location.pathname,
        valueChanged: false
      };
    }

    render() {
      const { classes } = this.props;
      const { value, valueChanged } = this.state;
      return valueChanged ? (
        <Redirect to={value} />
      ) : (
        <BottomNavigation
          showLabels
          value={value}
          onChange={this.handleChange}
          className={classes.nav}
        >
          <BottomNavigationAction
            label="Pictures"
            icon={<PhotoLibrary />}
            value="/"
          />
          <BottomNavigationAction
            label="Take picture"
            icon={<CameraAlt />}
            value="/camera"
          />
          <BottomNavigationAction
            value="/upload"
            label="Upload picture"
            icon={<CloudUpload />}
          />
        </BottomNavigation>
      );
    }
    handleChange = (event, value) => {
      if (value !== this.state.value) {
        this.setState({ value, valueChanged: true });
      }
    };
  }
);

const AppBottomNavigationWithRouter = withRouter(AppBottomNavigation);

const topStyles = theme => ({
  flex: {
    flex: 1
  }
});

const AppTopNavigation = withStyles(topStyles)(
  class extends Component {
    render() {
      const { classes } = this.props;
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              InstaCat
            </Typography>
            <LoginAware
              loggedInComponent={
                <Button color="inherit" onClick={this.onLogout}>
                  Logout
                </Button>
              }
              loggedOutComponent={
                <Button color="inherit" onClick={this.onLogin}>
                  Login
                </Button>
              }
            />
          </Toolbar>
        </AppBar>
      );
    }

    onLogout = () => {
      logout();
    };

    onLogin = () => {
      loginProvider.login(
        (firebaseUser, accessToken) => {
          // Nothing to be done here.
        },
        error => {}
      );
    };
  }
);

class AppContainer extends Component {
  render() {
    const { classes, content } = this.props;
    return (
      <Grid container direction="column" className={classes.root}>
        <AppTopNavigation />
        {content}
        <AppBottomNavigationWithRouter />
      </Grid>
    );
  }
}

export default withStyles(styles)(AppContainer);
