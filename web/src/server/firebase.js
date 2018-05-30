import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyBIDaWOcjRwhLPCwwnWznYOC9IYkud8L-Y",
  authDomain: "serverless-itba.firebaseapp.com",
  databaseURL: "https://serverless-itba.firebaseio.com",
  projectId: "serverless-itba",
  storageBucket: "serverless-itba.appspot.com",
  messagingSenderId: "853714934648"
};

firebase.initializeApp(config);

let storage = firebase.storage();
let functions = firebase.functions();
let auth = firebase.auth();
let database = firebase.database();

class LoginProvider {
  login(onComplete, onError) {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        onComplete(user, token);
      })
      .catch(error => {
        onError(error);
      });
  }
}

const loginProvider = new LoginProvider();

export default firebase;
export { storage, functions, auth, database, loginProvider };
