const express = require("express");
const router = express.Router();
const User = require("../models/User");

const dotenv = require("dotenv");
dotenv.config();

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
  // defines authorization scope for what user has access to
  const security_state = generateRandomString(16);
  const authorization_scope = "user-read-private user-read-email user-top-read";

  const queryParams = `client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&state=${security_state}&scope=${authorization_scope}&show_dialog=true`;
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const loggedInUser = await User.logUserIn(username, password);
  res.send(loggedInUser);
});

router.post("/register", async (req, res) => {
  const infoUser = req.body;
  const registrationResult = await User.registerUser(req.body);
  if (registrationResult === true) {
    res.status(201).send(infoUser);
  } else {
    res.status(400).send({ errorMessage: registrationResult });
  }
});

router.post("/post", async (req, res) => {
  const { username, trackId } = req.body;
  const result = await User.createPost(username, trackId);
  if (result === true) {
    res.send(201);
  } else {
    res.send(400).send({ errorMessage: result });
  }
});

router.get("/posts", async (req, res) => {
  res.send(await User.getPosts());
});

router.get("/timeline/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getTimeline(username));
});

router.get("/users", async (req, res) => {
  res.send(await User.getUsers());
});

router.post("/followUser", async (req, res) => {
  const { currUsername, followUsername } = req.body;
  res.send(await User.followUser(currUsername, followUsername));
});

router.post("/unfollowUser", async (req, res) => {
  const { currUsername, unfollowUsername } = req.body;
  res.send(await User.unfollowUser(currUsername, unfollowUsername));
});

router.get("/followers/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getFollowers(username));
});

router.get("/feed/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getFeed(username));
});

router.get("/delete/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.deleteUser(username));
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getAppProfile(username));
});

router.get("/exists/:email", async (req, res) => {
  const email = req.params.email;
  res.send(await User.getUserExists(email));
});

router.get("/profileBySpotifyUsername/:username", async (req, res) => {
  const spotifyUsername = req.params.username;
  res.send(await User.getProfileBySpotifyUsername(spotifyUsername));
});

router.get("/profileByEmail/:email", async (req, res) => {
  const email = req.params.email;
  res.send(await User.getProfileByEmail(email));
});

router.get("/password/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getPassword(username));
});

router.post("/topgenres", async (req, res) => {
  const { username, genres } = req.body;
  res.send(await User.setTopGenres(username, genres));
});

router.post("/topartists", async (req, res) => {
  const { username, artists } = req.body;
  res.send(await User.setTopArtists(username, artists));
});

router.get("/topgenres/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getTopGenres(username));
});

router.get("/topartists/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getTopArtists(username));
});

router.post("/group", async (req, res) => {
  const result = await User.createGroup(req.body);
  if (result === true) {
    res.status(201).send(req.body);
  } else {
    res.status(400).send({ errorMessage: result });
  }
});

router.get("/groups/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getGroups(username));
});

router.get("/group/:name", async (req, res) => {
  const groupName = req.params.name;
  res.send(await User.getGroup(groupName));
});

router.post("/joingroup", async (req, res) => {
  const { username, groupName } = req.body;
  res.send(await User.joinGroup(username, groupName));
});

router.post("/leavegroup", async (req, res) => {
  const { username, groupName } = req.body;
  res.send(await User.leaveGroup(username, groupName));
});

router.post("/invite", async (req, res) => {
  const { username, groupName } = req.body;
  const result = await User.sendInvite(username, groupName);
  if (result === true) {
    res.status(201).send(req.body);
  } else {
    res.status(400).send({ errorMessage: result });
  }
});

router.get("/inbox/:username", async (req, res) => {
  const username = req.params.username;
  res.send(await User.getInbox(username));
});

router.get("/", (req, res) => {
  try {
    const currUser = User.getCurrentUser();
    res.send(currUser);
  } catch {
    res.status(400).send();
  }
});

module.exports = router;
