import React from "react";
import "./App.css";
import "typeface-roboto";
import GalleryPage from "pages/GalleryPage";
import UploadPage from "pages/UploadPage";
import CameraPage from "pages/CameraPage";
import LoginContainer from "containers/LoginContainer";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={GalleryPage} />
      <Route path="/login" component={LoginContainer} />
      <Route exact path="/upload" component={UploadPage} />
      <Route exact path="/camera" component={CameraPage} />
    </div>
  );
};

export default App;
