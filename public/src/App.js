import React from "react";
import "./App.css";
import "typeface-roboto";
import FirebaseGalleryPage from "pages/FirebaseGalleryPage";
import UploadPage from "pages/UploadPage";
import CameraPage from "pages/CameraPage";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={FirebaseGalleryPage} />
      <Route exact path="/upload" component={UploadPage} />
      <Route exact path="/camera" component={CameraPage} />
    </div>
  );
};

export default App;
