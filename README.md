# Table of Contents
* [Walkthrough](#walkthrough)
    * [Build System](#build-system)

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the App](#running-the-app)


# Walkthrough
## Build System
This project uses Gulp and Webpack together for its build system.

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

`Gulp` is the orchestrator:
* Starting and calling Webpack
* Starting a development server (yes, Webpack can do this too)
* Generating boilerplate for the React app


# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`
Once you have these, install the following as globals:  
`npm install -g gulp`

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install dependencies

## Running the App
This project uses Gulp to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `npm run dev:desktop` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.
 