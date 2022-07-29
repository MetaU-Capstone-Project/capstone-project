var Parse = require("parse/node");
const PARSE_APPLICATION_ID = "tW3HTz0fUSdMPmk1hE4qA8c9FbZqcerL3iY1kejp";
const PARSE_JAVASCRIPT_KEY = "1wbQ5EOY8c7z8jTSyfXVNblyphvMEvvXVLfXXOTq";
const PARSE_MASTER_KEY = "xNXyklOY15pcUMU1RsKqfxwUTG48I40fxGX80plA";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY, PARSE_MASTER_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";
Parse.Cloud.useMasterKey();

class User {
  constructor() {
    this.super();
  }

  static getCurrentUser() {
    Parse.User.enableUnsafeCurrentUser();
    return Parse.User.current();
  }

  static async logUserIn(usernameValue, passwordValue) {
    Parse.User.enableUnsafeCurrentUser();
    return await Parse.User.logIn(usernameValue, passwordValue);
  }

  static async registerUser(userValue) {
    let { username, password, email, spotifyURL, imageURL } = userValue;
    let user = new Parse.User();

    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("followers", []);
    user.set("appPassword", password);
    user.set("spotifyURL", spotifyURL);
    user.set("imageURL", imageURL);
    user.set("recentSearches", []);

    let userPreferences = new Parse.Object("Preferences");
    userPreferences.set("topGenres", []);
    userPreferences.set("topArtists", []);
    userPreferences.set("username", username);

    try {
      await user.signUp();
    } catch (error) {
      return `Error with ${username} registering account`;
    }

    try {
      await userPreferences.save();
      return true;
    } catch (error) {
      return `Error with ${username} saving preferences`;
    }
  }

  static async createPost(username, trackId) {
    let Post = new Parse.Object("Post");
    Post.set("username", username);
    Post.set("trackId", trackId);
    try {
      await Post.save();
      return true;
    } catch (error) {
      return `Error with ${username} posting song with track ${trackId}`;
    }
  }

  static async getPosts() {
    const query = new Parse.Query("Post");
    return await query.find();
  }

  static async getTimeline(username) {
    const query = new Parse.Query("Post");
    query.equalTo("username", username);
    query.descending("createdAt");
    return await query.find();
  }

  static async getPost(username, trackId) {
    const query = new Parse.Query("Post");
    query.equalTo("username", username);
    query.equalTo("trackId", trackId);
    return await query.first();
  }

  static async getUsers() {
    const query = new Parse.Query("User");
    return await query.find();
  }

  static async followUser(currUsername, followUsername) {
    let user = Parse.User.current();
    user.addUnique("followers", followUsername);
    await user.save();
    return true;
  }

  static async unfollowUser(currUsername, unfollowUsername) {
    let user = Parse.User.current();
    user.remove("followers", unfollowUsername);
    await user.save();
    return true;
  }

  static async getFollowers(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    return (await query.first({})).get("followers");
  }

  static async getFeed(username) {
    let followers = await this.getFollowers(username);
    let feed = [];
    for (let i = 0; i < followers.length; i++) {
      let userPosts = await this.getTimeline(followers[i]);
      feed = feed.concat(userPosts);
    }
    feed.sort(function (a, b) {
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

    return feed;
  }

  static async deleteUser(username) {
    const userQuery = new Parse.Query("User");
    userQuery.equalTo("username", username);
    (await userQuery.first({})).destroy({});

    const preferencesQuery = new Parse.Query("Preferences");
    preferencesQuery.equalTo("username", username);
    (await preferencesQuery.first({})).destroy({});

    const postsQuery = new Parse.Query("Post");
    postsQuery.equalTo("username", username);
    postsQuery.find().then(function (posts) {
      return Parse.Object.destroyAll(posts);
    });

    return true;
  }

  static async getAppProfile(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    return await query.first({});
  }

  static async getUserExists(email) {
    let appUsers = await this.getUsers();
    let found = false;
    for (let i = 0; i < appUsers.length; i++) {
      if (appUsers[i].get("email") == email) {
        found = true;
        break;
      }
    }
    return found;
  }

  static async getProfileBySpotifyUsername(spotifyUsername) {
    const query = new Parse.Query("User");
    query.equalTo("spotifyUsername", spotifyUsername);
    return await query.first({});
  }

  static async getProfileByEmail(email) {
    const query = new Parse.Query("User");
    query.equalTo("email", email);
    return await query.first({});
  }

  static async getPassword(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    return (await query.first({})).get("appPassword");
  }

  static async setTopGenres(username, genres) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    let user = await query.first({});
    user.set("topGenres", genres);
    await user.save();
    return user.get("topGenres");
  }

  static async setTopArtists(username, artists) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    let user = await query.first({});
    user.set("topArtists", artists);
    await user.save();
    return user.get("topArtists");
  }

