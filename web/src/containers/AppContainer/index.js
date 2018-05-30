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
import GalleryPage from "pages/GalleryPage";

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
  },
  nav: {
    marginBottom: "auto"
  }
});

class AppContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column" className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              InstaCat
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <GalleryPage />
        <BottomNavigation showLabels className={classes.nav}>
          <BottomNavigationAction label="Pictures" icon={<PhotoLibrary />} />
          <BottomNavigationAction label="Take picture" icon={<CameraAlt />} />
          <BottomNavigationAction
            label="Upload picture"
            icon={<CloudUpload />}
          />
        </BottomNavigation>
      </Grid>
    );
  }
}

export default withStyles(styles)(AppContainer);
