const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./routes/User');
const axios = require('axios');
// TODO import errors

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// added
const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = "df31a108deeb4f8698d7936b772522bb";
const CLIENT_SECRET = "4c7a1c1bec464bf0ad268409131e0c67";

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${REDIRECT_URI}`;

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
            // added expires in
            if (response.status === 200) {
                const { access_token, refresh_token, expires_in } = response.data;
      
                const queryParams = `access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`;
                console.log('query params:');
                console.log(queryParams);
        
                res.redirect(`http://localhost:3000/?${queryParams}`);
        
              } else {
                  // TODO
                res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
              }


            // was working
        //     if (response.status === 200) {
        //   const { access_token, refresh_token } = response.data;

        //   const queryParams = `access_token=${access_token}&refresh_token=${refresh_token}`;
        //   console.log('query params:');
        //   console.log(queryParams);
  
        //   res.redirect(`http://localhost:3000/?${queryParams}`);
  
        // } else {
        //     // TODO
        //   res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        // }

        // testing me endpoint
        // if (response.status === 200) {

        //     const { access_token, token_type } = response.data;
      
        //     axios.get('https://api.spotify.com/v1/me', {
        //       headers: {
        //         Authorization: `${token_type} ${access_token}`
        //       }
        //     })
        //       .then(response => {
        //         res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
        //       })
        //       .catch(error => {
        //         res.send(error);
        //       });
      
        //   } else {
        //     res.send(response);
        //   }

        // refresh token
        // const { refresh_token } = response.data;

        // axios.get(`http://localhost:3001/refresh_token?refresh_token=${refresh_token}`)
        //   .then(response => {
        //     res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
        //   })
        //   .catch(error => {
        //     res.send(error);
        //   });


        
        }).catch(function (error) {
            res.send(error);
        });
});

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