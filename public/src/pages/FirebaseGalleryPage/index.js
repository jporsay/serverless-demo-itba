import React, { Component } from "react";
import { galleryStore } from "server/firebase";
import GalleryPage from "pages/GalleryPage";
import Image from "models/image";

class FirebaseGalleryPage extends Component {
  unsuscribe = null;
  state = {
    images: []
  };

  componentDidMount() {
    this.unsuscribe = galleryStore()
      .orderBy("uploadTime", "desc")
      .limit(100)
      .onSnapshot(doc => {
        var images = [];
        doc.forEach(im => images.push(Image.fromFirebase(im.data(), im.id)));
        this.setState({
          images
        });
      });
  }

  componentWillUnmount() {
    this.unsuscribe();
  }

  render() {
    return <GalleryPage images={this.state.images} />;
  }
}

export default FirebaseGalleryPage;
