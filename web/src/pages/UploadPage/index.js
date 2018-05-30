import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import ImageGridList from "components/ImageGridList";

const styles = theme => ({
  container: {
    padding: "8px",
    flex: 1
  }
});

class UploadPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column" className={classes.container}>
        <input
          accept="image/*"
          className={classes.input}
          id="file-input"
          multiple
          type="file"
        />
        <label htmlFor="file-input">
          <Button variant="raised" component="span">
            Upload
          </Button>
        </label>
      </Grid>
    );
  }
}

export default withStyles(styles)(UploadPage);
