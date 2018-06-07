import React, { Component } from "react";
import { withStyles, Grid, Button } from "@material-ui/core";
import AppContainer from "containers/AppContainer";
import Dropzone from "react-dropzone";
import FileUpload from "@material-ui/icons/FileUpload";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import { imageStore } from "server/firebase";
import { Redirect } from "react-router-dom";
import * as loadImage from "blueimp-load-image";

const styles = theme => ({
  container: {
    flex: 1,
    flexDirection: "column",
    overflow: "auto"
  },
  upload: {
    paddingBottom: "5vh",
    paddingTop: "2vh"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  uploading: {
    marginTop: "auto"
  },
  content: {
    flex: 1,
    flexDirection: "column",
    paddingTop: "30vh"
  },
  content_preview: {
    flex: 1,
    flexDirection: "column",
    paddingTop: "5vh",
    overflow: "auto"
  }
});

class UploadPage extends Component {
  state = {
    file: null,
    uploaded: false,
    uploading: false
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
            <Grid item className={classes.uploading}>
              <Fade in={this.state.uploading}>
                <LinearProgress color="secondary" />
              </Fade>
            </Grid>
            <Grid
              item
              className={
                this.state.file ? classes.content_preview : classes.content
              }
            >
              {content}
            </Grid>
            <Grid item className={classes.upload}>
              {this.state.file ? (
                <Button
                  disabled={this.state.uploading}
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
      let file = accepted[0];
      const loadImageOptions = { canvas: true, orientation: true };
      loadImage(
        file,
        canvas => {
          file.preview = canvas.toDataURL(file.type);
        },
        loadImageOptions
      );
      this.setState({ file: accepted[0] });
    }
  };

  onUpload = () => {
    this.setState({ uploading: true });
    imageStore()
      .child(this.state.file.name)
      .put(this.state.file)
      .then(snapshot => {
        this.setState({ uploaded: true });
      });
  };
}

export default withStyles(styles)(UploadPage);