  static async getTopGenres(username) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    return (await query.first({})).get("topGenres");
  }

  static async getTopArtists(username) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    return (await query.first({})).get("topArtists");
  }

  static async createGroup(groupInfo) {
    let { username, groupName, description, isPrivate, genres, isAdmin } =
      groupInfo;
    let group = new Parse.Object("Group");

    if (groupName === "") {
      return "Name cannot be empty!";
    }

    let uniqueNameQuery = new Parse.Query("Group");
    uniqueNameQuery.equalTo("name", groupName);
    let uniqueNameResult = await uniqueNameQuery.find({});
    if (uniqueNameResult.length !== 0) {
      return "Group exists with that name already!";
    }

    if (description === "") {
      return "Description cannot be empty!";
    }

    group.set("name", groupName);
    group.set("description", description);
    group.set("isPrivate", isPrivate);
    group.set("genres", genres);

    let relationship = new Parse.Object("UserGroup");
    relationship.set("username", username);
    relationship.set("groupName", groupName);
    relationship.set("isAdmin", true);

    try {
      await group.save();
    } catch (error) {
      return `Error with ${username} creating ${groupName}`;
    }

    try {
      await relationship.save();
    } catch (error) {
      return `Error with ${username} joining ${groupName}`;
    }

    return true;
  }

  static async getGroup(groupName) {
    const query = new Parse.Query("Group");
    query.equalTo("name", groupName);
    return await query.first({});
  }

  static async getGroups(username) {
    const query = new Parse.Query("UserGroup");
    query.equalTo("username", username).descending("createdAt");
    return await query.find();
  }

  static async joinGroup(username, groupName) {
    let relationship = new Parse.Object("UserGroup");
    relationship.set("username", username);
    relationship.set("groupName", groupName);
    relationship.set("isAdmin", false);

    let usernameQuery = new Parse.Query("Invite");
    usernameQuery.equalTo("username", username);
    let groupNameQuery = new Parse.Query("Invite");
    groupNameQuery.equalTo("groupName", groupName);

    let compoundQuery = Parse.Query.and(usernameQuery, groupNameQuery);
    let invite = await compoundQuery.first({});
    invite.destroy({});

    try {
      await relationship.save();
      return true;
    } catch (error) {
      return `Error with ${username} joining ${groupName}`;
    }
  }

  static async leaveGroup(username, groupName) {
    let query = new Parse.Query("UserGroup");
    query.equalTo("username", username);
    query.equalTo("groupName", groupName);
    let relationship = await query.first({});
    relationship.destroy({});
  }

  static async sendInvite(username, groupName) {
    let invite = new Parse.Object("Invite");
    invite.set("username", username);
    invite.set("groupName", groupName);

    try {
      await invite.save();
      return true;
    } catch (error) {
      return `Error with ${username} leaving ${groupName}`;
    }
  }

  static async getInbox(username) {
    const query = new Parse.Query("Invite");
    query.equalTo("username", username).descending("createdAt");
    return await query.find();
  }

  static async getMembers(groupName) {
    const query = new Parse.Query("UserGroup");
    query.equalTo("groupName", groupName);
    return (await query.find({})).map((element) => {
      return {
        username: element.get("username"),
        isAdmin: element.get("isAdmin"),
      };
    });
  }

  static async setGroupGenres(groupName, genres) {
    const query = new Parse.Query("Group");
    query.equalTo("name", groupName);
    let group = await query.first({});
    group.set("genres", genres);
    await group.save();
    return group.get("genres");
  }

  static async getMembershipStatus(username, groupName) {
    let usernameQuery = new Parse.Query("UserGroup");
    usernameQuery.equalTo("username", username);
    let groupNameQuery = new Parse.Query("UserGroup");
    groupNameQuery.equalTo("groupName", groupName);
    let compoundQuery = Parse.Query.and(usernameQuery, groupNameQuery);
    return await compoundQuery.first({});
  }

  static async setGroupDescription(groupName, description) {
    const query = new Parse.Query("Group");
    query.equalTo("name", groupName);
    let group = await query.first({});
    group.set("description", description);
    await group.save();
    return group.get("description");
  }

  static async createGroupPost(username, trackId, groupName) {
    let Post = new Parse.Object("Post");
    Post.set("username", username);
    Post.set("trackId", trackId);
    Post.set("groupName", groupName);
    try {
      await Post.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getGroupFeed(groupName) {
    const query = new Parse.Query("Post");
    query.equalTo("groupName", groupName);
    query.descending("createdAt");
    return await query.find();
  }

  static async getRecentSearches(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    return (await query.first({})).get("recentSearches");
  }

  static async addRecentSearch(username, searchValue) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    const user = await query.first({});

    // Ensures that only the 10 most recent searches are saved
    if (user.get("recentSearches").length >= 10) {
      let oldestSearch = user.get("recentSearches")[0];
      user.remove("recentSearches", oldestSearch);

      try {
        await user.save();
      } catch (error) {
        return `Error with ${username} deleting oldest search value ${oldestSearch}`;
      }
    }

    user.addUnique("recentSearches", searchValue);

    try {
      await user.save();
      return true;
    } catch (error) {
      return `Error with ${username} saving recent search for ${searchValue}`;
    }
  }

  static async clearRecentSearches(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    const user = await query.first({});
    user.set("recentSearches", []);

    try {
      await user.save();
      return true;
    } catch (error) {
      return `Error with ${username} clearing recent searches ${searchValue}`;
    }
  }
}

module.exports = User;
