import React from "react";
import PropTypes from "prop-types";
import Image from "models/image";
import compose from "recompose/compose";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  withStyles,
  withWidth
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

const mapWidthToCols = width => {
  if (width == "sm" || width == "xs") {
    return 1;
  }
  if (width == "md") {
    return 2;
  }
  if (width == "lg") {
    return 3;
  }
  if (width == "xl") {
    return 4;
  }
};

const ImageGridList = compose(withStyles(gridStyles), withWidth())(
  ({ classes, images, width }) => {
    return (
      <GridList
        className={classes.root}
        cols={mapWidthToCols(width)}
        cellHeight={400}
      >
        {images.map(image => (
          <GridListTile key={image.imageUrl} cols={1}>
            <img src={image.thumbUrl} />
            <GridListTileBar
              title={image.author}
              // subtitle={<span>by: {image.author}</span>}
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
  }
);

export default ImageGridList;
