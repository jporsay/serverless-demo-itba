import React, { Component } from "react";
import { withStyles, Grid, Button } from "@material-ui/core";
import ImageGridList from "components/ImageGridList";
import AppContainer from "containers/AppContainer";
import Dropzone from "react-dropzone";

const styles = theme => ({
  container: {
    padding: "8px",
    flex: 1,
    flexDirection: "column",
    overflow: "auto"
  },
  upload: {
    paddingTop: "10px"
  }
});

class UploadPage extends Component {
  state = {
    file: null
  };

  componentWillUnmount() {
    if (this.state.file) {
      window.URL.revokeObjectURL(this.state.file.preview);
    }
  }

  render() {
    const { classes } = this.props;
    const content = this.state.file ? (
      <img src={this.state.file.preview} width="30%" />
    ) : (
      <Dropzone accept="image/*" onDrop={this.onDrop} />
    );
    return (
      <AppContainer
        content={
          <Grid
            container
            className={classes.container}
            justify="center"
            align="center"
          >
            <Grid item>{content}</Grid>
            <Grid item className={classes.upload}>
              <Button variant="raised" component="span">
                Upload
              </Button>
            </Grid>
          </Grid>
        }
      />
    );
  }

  onDrop = (accepted, rejected) => {
    if (accepted.length > 0) {
      if (this.state.file) {
        window.URL.revokeObjectURL(this.state.file.preview);
      }
      this.setState({ file: accepted[0] });
    }
  };
}

export default withStyles(styles)(UploadPage);
