# house-martell-project 

> Client

## About

React-native client that talks to the Feathers-based server.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

2. Install react native CLI

    ```
    npm install -g react-native-cli
    ```

3. Install your dependencies
   
    ```
    cd path/to/house-martell-project/client;
    ```
    
    ##### npm
    ```
    npm install
    ```
    ##### yarn
    ```
    yarn install
    ```

4. Start the development server

    ```
    react-native start
    ```

5. Start the Android app

    ```
    react-native run-android
    ```

### If Connecting to local server

1. Change 'API_URL' in house-martell-project/client/src/Store.js to your
   local address (port 8080)

2. Start the server in house-martell-project/server

