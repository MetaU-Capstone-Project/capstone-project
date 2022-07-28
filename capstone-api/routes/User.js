const express = require("express");
const router = express.Router();
const User = require("../models/User");

const dotenv = require("dotenv");
dotenv.config();

const CREATE_SUCCESS_CODE = 201;
const ERROR_CODE = 400;

/**
 * Generates a random string used to protect against cross-site request forgery attacks
 * @param {number} length of random string to be created
 */
const generateRandomString = (length) => {
  let randomString = "";
  const possibleString =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    randomString += possibleString.charAt(
      Math.floor(Math.random() * possibleString.length)
    );
  }
  return randomString;
};

// Redirects to the Spotify authorization page
router.get("/authorize", (req, res) => {
  // Defines authorization scope for what user has access to
  const security_state = generateRandomString(16);
  const authorization_scope = "user-read-private user-read-email user-top-read";

  const queryParams = `client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${security_state}&scope=${authorization_scope}&show_dialog=true`;
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Route for user to login to app account
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const loggedInUser = await User.logUserIn(username, password);
  res.send(loggedInUser);
});

// Route for user to register a new app account
router.post("/register", async (req, res) => {
  const infoUser = req.body;
  const registrationResult = await User.registerUser(req.body);
  if (registrationResult === true) {
    res.status(CREATE_SUCCESS_CODE).send(infoUser);
  } else {
    res.status(400).send({ errorMessage: registrationResult });
  }
});

// Route for user to create a new post
router.post("/post", async (req, res) => {
  const { username, trackId } = req.body;
  const result = await User.createPost(username, trackId);
  if (result === true) {
    res.send(CREATE_SUCCESS_CODE);
  } else {
    res.sen(ERROR_CODE).send({ errorMessage: result });
  }
});

// Route to retrieve all posts app-wide
router.get("/posts", async (req, res) => {
  res.send(await User.getPosts());
});

// Route to retrieve all of specified user's posts in descending chronological order
router.get("/timeline/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getTimeline(username));
});

// Route to retrieve all users app-wide
router.get("/users", async (req, res) => {
  res.send(await User.getUsers());
});

// Route to add requested friend to current user's follower list
router.post("/followUser", async (req, res) => {
  const { followUsername } = req.body;
  res.send(await User.followUser(followUsername));
});

// Route to remove requested friend from current user's follower list
router.post("/unfollowUser", async (req, res) => {
  const { unfollowUsername } = req.body;
  res.send(await User.unfollowUser(unfollowUsername));
});

// Route to retrieve current user's follower list
router.get("/followers/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getFollowers(username));
});

// Route to get all the posts of users that current user follows in descending chronological order
router.get("/feed/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getFeed(username));
});

// Route to delete specified user's account
router.get("/delete/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.deleteUser(username));
});

// Route to get specified user's app profile information
router.get("/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getAppProfile(username));
});

// Route to check if specified user has a registered account
router.get("/exists/:email", async (req, res) => {
  const email = req.params.email;
  res.send(await User.getUserExists(email));
});

// Route to check if specified email is associated with a registered account
router.get("/profileByEmail/:email", async (req, res) => {
  const email = req.params.email;
  res.send(await User.getProfileByEmail(email));
});

// Route to retrieve password of account associated with specified username
router.get("/password/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getPassword(username));
});

// Route to set specified user's genre preferences
router.post("/topgenres", async (req, res) => {
  const { username, genres } = req.body;
  res.send(await User.setTopGenres(username, genres));
});

// Route to set specified user's artist preferences
router.post("/topartists", async (req, res) => {
  const { username, artists } = req.body;
  res.send(await User.setTopArtists(username, artists));
});

// Route to get specified user's genre preferences
router.get("/topgenres/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getTopGenres(username));
});

// Route to get specified user's artist preferences
router.get("/topartists/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getTopArtists(username));
});

// Route to create a new group
router.post("/group", async (req, res) => {
  const result = await User.createGroup(req.body);
  if (result === true) {
    res.status(CREATE_SUCCESS_CODE).send(req.body);
  } else {
    res.status(ERROR_CODE).send({ errorMessage: result });
  }
});

// Route to get all groups that specified user is a member of
router.get("/groups/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getGroups(username));
});

// Route to get specified group's information
router.get("/group/:name", async (req, res) => {
  const groupName = req.params.name;
  res.send(await User.getGroup(groupName));
});

// Route to add specified user to specified group
router.post("/joingroup", async (req, res) => {
  const { username, groupName } = req.body;
  res.send(await User.joinGroup(username, groupName));
});

// Route to remove specified user from specified group
router.post("/leavegroup", async (req, res) => {
  const { username, groupName } = req.body;
  res.send(await User.leaveGroup(username, groupName));
});

// Route to send invite to specified user to join specified group
router.post("/invite", async (req, res) => {
  const { username, groupName } = req.body;
  const result = await User.sendInvite(username, groupName);
  if (result === true) {
    res.status(CREATE_SUCCESS_CODE).send(req.body);
  } else {
    res.status(ERROR_CODE).send({ errorMessage: result });
  }
});

// Route to get all invites of specified user
router.get("/inbox/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getInbox(username));
});

// Route to get Parse information of current user
router.get("/", (req, res) => {
  try {
    res.send(User.getCurrentUser());
  } catch {
    res.status(ERROR_CODE).send();
  }
});

module.exports = router;
