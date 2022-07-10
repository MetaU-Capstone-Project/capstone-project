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
    // TODO temporarily commented out
    // res.cookie(stateKey, state);
    const scope = 'user-read-private user-read-email';

    const queryParams = `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scope}&show_dialog=true`;
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

// TODO
// router.get('/post', async (req, res) => {
//     const username = req.params.username;
//     const trackId = req.params.trackId;
//     const result = await User.getPost(username, trackId);
//     console.log('result of getting post: ' + result);
//     // TODO - fix and errors
//     res.send(result);
// })

router.post('/post', async (req, res) => {
    let { username, trackId } = req.body;
    let result = await User.post(username, trackId);
    if (result) {
        res.send(201);
    } else {
        res.send(400);
    }
});

// TODO - fix
// change endpoint and add conditions for query
router.get('/posts', async (req, res) => {
    let result = await User.posts();
    res.send('posts: ' + JSON.stringify(result));
});

// TODO
router.get('/timeline/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.timeline(username);
    // TODO - fix and errors
    res.send(result);
})

router.get('/', (req, res) => {
    try {
        let currUser = User.getCurrentUser();
        res.send(currUser);
    } catch {
        res.status(400).send();
    }
})

module.exports = router