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
    const scope = 'user-read-private user-read-email user-top-read';

    const queryParams = `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}&scope=${scope}&show_dialog=true`;
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// TODO add different routes for authorizing after login and registration
router.get('/authorize/register', (req, res) => {
    const state = generateRandomString(16);
    // TODO temporarily commented out
    // res.cookie(stateKey, state);
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

// TODO
router.get('/users', async (req, res) => {
    let result = await User.getUsers();
    res.send(result);
});

// was working!!
// router.post('/followUser', async (req, res) => {
//     let { currUsername, followUsername } = req.body;
//     let result = await User.followUser(currUsername, followUsername);
//     if (result) {
//         res.send(201);
//     } else {
//         res.send(400);
//     }
// });

// router.post('/unfollowUser', async (req, res) => {
//     let { currUsername, unfollowUsername } = req.body;
//     let result = await User.unfollowUser(currUsername, unfollowUsername);
//     if (result) {
//         res.send(200);
//     } else {
//         res.send(400);
//     }
// });

router.post('/followUser', async (req, res) => {
    let { currUsername, followUsername } = req.body;
    let result = await User.followUser(currUsername, followUsername);
    res.send(result);
    // if (result === false) {
    //     res.send(400);
    // } else {
    //     res.send(201);
    // }
});

router.post('/unfollowUser', async (req, res) => {
    let { currUsername, unfollowUsername } = req.body;
    let result = await User.unfollowUser(currUsername, unfollowUsername);
    res.send(result);
    // if (result === false) {
    //     res.send(401);
    // } else {
    //     res.send(200);
    // }
});

router.get('/followers/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getFollowers(username);
    // TODO - fix and errors
    res.send(result);
});

router.get('/feed/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getFeed(username);
    // TODO - fix and errors
    res.send(result);
});

router.get('/delete/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.delete(username);
    // TODO - fix and errors
    res.send(result);
});

router.get('/:username', async (req, res) => {
    const username = req.params.username;
    const result = await User.getAppProfile(username);
    res.send(result);
});

// router.get('/exists/:username', async (req, res) => {
//     const spotifyUsername = req.params.username;
//     const result = await User.getUserExists(spotifyUsername);
//     res.send(result);
// });

router.get('/exists/:email', async (req, res) => {
    const email = req.params.email;
    const result = await User.getUserExists(email);
    res.send(result);
});

// TODO delete? 
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

router.get('/', (req, res) => {
    try {
        let currUser = User.getCurrentUser();
        console.log('current user');
        console.log(currUser);
        res.send(currUser);
    } catch {
        res.status(400).send();
    }
})

module.exports = router