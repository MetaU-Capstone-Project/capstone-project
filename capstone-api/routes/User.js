const express = require('express');
const router = express.Router();
const User = require('../models/User');

const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = "df31a108deeb4f8698d7936b772522bb";

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
const stateKey = 'spotify_auth_state';

router.get('/authorize', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-top-read';

    const queryParams = `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scope}&show_dialog=true`;
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.get('/authorize/register', (req, res) => {
    const state = generateRandomString(16);

    // added
    res.cookie(stateKey, state);
    // added

    const scope = 'user-read-private user-read-email user-top-read';

    const queryParams = `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scope}&show_dialog=true&register=true`;
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.post('/login', async (req, res) => {
    let {username, password} = req.body;
    let loggedInUser = await User.logUserIn(username, password);
    res.send(loggedInUser)
})

router.post('/register', async (req, res) => {
    let infoUser = req.body;    
    let registrationMessage = await User.registerUser(req.body);
    if (registrationMessage === "User created!") {
        res.status(201).send(infoUser);
    } else {
        res.status(400).send({errorMessage: registrationMessage});
    }
});

router.post('/post', async (req, res) => {
    let { username, trackId } = req.body;
    let result = await User.post(username, trackId);
    if (result) {
        res.send(201);
    } else {
        res.send(400);
    }
});

router.get('/posts', async (req, res) => {
    let result = await User.posts();
    res.send('posts: ' + JSON.stringify(result));
});

router.get('/timeline/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.timeline(username);
    res.send(result);
})

router.get('/users', async (req, res) => {
    let result = await User.getUsers();
    res.send(result);
});

router.post('/followUser', async (req, res) => {
    let { currUsername, followUsername } = req.body;
    let result = await User.followUser(currUsername, followUsername);
    res.send(result);
});

router.post('/unfollowUser', async (req, res) => {
    let { currUsername, unfollowUsername } = req.body;
    let result = await User.unfollowUser(currUsername, unfollowUsername);
    res.send(result);
});

router.get('/followers/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getFollowers(username);
    res.send(result);
});

router.get('/feed/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getFeed(username);
    res.send(result);
});

router.get('/delete/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.delete(username);
    res.send(result);
});

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getAppProfile(username);
    res.send(result);
});

router.get('/exists/:email', async (req, res) => {
    const email = req.params.email;
    const result = await User.getUserExists(email);
    res.send(result);
});

router.get('/profileBySpotifyUsername/:username', async (req, res) => {
    const spotifyUsername = req.params.username;
    const result = await User.getProfileBySpotifyUsername(spotifyUsername);
    res.send(result);
});

router.get('/profileByEmail/:email', async (req, res) => {
    const email = req.params.email;
    const result = await User.getProfileByEmail(email);
    res.send(result);
});

router.get('/password/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getPassword(username);
    res.send(result);
});

router.post('/topgenres', async (req, res) => {
    let { username, genres } = req.body;
    let result = await User.setTopGenres(username, genres);
    res.send(result);
});

router.post('/topartists', async (req, res) => {
    let { username, artists } = req.body;
    let result = await User.setTopArtists(username, artists);
    res.send(result);
});

router.get('/topgenres/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getTopGenres(username);
    res.send(result);
});

router.get('/topartists/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getTopArtists(username);
    res.send(result);
});

router.post('/group', async (req, res) => {
    let createMessage = await User.createGroup(req.body);
    if (createMessage === "Group created!") {
        res.status(201).send(req.body);
    } else {
        res.status(400).send({errorMessage: createMessage});
    }
});

router.get('/groups/:username', async (req, res) => {
    const username = req.params.username;
    let result = await User.getGroups(username);
    res.send(result);
});

router.get('/group/:name', async (req, res) => {
    const groupName = req.params.name;
    let result = await User.getGroup(groupName);
    res.send(result);
});

router.post('/joingroup', async (req, res) => {
    let { username, groupName } = req.body;
    let result = await User.joinGroup(username, groupName);
    res.send(result);
});

router.post('/leavegroup', async (req, res) => {
    let { username, groupName } = req.body;
    let result = await User.leaveGroup(username, groupName);
    res.send(result);
});

router.post('/invite', async (req, res) => {
    let { username, groupName } = req.body;
    let result = await User.invite(username, groupName);
    res.send(result);
});

// router.get('/inbox/:username', async (req, res) => {
//     const username = req.params.username;
//     let result = await User.getInbox(username);
//     res.send(result);
// });

router.get('/', (req, res) => {
    try {
        let currUser = User.getCurrentUser();
        res.send(currUser);
    } catch {
        res.status(400).send();
    }
})

module.exports = router