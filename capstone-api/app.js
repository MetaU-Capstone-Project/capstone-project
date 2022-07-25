const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./routes/User');
const axios = require('axios');
// TODO import errors
var cookieParser = require('cookie-parser')
const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cookieParser());

const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = "df31a108deeb4f8698d7936b772522bb";
const CLIENT_SECRET = "4c7a1c1bec464bf0ad268409131e0c67";
const stateKey = 'spotify_auth_state';

app.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const isRegister = req.query.register || null;
    const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${REDIRECT_URI}`;

    var state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect('/#?error=state_mismatch');
    } else {
        res.clearCookie(stateKey);
    }

    axios.post(  
        'https://accounts.spotify.com/api/token',  
            new URLSearchParams({ 
                grant_type: "authorization_code",  
                code: code,  
                redirect_uri: REDIRECT_URI  
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                },
            }
        ).then(function (response) {
            const token = jsonwebtoken.sign({ user: 'johndoe' }, CLIENT_SECRET);
            const { access_token, refresh_token, expires_in } = response.data;
            res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: true, sameSite: 'strict'});
            res.cookie('access_token', access_token, {secure: true, sameSite: 'strict'});
            const queryParams = `access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`;
            res.redirect(`http://localhost:3000/main/?${queryParams}`);

        }).catch(function (error) {
            res.redirect("http://localhost:3000");
        });
});

// TODO
app.use(
    jwt({
      secret: CLIENT_SECRET,
      getToken: req => req.cookies.token,
      algorithms: ['HS256']
    })
  );

app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
    const code = req.query.code || null;

    const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${REDIRECT_URI}`;

    axios.post(  
        'https://accounts.spotify.com/api/token',  
            new URLSearchParams({ 
                grant_type: "refresh_token",  
                refresh_token: refresh_token
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                },
            }
        ).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            res.send(error);
        });
});

app.use('/user', user);

app.get('/', (req, res) => {
    res.status(200).send({"ping": "pong"});
})

module.exports = app;