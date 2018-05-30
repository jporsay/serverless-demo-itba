import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import ImageGridList from "components/ImageGridList";

const styles = theme => ({
  container: {
    padding: "8px",
    flex: 1
  }
});

class GalleryPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column" className={classes.container}>
        <ImageGridList
          images={[
            { url: "https://placekitten.com/g/300/300" },
            { url: "https://placekitten.com/g/300/400" },
            { url: "https://placekitten.com/g/100/400" },
            { url: "https://placekitten.com/g/300/600" }
          ]}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(GalleryPage);
