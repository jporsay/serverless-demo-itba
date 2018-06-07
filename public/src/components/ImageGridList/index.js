import React from "react";
import PropTypes from "prop-types";
import Image from "models/image";
import compose from "recompose/compose";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Avatar,
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  withStyles,
  withWidth
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Save } from "@material-ui/icons";
import moment from "moment";

const gridStyles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
    // backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  card: {},
  media: {
    height: 0,
    paddingTop: "60%"
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

function downloadImage(url) {
  window.open(url);
}

const ImageGridList = compose(withStyles(gridStyles), withWidth())(
  ({ classes, images, width }) => {
    return (
      <GridList
        className={classes.root}
        cols={mapWidthToCols(width)}
        cellHeight={380}
      >
        {images.map(image => (
          <GridListTile key={image.thumbUrl} cols={1}>
            <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar src={image.author.pic} />}
                title={image.author.name}
                subheader={moment(image.uploadTime).fromNow()}
                action={
                  <IconButton onClick={() => downloadImage(image.imageUrl)}>
                    <Save />
                  </IconButton>
                }
              />
              <CardMedia image={image.thumbUrl} className={classes.media} />
            </Card>
          </GridListTile>
        ))}
      </GridList>
    );
  }
);

export default ImageGridList;