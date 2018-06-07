import { storage } from "server/firebase";

class Image {
  static fromFirebase(ref) {
    return new Image(ref.author, ref.imagePath, ref.thumbPath, ref.uploadTime);
  }

  constructor(author, imageUrl, thumbUrl, uploadTime) {
    this.author = author;
    this.imageUrl = imageUrl;
    this.thumbUrl = thumbUrl;
    this.uploadTime = uploadTime;
  }
}
export default Image;
