import React from "react";
import PropTypes from "prop-types";
import Image from "models/image";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  withStyles
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

const gridStyles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});
const ImageGridList = withStyles(gridStyles)(({ classes, images }) => {
  return (
    <GridList className={classes.root} cols={1} cellHeight={400}>
      {images.map(image => (
        <GridListTile key={image.url + image.author} cols={1}>
          <img src={image.url} />
          <GridListTileBar
            title={image.title}
            subtitle={<span>by: {image.author}</span>}
            actionIcon={
              <IconButton className={classes.icon}>
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  );
});

export default ImageGridList;
