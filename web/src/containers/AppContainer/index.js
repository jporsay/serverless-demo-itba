import React, { Component } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Grid,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  GridList
} from "@material-ui/core";
import { PhotoLibrary, CameraAlt, CloudUpload } from "@material-ui/icons";
import ImageGridList from "../../components/ImageGridList";

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
      // <div className={classes.app}>
      <Grid container direction="column" className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Hola
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" className={classes.imageList}>
          <ImageGridList
            images={[
              { url: "https://placekitten.com/g/300/300" },
              { url: "https://placekitten.com/g/300/400" },
              { url: "https://placekitten.com/g/100/400" },
              { url: "https://placekitten.com/g/300/600" }
            ]}
          />
        </Grid>
        <BottomNavigation showLabels className={classes.nav}>
          <BottomNavigationAction label="Pictures" icon={<PhotoLibrary />} />
          <BottomNavigationAction label="Take picture" icon={<CameraAlt />} />
          <BottomNavigationAction
            label="Upload picture"
            icon={<CloudUpload />}
          />
        </BottomNavigation>
      </Grid>
      // </div>
    );
  }
}

export default withStyles(styles)(AppContainer);
