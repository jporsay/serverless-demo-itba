import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import ImageGridList from "components/ImageGridList";
import AppContainer from "containers/AppContainer";

const styles = theme => ({
  container: {
    padding: "8px",
    flex: 1,
    overflow: "hidden",
    backgroundColor: theme.palette.background.default
  }
});

class GalleryPage extends Component {
  render() {
    const { classes, images } = this.props;
    return (
      <AppContainer
        content={
          <Grid container direction="column" className={classes.container}>
            <ImageGridList images={images} />
          </Grid>
        }
      />
    );
  }
}

export default withStyles(styles)(GalleryPage);
