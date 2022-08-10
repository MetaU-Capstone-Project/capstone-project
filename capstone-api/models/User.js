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

  /**
   * Retrieve information about user that is currently logged in
   */
  static getCurrentUser() {
    Parse.User.enableUnsafeCurrentUser();
    return Parse.User.current();
  }

  /**
   * Logs user in
   * @param {string} username of user trying to log in
   * @param {string} password of user trying to log in
   */
  static async logUserIn(username, password) {
    Parse.User.enableUnsafeCurrentUser();
    return await Parse.User.logIn(username, password);
  }

  /**
   * Registers a new user
   * @param {object} userInfo contains user's different fields
   */
  static async registerUser(userInfo) {
    const { username, password, email, spotifyURL, imageURL } = userInfo;
    const user = new Parse.User();

    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("followers", []);
    user.set("appPassword", password);
    user.set("spotifyURL", spotifyURL);
    user.set("imageURL", imageURL);
    user.set("recentSearches", []);

    const userPreferences = new Parse.Object("Preferences");
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
    } catch (error) {
      return `Error with ${username} saving preferences while registering`;
    }
  }

  /**
   * Creates general post (not associated with a group)
   * @param {string} username of user trying to post
   * @param {string} trackId id of song to be posted
   */
  static async createPost(username, trackId) {
    const Post = new Parse.Object("Post");
    Post.set("username", username);
    Post.set("trackId", trackId);
    try {
      await Post.save();
      return true;
    } catch (error) {
      return `Error with ${username} posting song with track ${trackId}`;
    }
  }

  /**
   * Retrieves posts from all users
   */
  static async getPosts() {
    const query = new Parse.Query("Post");
    return await query.find();
  }

  /**
   * Gets all posts from specified user
   * @param {string} username of user whose posts are being requested
   */
  static async getTimeline(username) {
    const query = new Parse.Query("Post");
    query.equalTo("username", username);
    query.descending("createdAt");
    return await query.find();
  }

  /**
   * Gets an individual from specified user
   * @param {string} username of user who created the specified post
   * @param {string} trackId id of song associated with requested post
   */
  static async getPost(username, trackId) {
    const query = new Parse.Query("Post");
    query.equalTo("username", username);
    query.equalTo("trackId", trackId);
    return await query.first();
  }

  /**
   * Gets all app users
   */
  static async getUsers() {
    const query = new Parse.Query("User");
    return await query.find();
  }

  /**
   * Appends friend to current user's followers list
   * @param {string} followUsername username of friend that current user wants to follow
   */
  static async followUser(followUsername) {
    const user = Parse.User.current();
    user.addUnique("followers", followUsername);
    await user.save();
    return true;
  }

  /**
   * Removes friend from current user's followers list
   * @param {string} unfollowUsername username of friend that current user wants to unfollow
   */
  static async unfollowUser(unfollowUsername) {
    const user = Parse.User.current();
    user.remove("followers", unfollowUsername);
    await user.save();
    return true;
  }

  /**
   * Gets all followers of a specified user
   * @param {string} username of user specified
   */
  static async getFollowers(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    return (await query.first({})).get("followers");
  }

  /**
   * Gets all posts of specified user in descending chronological order
   * @param {string} username of user specified
   */
  static async getFeed(username) {
    const followers = await this.getFollowers(username);
    let feed = [];
    for (let i = 0; i < followers.length; i++) {
      feed = feed.concat(await this.getTimeline(followers[i]));
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

  /**
   * Deletes all information associated with specified user
   * @param {string} username of user specified
   */
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

  /**
   * Retrieves the app account information of user specified
   * @param {string} username of user specified
   */
  static async getAppProfile(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    return await query.first({});
  }

  /**
   * Returns if specified email is already registered with an app account
   * @param {string} email of user specified
   */
  static async getUserExists(email) {
    const appUsers = await this.getUsers();
    for (let i = 0; i < appUsers.length; i++) {
      if (appUsers[i].get("email") == email) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets profile of user associated with specified email
   * @param {string} email of user specified
   */
  static async getProfileByEmail(email) {
    const query = new Parse.Query("User");
    query.equalTo("email", email);
    return await query.first({});
  }

  /**
   * Gets password of user associated with specified username
   * @param {string} username of user specified
   */
  static async getPassword(username) {
    const query = new Parse.Query("User");
    query.equalTo("username", username);
    return (await query.first({})).get("appPassword");
  }

  /**
   * Sets user's genre preferences used for recommending users
   * @param {string} username of user specified
   * @param {Arrray<string>} genres that user prefers
   */
  static async setTopGenres(username, genres) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    const user = await query.first({});
    user.set("topGenres", genres);
    await user.save();
    return user.get("topGenres");
  }

  /**
   * Sets user's artist preferences used for recommending users
   * @param {string} username of user specified
   * @param {Arrray<string>} artists that user prefers
   */
  static async setTopArtists(username, artists) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    const user = await query.first({});
    user.set("topArtists", artists);
    await user.save();
    return user.get("topArtists");
  }

  /**
   * Retrieves user's genre preferences used for recommending users
   * @param {string} username of user specified
   */
  static async getTopGenres(username) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    return (await query.first({})).get("topGenres");
  }

  /**
   * Retrieves user's artist preferences used for recommending users
   * @param {string} username of user specified
   */
  static async getTopArtists(username) {
    const query = new Parse.Query("Preferences");
    query.equalTo("username", username);
    return (await query.first({})).get("topArtists");
  }

  /**
   * Creates a group
   * @param {object} groupInfo contains group information to be registered
   */
  static async createGroup(groupInfo) {
    const { username, groupName, description, isPrivate, genres, isAdmin } =
      groupInfo;
    const group = new Parse.Object("Group");

    if (groupName === "") {
      return "Name cannot be empty!";
    }

    const uniqueNameQuery = new Parse.Query("Group");
    uniqueNameQuery.equalTo("name", groupName);
    const uniqueNameResult = await uniqueNameQuery.find({});
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

    const relationship = new Parse.Object("UserGroup");
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

  /**
   * Retrieves a specified group's information
   * @param {string} groupName name of group requested
   */
  static async getGroup(groupName) {
    const query = new Parse.Query("Group");
    query.equalTo("name", groupName);
    return await query.first({});
  }

  /**
   * Gets all the groups that a specified user is a member of in descending chronological order
   * @param {string} username of specified user
   */
  static async getGroups(username) {
    const query = new Parse.Query("UserGroup");
    query.equalTo("username", username).descending("createdAt");
    return await query.find();
  }

  /**
   * Adds a user to a specified group as a member
   * @param {string} username of specified user
   * @param {string} groupName name of specified group
   */
  static async joinGroup(username, groupName) {
    const relationship = new Parse.Object("UserGroup");
    relationship.set("username", username);
    relationship.set("groupName", groupName);
    relationship.set("isAdmin", false);

    const usernameQuery = new Parse.Query("Invite");
    usernameQuery.equalTo("username", username);
    const groupNameQuery = new Parse.Query("Invite");
    groupNameQuery.equalTo("groupName", groupName);

    const compoundQuery = Parse.Query.and(usernameQuery, groupNameQuery);
    const invite = await compoundQuery.first({});
    if (invite != undefined) {
      invite.destroy({});
    }

    try {
      await relationship.save();
      return true;
    } catch (error) {
      return `Error with ${username} joining ${groupName}`;
    }
  }

  /**
   * Removes a user from a specified group
   * @param {string} username of specified user
   * @param {string} groupName name of specified group
   */
  static async leaveGroup(username, groupName) {
    const query = new Parse.Query("UserGroup");
    query.equalTo("username", username);
    query.equalTo("groupName", groupName);
    const relationship = await query.first({});
    relationship.destroy({});
  }

  /**
   * Sends a user an invite to join a specified group
   * @param {string} username of specified user
   * @param {string} groupName name of specified group
   */
  static async sendInvite(username, groupName) {
    const invite = new Parse.Object("Invite");
    invite.set("username", username);
    invite.set("groupName", groupName);

    try {
      await invite.save();
      return true;
    } catch (error) {
      return `Error with ${username} leaving ${groupName}`;
    }
  }

  /**
   * Retrieves all the invites of a specified user
   * @param {string} username of specified user
   */
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
    const group = await query.first({});
    group.set("genres", genres);
    await group.save();
    return group.get("genres");
  }

  static async getMembershipStatus(username, groupName) {
    const usernameQuery = new Parse.Query("UserGroup");
    usernameQuery.equalTo("username", username);
    const groupNameQuery = new Parse.Query("UserGroup");
    groupNameQuery.equalTo("groupName", groupName);
    const compoundQuery = Parse.Query.and(usernameQuery, groupNameQuery);
    return await compoundQuery.first({});
  }

  static async setGroupDescription(groupName, description) {
    const query = new Parse.Query("Group");
    query.equalTo("name", groupName);
    const group = await query.first({});
    group.set("description", description);
    await group.save();
    return group.get("description");
  }

  static async createGroupPost(username, trackId, groupName) {
    const Post = new Parse.Object("Post");
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
      const oldestSearch = user.get("recentSearches")[0];
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

  static async getFeedByPage(username, limit, page) {
    return (await this.getFeed(username)).slice(
      limit * page,
      limit * (page + 1)
    );
  }

  /**
   * Deletes all information associated with specified group
   * @param {string} groupName name of specified group
   */
  static async deleteGroup(groupName) {
    const groupQuery = new Parse.Query("Group");
    groupQuery.equalTo("name", groupName);
    (await groupQuery.first({})).destroy({});

    const invitesQuery = new Parse.Query("Invite");
    invitesQuery.equalTo("groupName", groupName);
    invitesQuery.find().then(function (invites) {
      return Parse.Object.destroyAll(invites);
    });

    const usersInGroupsQuery = new Parse.Query("UserGroup");
    usersInGroupsQuery.equalTo("groupName", groupName);
    usersInGroupsQuery.find().then(function (usersInGroups) {
      return Parse.Object.destroyAll(usersInGroups);
    });
    return true;
  }

  // Clears all the nicknames and messages used in the chat after a user logs out
  static async clearChat() {
    const nicknameQuery = new Parse.Query("Nickname");
    const messageQuery = new Parse.Query("Message");

    const nicknames = await nicknameQuery.find({});
    for (let i = 0; i < nicknames.length; i++) {
      nicknames[i].destroy({});
    }

    const messages = await messageQuery.find({});
    for (let i = 0; i < messages.length; i++) {
      messages[i].destroy({});
    }

    return true;
  }

  // Creates Nickname object in Parse to indicate user is actively on chat
  static async createNickname(nickname) {
    // Get User Parse object associated with given nickname
    const userQuery = new Parse.Query("User");
    userQuery.equalTo("username", nickname);
    const userObject = await userQuery.first();

    // Check if nickname is associated with user
    if (userObject !== undefined) {
      const nicknameQuery = new Parse.Query("Nickname");
      nicknameQuery.equalTo("name", nickname);
      let nicknameObject = await nicknameQuery.first();

      // Retrieves Nickname Parse object if it already exists, and otherwise creates a new Nickname object
      if (nicknameObject == undefined) {
        nicknameObject = new Parse.Object("Nickname");
        nicknameObject.set("name", nickname);
        nicknameObject.set("user", userObject);
        nicknameObject = await nicknameObject.save();
      }
      return nicknameObject;
    }
    // User does not exist so cannot create a Nickname object
    return false;
  }

  static async sendMessage(message, senderNicknameId, receiverNicknameId) {
    // Get sender and receiver nickname Parse objects
    const senderNicknameObjectQuery = new Parse.Query("Nickname");
    senderNicknameObjectQuery.equalTo("objectId", senderNicknameId);
    const senderNicknameObject = await senderNicknameObjectQuery.first();
    const receiverNicknameObjectQuery = new Parse.Query("Nickname");
    receiverNicknameObjectQuery.equalTo("objectId", receiverNicknameId);
    const receiverNicknameObject = await receiverNicknameObjectQuery.first();

    // Check to ensure if specified sender and receiver Users exist in User table
    if (senderNicknameObject == undefined) {
      return `Error with sending memssage to user with nickname id ${senderNicknameId}.`;
    }

    if (receiverNicknameObject == undefined) {
      return `Error with user with nickname id ${senderNicknameId} receiving message.`;
    }

    // Create new Message object and save it
    const Message = new Parse.Object("Message");
    Message.set("text", message);
    Message.set("sender", senderNicknameObject);
    Message.set("receiver", receiverNicknameObject);

    try {
      await Message.save();
      return true;
    } catch (error) {
      return `Error with ${senderNicknameObject.get(
        "name"
      )} sending message ${message} to ${receiverNicknameObject.get("name")}`;
    }
  }
}

module.exports = User;
