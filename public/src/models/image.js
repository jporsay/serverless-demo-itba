import { storage } from "server/firebase";

class Image {
  static fromFirebase(ref, uid) {
    return new Image(
      uid,
      ref.author,
      ref.imagePath,
      ref.thumbPath,
      ref.uploadTime
    );
  }

  constructor(uid, author, imageUrl, thumbUrl, uploadTime) {
    this.uid = uid;
    this.author = author;
    this.imageUrl = imageUrl;
    this.thumbUrl = thumbUrl;
    this.uploadTime = uploadTime;
  }
}
export default Image;
