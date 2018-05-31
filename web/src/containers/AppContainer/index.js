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
import { logout } from "server/firebase";
import { Link } from "react-router-dom";

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
    state = {
      value: 0
    };
    render() {
      const { classes } = this.props;
      const { value } = this.state;
      return (
        <BottomNavigation
          showLabels
          value={value}
          onChange={this.handleChange}
          className={classes.nav}
        >
          <BottomNavigationAction label="Pictures" icon={<PhotoLibrary />} />
          <BottomNavigationAction label="Take picture" icon={<CameraAlt />} />
          <BottomNavigationAction
            label="Upload picture"
            icon={<CloudUpload />}
          />
        </BottomNavigation>
      );
    }
    handleChange = (event, value) => {
      console.log(value);
      console.log(event);
      this.setState({ value });
    };
  }
);

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
                <Button color="inherit" component={Link} to="/login">
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
  }
);

class AppContainer extends Component {
  render() {
    const { classes, content } = this.props;
    return (
      <Grid container direction="column" className={classes.root}>
        <AppTopNavigation />
        {content}
        <AppBottomNavigation />
      </Grid>
    );
  }

  onLogin = () => {};

  onLogout = () => {
    logout();
  };
}

export default withStyles(styles)(AppContainer);
