import React, { Component } from "react";
import { withStyles, Grid, Button } from "@material-ui/core";
import AppContainer from "containers/AppContainer";
import Webcam from "react-webcam";
import { imageStore } from "server/firebase";
import { Redirect } from "react-router-dom";

const webcamStyles = theme => ({
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

class WebcamCapture extends React.Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.props.onCapture(imageSrc);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.container}
        justify="center"
        align="center"
      >
        <Grid item>
          <Webcam
            audio={false}
            height={350}
            width={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
          />
        </Grid>
        <Grid item>
          <Button variant="raised" component="span" onClick={this.capture}>
            Capture
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const WebcamCaptureStyled = withStyles(webcamStyles)(WebcamCapture);

const pageStyles = theme => ({
  container: {
    padding: "8px",
    flex: 1,
    flexDirection: "column",
    overflow: "auto"
  },
  upload: {
    paddingTop: "10px"
  },
  webcam: {
    paddingBottom: "10px",
    overflow: "visible"
  }
});

class UploadPage extends Component {
  state = {
    image: null,
    uploaded: false
  };

  render() {
    const { classes } = this.props;
    const content = this.state.image ? (
      <Grid
        container
        // className={classes.container}
        justify="center"
        align="center"
      >
        <img src={this.state.image} height="100%" />
      </Grid>
    ) : (
      <WebcamCaptureStyled onCapture={this.onCapture} />
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
            {/* <Grid item className={classes.webcam}> */}
            {content}
            {/* </Grid> */}
            <Grid item className={classes.upload}>
              <Button variant="raised" component="span" onClick={this.onUpload}>
                Upload
              </Button>
              {this.state.image ? (
                <Button
                  variant="raised"
                  component="span"
                  onClick={this.onRetake}
                >
                  Retake
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

  onCapture = image => {
    console.log(image);
    this.setState({ image });
  };

  onRetake = () => {
    this.setState({ image: null });
  };

  onUpload = () => {
    const currentDate = new Date();
    imageStore()
      .child(currentDate.toString())
      .putString(this.state.image, "data_url")
      .then(snapshot => {
        this.setState({ uploaded: true });
      });
  };
}

export default withStyles(pageStyles)(UploadPage);
