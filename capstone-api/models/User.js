// const {storage} = require('../data/storage');
var Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'tW3HTz0fUSdMPmk1hE4qA8c9FbZqcerL3iY1kejp';
const PARSE_JAVASCRIPT_KEY = '1wbQ5EOY8c7z8jTSyfXVNblyphvMEvvXVLfXXOTq';
const PARSE_MASTER_KEY = 'xNXyklOY15pcUMU1RsKqfxwUTG48I40fxGX80plA';

// Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY); 
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY, PARSE_MASTER_KEY); 
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.Cloud.useMasterKey();

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
        let {username, password, spotifyUsername} = userValue;
        let user = new Parse.User();
  
        console.log('spotify username: ');
        console.log(spotifyUsername);
        user.set("username", username);
        user.set("password", password);
        user.set("spotifyUsername", spotifyUsername);
        try {
            await user.signUp();
            return "User created!";
        } catch (error) {
            console.log('error');
            console.log(error);
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
        const query = new Parse.Query('Post');
        query.equalTo("username", username);
        query.descending("createdAt");
        try {
          let posts = await query.find();
          return posts;
        } catch (error) {
          return {};
        };
    };

    static async getPost(username, trackId) {
      const query = new Parse.Query('Post');
      query.equalTo("username", username);
      query.equalTo("trackId", trackId);
      try {
        // TODO [0] since should only be one?
        let posts = await query.find();
        return posts[0];
      } catch (error) {
        return {};
      };
    };

    // TODO
    static async getUsers() {
      const query = new Parse.Query('User');
      // TODO sort somehow and weigh how to recommend users? 
      try {
        let users = await query.find();
        return users;
      } catch (error) {
        return {};
      };
    }

    // static async followUser(currUsername, followUsername) {
    //   const query = new Parse.Query('User');
    //   query.equalTo("username", currUsername);

    //   query.first({
    //       success: function(user) {
    //       },
    //       error: function(error) {
    //       }
    //   }).then(function (response) {
    //     let res = response.get('followers');
    //     console.log('in then');
    //     console.log(res);
    //     console.log(followUsername);
    //     if (res.includes(followUsername)) {
    //       return "Already following";
    //     } else {
    //       res.push(followUsername);
    //       response.set('followers', res);
    //       response.save();
    //       return "Success";
    //     }
    //   }).catch(function (err) {
    //     console.log('in catch');
    //     return err.message;
    //   });
    // }

    static async followUser(currUsername, followUsername) {
      const query = new Parse.Query('User');
      query.equalTo("username", currUsername);

      query.first({
          success: function(user) {
          },
          error: function(error) {
            // TODO
            console.log(error.message);
            // return false;
          }
      }).then(function (response) {
        let res = response.get('followers');
        res.push(followUsername);
        response.set('followers', res);
        response.save();
        return true;
      }).catch(function (err) {
        console.log(err.message);
        return false;
      });
    }

    static async unfollowUser(currUsername, followUsername) {
      const query = new Parse.Query('User');
      query.equalTo("username", currUsername);

      query.first({
          success: function(user) {
          },
          error: function(error) {
            // TODO
            console.log(error.message);
            // return false;
          }
      }).then(function (response) {
        let res = response.get('followers');
        res.push(followUsername);
        response.set('followers', res);
        response.save();
        return true;
      }).catch(function (err) {
        console.log(err.message);
        return false;
      });
    }
}

module.exports = User;