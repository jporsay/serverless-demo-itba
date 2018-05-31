import React from "react";
import "./App.css";
import "typeface-roboto";
import GalleryPage from "pages/GalleryPage";
import UploadPage from "pages/UploadPage";
import LoginContainer from "containers/LoginContainer";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Route path="/login" component={LoginContainer} />
      <Route exact path="/" component={GalleryPage} />
      <Route exact path="/upload" component={UploadPage} />
    </div>
  );
};

export default App;
