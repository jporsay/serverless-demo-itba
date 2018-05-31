import React, { Component } from "react";
import { withStyles, Grid } from "@material-ui/core";
import ImageGridList from "components/ImageGridList";
import AppContainer from "containers/AppContainer";

const styles = theme => ({
  container: {
    padding: "8px",
    flex: 1,
    overflow: "hidden"
  }
});

class GalleryPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppContainer
        content={
          <Grid container direction="column" className={classes.container}>
            <ImageGridList
              images={[
                {
                  url: "https://placekitten.com/g/300/300",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/100/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/600",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/300",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/100/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/600",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/300",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/100/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/600",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/300",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/100/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/600",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/300",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/300/400",
                  author: "John Doe"
                },
                {
                  url: "https://placekitten.com/g/100/400",
                  author: "John Doe"
                },
                { url: "https://placekitten.com/g/300/600", author: "John Doe" }
              ]}
            />
          </Grid>
        }
      />
    );
  }
}

export default withStyles(styles)(GalleryPage);
