var Parse = require('parse/node');
const PARSE_APPLICATION_ID = 'tW3HTz0fUSdMPmk1hE4qA8c9FbZqcerL3iY1kejp';
const PARSE_JAVASCRIPT_KEY = '1wbQ5EOY8c7z8jTSyfXVNblyphvMEvvXVLfXXOTq';
const PARSE_MASTER_KEY = 'xNXyklOY15pcUMU1RsKqfxwUTG48I40fxGX80plA';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY, PARSE_MASTER_KEY); 
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.Cloud.useMasterKey();

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
      let {username, password, email, spotifyURL, imageURL } = userValue;
      let user = new Parse.User();

      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
      user.set('followers', []);
      user.set("appPassword", password);
      user.set('spotifyURL', spotifyURL);
      user.set('imageURL', imageURL);

      let userPreferences = new Parse.Object('Preferences');
      userPreferences.set('topGenres', []);
      userPreferences.set('topArtists', []);
      userPreferences.set('username', username);

      try {
          await user.signUp();
          await userPreferences.save();
          return "User created!";
      } catch (error) {
          return error.message;
      }
    }

    static async post(username, trackId) {
        let Post = new Parse.Object('Post');
        Post.set('username', username);
        Post.set('trackId', trackId);
        try {
          await Post.save();
          return true;
        } catch (error) {
          return false;
        };
    };

    static async posts() {
        const query = new Parse.Query('Post');
        try {
          let todos = await query.find();
          return todos;
        } catch (error) {
          return {};
        };
    };
    
  static async timeline(username) {
      const query = new Parse.Query('Post');
      query.equalTo("username", username);
      query.descending("createdAt");
      return await query.find();
  };

    static async getPost(username, trackId) {
      const query = new Parse.Query('Post');
      query.equalTo("username", username);
      query.equalTo("trackId", trackId);
      try {
        return await query.first();
      } catch (error) {
        return {};
      };
    };

    static async getUsers() {
      const query = new Parse.Query('User');
      try {
        return await query.find();
      } catch (error) {
        return {};
      };
    }

    static async followUser(currUsername, followUsername) {
      let user = Parse.User.current();
      user.addUnique('followers', followUsername);
      await user.save();
      return true;
    }

    static async unfollowUser(currUsername, unfollowUsername) {
      let user = Parse.User.current();
      user.remove('followers', unfollowUsername);
      await user.save();
      return true;
    }

  static async getFollowers(username) {
    const query = new Parse.Query('User');
    query.equalTo("username", username);
    let user = await query.first({});
    return user.get('followers');
  };

  static async getFeed(username) {
    let followers = await this.getFollowers(username);
    let result = [];
    for (let i = 0; i < followers.length; i++) {
      let userPosts = await this.timeline(followers[i]);
      result = result.concat(userPosts);
    }
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
    (await userQuery.first({})).destroy({});

    const preferencesQuery = new Parse.Query('Preferences');
    preferencesQuery.equalTo("username", username);
    (await preferencesQuery.first({})).destroy({});

    const postsQuery = new Parse.Query('Post');
    postsQuery.equalTo("username", username);
    postsQuery.find().then(function (results) {
      return Parse.Object.destroyAll(results);
    }).then(function() {
    }, function(error) {
    });

    return true;
  };

  static async getAppProfile(username) {
    const query = new Parse.Query('User');
    query.equalTo("username", username);
    return await query.first({}); 
  }

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
    return await query.first({}); 
  }

  static async getProfileByEmail(email) {
    const query = new Parse.Query('User');
    query.equalTo("email", email);
    return await query.first({}); 
  }

  static async getPassword(username) {
    const query = new Parse.Query('User');
    query.equalTo("username", username);
    return (await query.first({})).get('appPassword');
  }

  static async setTopGenres(username, genres) {
    const query = new Parse.Query('Preferences');
    query.equalTo("username", username);
    let result = await query.first({}); 
    result.set('topGenres', genres);
    await result.save();
    return result.get('topGenres');
  }

  static async setTopArtists(username, artists) {
    const query = new Parse.Query('Preferences');
    query.equalTo("username", username);
    let result = await query.first({}); 
    result.set('topArtists', artists);
    await result.save();
    return result.get('topArtists');
  }

  static async getTopGenres(username) {
    const query = new Parse.Query('Preferences');
    query.equalTo("username", username);
    return (await query.first({})).get('topGenres');
  }

  static async getTopArtists(username) {
    const query = new Parse.Query('Preferences');
    query.equalTo("username", username);
    return (await query.first({})).get('topArtists');
  }

  static async createGroup(groupInfo) {
    let {username, groupName, description, isPrivate, genres, isAdmin } = groupInfo;
    let group = new Parse.Object('Group');

    group.set("name", groupName);
    group.set('description', description);
    group.set('isPrivate', isPrivate);
    group.set('genres', genres);

    let relationship = new Parse.Object('UserGroup');
    relationship.set("username", username);
    relationship.set('groupName', groupName);
    relationship.set('isAdmin', isAdmin);

    try {
        await group.save();
        await relationship.save();
        return true;
    } catch (error) {
        return error.message;
    }
  }

  static async getGroup(groupName) {
    const query = new Parse.Query('Group');
    query.equalTo("name", groupName);
    return (await query.first({}));
  }

  static async getGroups(username) {
    const query = new Parse.Query('UserGroup');
    query.equalTo("username", username);
    query.descending("createdAt");
    return await query.find();
  };

  static async joinGroup(username, groupName) {
    let relationship = new Parse.Object('UserGroup');
    relationship.set("username", username);
    relationship.set('groupName', groupName);
    relationship.set('isAdmin', false);

    let usernameQuery = new Parse.Query('Invite');
    usernameQuery.equalTo("username", username);
    let groupNameQuery = new Parse.Query('Invite');
    groupNameQuery.equalTo("groupName", groupName);

    let compoundQuery = Parse.Query.and(usernameQuery, groupNameQuery);
    let result = await compoundQuery.first({}); 
    result.destroy({});

    try {
        await relationship.save();
        return true;
    } catch (error) {
        return error.message;
    }
  }

  static async leaveGroup(username, groupName) {
    let query = new Parse.Query('UserGroup');
    query.equalTo("username", username);
    query.equalTo("groupName", groupName);
    let result = await query.first({}); 
    result.destroy({});
  }

  static async sendInvite(username, groupName) {
    let invite = new Parse.Object('Invite');
    invite.set("username", username);
    invite.set('groupName', groupName);

    try {
        await invite.save();
        return "Invite sent!";
    } catch (error) {
        return error.message;
    }
  }

  static async getInbox(username) {
    const query = new Parse.Query('Invite');
    query.equalTo("username", username);
    query.descending("createdAt");
    let result = await query.find();
    return result;
  };

}

module.exports = User;