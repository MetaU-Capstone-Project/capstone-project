// const {storage} = require('../data/storage');
var Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'tW3HTz0fUSdMPmk1hE4qA8c9FbZqcerL3iY1kejp';
const PARSE_JAVASCRIPT_KEY = '1wbQ5EOY8c7z8jTSyfXVNblyphvMEvvXVLfXXOTq';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY); 
Parse.serverURL = 'https://parseapi.back4app.com/';

// TODO 
// const {BadRequestError} = require('../utils/errors')

class User {

    constructor() {
        this.super();
    }

    static getCurrentUser() {
        Parse.User.enableUnsafeCurrentUser();
        let currentUser = Parse.User.current();
        return currentUser;
    }

    static async logUserIn(usernameValue, passwordValue) {
        Parse.User.enableUnsafeCurrentUser();
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        return loggedInUser;
    }

    static async registerUser(userValue) {
        let {username, password} = userValue;
        let user = new Parse.User();
  
        user.set("username", username);
        user.set("password", password);
        try {
            await user.signUp();
            return "User created!";
        } catch (error) {
            return error.message;
        }
    }

    // added
    // TODO add parameters - username, postInfo
    static async post(username, trackId) {
        let Post = new Parse.Object('Post');
        Post.set('username', username);
        Post.set('trackId', trackId);
        try {
          await Post.save();
          // TODO front end stuff;
          // Success
          // alert('Success! To-do created!');
          // Refresh to-dos list to show the new one (you will create this function later)
          // readTodos();
          return true;
        } catch (error) {
          // Error can be caused by lack of Internet connection
          // TODO
          // alert(`Error! ${error.message}`);
          console.log(error.message);
          return false;
        };
    };

    static async posts() {
        // Reading parse objects is done by using Parse.Query
        const query = new Parse.Query('Post');
        try {
          let todos = await query.find();
          // Be aware that empty or invalid queries return as an empty array
          // Set results to state variable
        //   setReadResults(todos);
        //   return true;
            return todos;
        } catch (error) {
          // Error can be caused by lack of Internet connection
        //   alert(`Error! ${error.message}`);
          return {};
        };
    };

    static async timeline(username) {
        // Reading parse objects is done by using Parse.Query
        const query = new Parse.Query('Post');
        query.equalTo("username", username);
        try {
          let posts = await query.find();
          return posts;
        } catch (error) {
          return {};
        };
    };
}

module.exports = User;