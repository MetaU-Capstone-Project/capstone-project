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
    res.send(await User.posts());
});

router.get('/timeline/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.timeline(username));
})

router.get('/users', async (req, res) => {
    res.send(await User.getUsers());
});

router.post('/followUser', async (req, res) => {
    let { currUsername, followUsername } = req.body;
    res.send(await User.followUser(currUsername, followUsername));
});

router.post('/unfollowUser', async (req, res) => {
    let { currUsername, unfollowUsername } = req.body;
    res.send(await User.unfollowUser(currUsername, unfollowUsername));
});

router.get('/followers/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getFollowers(username));
});

router.get('/feed/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getFeed(username));
});

router.get('/delete/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.delete(username));
});

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getAppProfile(username));
});

router.get('/exists/:email', async (req, res) => {
    const email = req.params.email;
    res.send(await User.getUserExists(email));
});

router.get('/profileBySpotifyUsername/:username', async (req, res) => {
    const spotifyUsername = req.params.username;
    res.send(await User.getProfileBySpotifyUsername(spotifyUsername));
});

router.get('/profileByEmail/:email', async (req, res) => {
    const email = req.params.email;
    res.send(await User.getProfileByEmail(email));
});

router.get('/password/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getPassword(username));
});

router.post('/topgenres', async (req, res) => {
    let { username, genres } = req.body;
    res.send(await User.setTopGenres(username, genres));
});

router.post('/topartists', async (req, res) => {
    let { username, artists } = req.body;
    res.send(await User.setTopArtists(username, artists));
});

router.get('/topgenres/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getTopGenres(username));
});

router.get('/topartists/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getTopArtists(username));
});

router.post('/group', async (req, res) => {
    let result = await User.createGroup(req.body);
    if (result === true) {
        res.status(201).send(req.body);
    } else {
        res.status(400).send({errorMessage: result});
    }
});

router.get('/groups/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getGroups(username));
});

router.get('/group/:name', async (req, res) => {
    const groupName = req.params.name;
    res.send(await User.getGroup(groupName));
});

router.post('/joingroup', async (req, res) => {
    let { username, groupName } = req.body;
    res.send(await User.joinGroup(username, groupName));
});

router.post('/leavegroup', async (req, res) => {
    let { username, groupName } = req.body;
    res.send(await User.leaveGroup(username, groupName));
});

router.post('/invite', async (req, res) => {
    let { username, groupName } = req.body;
    res.send(await User.sendInvite(username, groupName));
});

router.get('/inbox/:username', async (req, res) => {
    const username = req.params.username;
    res.send(await User.getInbox(username));
});

router.get('/', (req, res) => {
    try {
        let currUser = User.getCurrentUser();
        res.send(currUser);
    } catch {
        res.status(400).send();
    }
})

module.exports = router