import { storage } from "server/firebase";

class Image {
  static fromFirebase(ref) {
    return new Image(
      ref.name,
      ref.imagePath,
      ref.thumbPath,
      ref.uploadTime,
      ref.pic
    );
  }

  constructor(name, imageUrl, thumbUrl, uploadTime, pic) {
    this.name = name;
    this.pic = pic;
    this.imageUrl = imageUrl;
    this.thumbUrl = thumbUrl;
    this.uploadTime = uploadTime;
  }
}
export default Image;
