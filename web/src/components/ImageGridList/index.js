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
import moment from "moment";

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
          <GridListTile key={image.imagePath} cols={1}>
            <img src={image.author.pic} />
            <GridListTileBar
              title={image.author.name}
              subtitle={
                <span style={{ marginBottom: "5px", lineHeight: "1.5" }}>
                  {moment(image.uploadTime).fromNow()}
                </span>
              }
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
