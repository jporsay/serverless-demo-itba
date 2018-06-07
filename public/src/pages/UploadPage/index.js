import React, { Component } from "react";
import { withStyles, Grid, Button } from "@material-ui/core";
import ImageGridList from "components/ImageGridList";
import AppContainer from "containers/AppContainer";
import Dropzone from "react-dropzone";
import FileUpload from "@material-ui/icons/FileUpload";
import { imageStore } from "server/firebase";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  container: {
    padding: "8px",
    flex: 1,
    flexDirection: "column",
    overflow: "auto"
  },
  upload: {
    paddingTop: "10px"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class UploadPage extends Component {
  state = {
    file: null,
    uploaded: false
  };

  componentWillUnmount() {
    if (this.state.file) {
      window.URL.revokeObjectURL(this.state.file.preview);
    }
  }

  render() {
    const { classes } = this.props;
    const content = this.state.file ? (
      <img src={this.state.file.preview} width="80%" />
    ) : (
      <Dropzone accept="image/*" onDrop={this.onDrop} />
    );
    return this.state.uploaded ? (
      <Redirect to="/" />
    ) : (
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
              {this.state.file ? (
                <Button
                  variant="raised"
                  component="span"
                  onClick={this.onUpload}
                >
                  Upload
                  <FileUpload className={classes.rightIcon} />
                </Button>
              ) : (
                <div />
              )}
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

  onUpload = () => {
    imageStore()
      .child(this.state.file.name)
      .put(this.state.file)
      .then(snapshot => {
        this.setState({ uploaded: true });
      });
  };
}

export default withStyles(styles)(UploadPage);
