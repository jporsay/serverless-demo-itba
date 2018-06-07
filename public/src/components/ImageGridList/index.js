import React from "react";
import compose from "recompose/compose";
import {
  GridList,
  GridListTile,
  IconButton,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  withStyles,
  withWidth
} from "@material-ui/core";
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
    height: 200,
    paddingTop: "60%"
  }
});

const mapWidthToCols = width => {
  if (width === "sm" || width === "xs") {
    return 1;
  }
  if (width === "md") {
    return 2;
  }
  if (width === "lg") {
    return 3;
  }
  if (width === "xl") {
    return 4;
  }
};

function downloadImage(url) {
  window.open(url);
}

const ImageGridList = compose(
  withStyles(gridStyles),
  withWidth()
)(({ classes, images, width }) => {
  return (
    <GridList
      className={classes.root}
      cols={mapWidthToCols(width)}
      cellHeight={550}
    >
      {images.map(image => (
        <GridListTile key={image.uid} cols={1}>
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
});

export default ImageGridList;
