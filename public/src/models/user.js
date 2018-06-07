class User {
  static fromFirebase(user, token) {
    return new User(user.uid, user.displayName, user.email, token);
  }

  constructor(uuid, name, email, token) {
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.token = token;
  }
}

export default User;
