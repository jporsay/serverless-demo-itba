import firebase from "firebase/app";
import React, { Component } from "react";
import User from "models/user";
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
        var token = result.credential.accessToken;
        var user = result.user;
        onComplete(user, token);
      })
      .catch(error => {
        onError(error);
      });
  }
}

const loginProvider = new LoginProvider();

function withUser(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.unsuscribeCallback = null;
      this.state = {
        user: null
      };
    }

    componentDidMount() {
      this.unsuscribeCallback = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            user: User.fromFirebase(user)
          });
        } else {
          this.setState({
            user: null
          });
        }
      });
    }
    componentWillUnmount() {
      if (this.unsuscribeCallback) {
        this.unsuscribeCallback();
      }
    }

    render() {
      return <WrappedComponent user={this.state.user} {...this.props} />;
    }
  };
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      /* Success */
    })
    .catch(() => {
      /* Error */
    });
}

function imageStore() {
  let ref = storage.ref().child("images");
  if (firebase.auth().currentUser) {
    ref = ref.child(firebase.auth().currentUser.uid);
  }
  return ref;
}

export default firebase;
export {
  storage,
  functions,
  auth,
  database,
  loginProvider,
  withUser,
  logout,
  imageStore
};
