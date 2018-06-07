# Firebase: Getting started

Firebase is a service that works on top of [Google Cloud](https://cloud.google.com/) to bring the benefits of serverless architecture to the end-user, so that they don't have to worry about managing or scaling servers and can focus on the problem at hand.

## Prerequisites

### Firebase Registration

In order to get firebase working, we first need to register an account with them. This can be done from the following address:

https://firebase.google.com/

### Firebase project creation

- Once an account has been created, we need to go to the _console_ by clicking on the _GO TO CONSOLE_:

![Console](htresources/GoToConsole.png)

- Once in the console, we proceed to create a new project:

![Console](htresources/PreCreateProject.png)

- Choose a project name (don't worry about duplicates since Firebase can handle them) and choose the Country/region that you reside in (this has nothing to do with where Google will host the services).

### Firebase services configuration

Once a project has been created, you'll be presented with a dashboard that contains all of the services that Firebase offers, along with a few useful links to help you setup your project.

![Firebase Dashboard](htresources/FirebaseDashboard.png)

For the sake of this project, we'll show how to configure the web client for Firebase, along with the console tools used to work and deploy Firebase features.

#### Firebase Storage

Upon selecting **Storage** in the sidebar, we are presented with an initial screen that lets us read about what this service offers, access to the documentation and a _Get started_ link.

![Storage dashboard](htresources/StorageDashboard.png)

Currently, pressing the _Get started_ link, gives an alert showing that by default, _Storage_ is configured to only allow authorised users to read or write to our _Storage_ instance.

Note: For our use-case, we decided that this was too restrictive, since we wanted anonymous users to have read access to the files, so we ended up modifying this default.

Firebase presents us with a screen that shows the state of our storage _bucket_. Here, we can:

- Upload files
- Download files
- Delete files
- Create directories

![Storage details](htresources/StorageDetails.png)

Also here we can access the _Rules_ for our Storage service has configured and usage information, such as how much bandwith was used, how many requests we had and how many files were created for any given period of time.

![Storage sections](htresources/StorageSections.png)

####

## CLI tools installlation

```
npm install -g firebase-tools
firebase login
firebase use serverless-itba
cd functions/
npm install
npm run deploy
```
