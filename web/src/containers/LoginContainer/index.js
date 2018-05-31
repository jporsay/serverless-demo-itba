import React, { Component } from "react";
import { withStyles, Grid, Typography, Button } from "@material-ui/core";
import { loginProvider } from "server/firebase";
import LoginAware from "components/LoginAware";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
    padding: "16px",
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    height: "100vh",
    backgroundColor: theme.palette.primary.dark
  },
  title: {
    marginBottom: "20vh"
  }
});

class InnerLoginContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} justify="center" align="center">
        <Typography variant="display3" className={classes.title}>
          InstaCat
        </Typography>
        <Grid item>
          <Button variant="raised" onClick={this.onLoginClick}>
            Login with google
          </Button>
        </Grid>
      </Grid>
    );
  }

  onLoginClick = () => {
    loginProvider.login(
      (firebaseUser, accessToken) => {
        // Nothing to be done here.
      },
      error => {}
    );
  };
}

const LoginContainer = props => {
  return (
    <LoginAware
      loggedInComponent={<Redirect to="/" />}
      loggedOutComponent={<InnerLoginContainer {...props} />}
    />
  );
};

export default withStyles(styles)(LoginContainer);
