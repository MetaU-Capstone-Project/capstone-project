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

    // TODO modify and call local storage
    static getCurrentUser() {
        Parse.User.enableUnsafeCurrentUser();
        let currentUser = Parse.User.current();
        return currentUser;
    }

    // original
    static async logUserIn(usernameValue, passwordValue) {
        Parse.User.enableUnsafeCurrentUser();
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        console.log('login');
        console.log(loggedInUser);
        return loggedInUser;
    }

    // originally working
    // static async registerUser(userValue) {
    //     let {username, password, spotifyUsername} = userValue;
    //     let user = new Parse.User();

    //     user.set("username", username);
    //     user.set("password", password);
    //     user.set("spotifyUsername", spotifyUsername);
    //     user.set('followers', []);
    //     try {
    //         await user.signUp();
    //         return "User created!";
    //     } catch (error) {
    //         console.log('error');
    //         console.log(error);
    //         return error.message;
    //     }
    // }

    static async registerUser(userValue) {
      let {username, password, email} = userValue;
      let user = new Parse.User();

      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.set('followers', []);
      // added
      user.set("appPassword", password);

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
      let result = await query.find();
      return result;
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

    static async followUser(currUsername, followUsername) {
      let user = Parse.User.current();
      user.addUnique('followers', followUsername);
      await user.save();
      console.log('after following:');
      console.log(user.get('followers'));
      return true;
    }

    // TODO errors
    static async unfollowUser(currUsername, unfollowUsername) {
      let user = Parse.User.current();
      user.remove('followers', unfollowUsername);
      await user.save();
      console.log('after unfollowing:');
      console.log(user.get('followers'));
      return true;
    }

  static async getFollowers(username) {
    const query = new Parse.Query('User');
    query.equalTo("username", username);
    let user = await query.first({});
    // TODO handle errors
    return user.get('followers');
  };

  static async getFeed(username) {
    console.log('ahhh');
    console.log(username);

    let followers = await this.getFollowers(username);
    let result = [];
    for (let i = 0; i < followers.length; i++) {
      let userPosts = await this.timeline(followers[i]);
      result = result.concat(userPosts);
    }
    // TODO handle errors
    // return user.get('followers');
    result.sort(function(a, b) {
      const timeA = a.createdAt;
      const timeB = b.createdAt;
      if (timeA < timeB) {
        return 1;
      }
      if (timeA > timeB) {
        return -1;
      }
    
      return 0;
    });

    return result;
  };

  static async delete(username) {
    const userQuery = new Parse.Query('User');
    userQuery.equalTo("username", username);
    let result = await userQuery.first({}); 
    result.destroy({});

    const postsQuery = new Parse.Query('Post');
    postsQuery.equalTo("username", username);
    postsQuery.find().then(function (results) {
      return Parse.Object.destroyAll(results);
    }).then(function() {
      // Done
      console.log('Deleted all posts asscoiated with ' + username);
    }, function(error) {
      // Error
      console.log('Error deleting all posts asscoiated with ' + username);
    });

    return true;
  };

  static async getAppProfile(username) {
    const query = new Parse.Query('User');
    query.equalTo("username", username);
    let result = await query.first({}); 
    return result;
  }

  // static async getUserExists(spotifyUsername) {
  //   let appUsers = await this.getUsers();
  //   let found = false;
  //   for (let i = 0; i < appUsers.length; i++) {
  //       if (appUsers[i].get('spotifyUsername') == spotifyUsername) {
  //         found = true;
  //         break;
  //     }
  //   }
  //   return found;
  // }

  static async getUserExists(email) {
    let appUsers = await this.getUsers();
    let found = false;
    for (let i = 0; i < appUsers.length; i++) {
        if (appUsers[i].get('email') == email) {
          found = true;
          break;
      }
    }
    return found;
  }

  static async getProfileBySpotifyUsername(spotifyUsername) {
    const query = new Parse.Query('User');
    query.equalTo("spotifyUsername", spotifyUsername);
    let result = await query.first({}); 
    return result;
  }

  static async getProfileByEmail(email) {
    const query = new Parse.Query('User');
    query.equalTo("email", email);
    let result = await query.first({}); 
    return result;
  }

  static async getPassword(username) {
    const query = new Parse.Query('User');
    query.equalTo("username", username);
    let result = await query.first({}); 
    return result.get('appPassword');
  }

}

module.exports = User;