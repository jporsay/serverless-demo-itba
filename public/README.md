# Cloudie: Serverless demo

### About
This project was created to demo some features of serverless architectures. We focused on cloud storage, functions, database and authentication.

### Prerequisites

The project requires [Yarn](https://yarnpkg.com/en/docs/instal) to handle package dependencies and project execution.

### Getting started

First, we need to install the required dependencies for the project:

```bash
yarn install
```

Once those dependencies are installed, we can deploy the project with the following command:

```bash
yarn start
```

### Deployment

To deploy the project, you'll need to execute the following command:

```bash
yarn run build
```

This will generate an optimized and production-ready build inside the `build` folder.

### Dependencies

This project requires various libraries in order to work.

* [React](https://reactjs.org/)
  * Used to build the user interface
* [Material-UI](https://material-ui.com/)
  * Used to get pre-built react components following Material Design
* [Moment.js](https://momentjs.com/)
  * Used to pretty-format dates
* [React Router](https://reacttraining.com/react-router/)
  * Used to handle application routing
* [JavaScript Load Image](https://blueimp.github.io/JavaScript-Load-Image/)
  * Used to fix EXIF orientation issues when capturing or loading images with a mobile device
* [Recompose](https://github.com/acdlite/recompose)
  * Used to compose React High-Order Components
* [React Webcam](https://github.com/mozmorris/react-webcam)
  * Used for the `Webcam` react component
* [Firebase](https://firebase.google.com/docs/web/setup)
  * Used for everything related to Firebase (Functions, Storage, Database, Authentication)
