import React from "react";
import { GridList, GridListTile, withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  }
});

const ImageGridList = ({ images }) => {
  return (
    <GridList>
      {images.map(image => (
        <GridListTile key="TODO">
          <img src={image.url} />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default withStyles(styles)(ImageGridList);
