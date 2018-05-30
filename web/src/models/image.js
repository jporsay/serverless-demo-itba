class Image {
  static fromFirebase(ref) {}

  constructor(ref, name, url) {
    this.name = name;
    this.url = url;
    this.ref = ref;
  }
}
