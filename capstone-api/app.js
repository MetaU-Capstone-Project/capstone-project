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

// was working
// app.get('/callback', (req, res) => {
//     res.send(200);
// });

app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${REDIRECT_URI}`;

//   axios({
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: data,
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//     },
//   })
//     .then(response => {
//         console.log('in callback');
//         console.log(response);
//       if (response.status === 200) {
//         res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
//       } else {
//         res.send(response);
//       }
//     })
//     .catch(error => {
//       res.send(error);
//     });


// commented out
    // // let postRequest = {
    // //     grant_type: 'authorization_code',
    // //     code: code,
    // //     redirect_uri: REDIRECT_URI
    // // };

    // const config = { headers: {"content-type": "application/x-www-form-urlencoded", "Authorization": `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`} };

    // // TODO post request vs. data
    // // TODO 400 error
    // axios.post('https://accounts.spotify.com/api/token', data, config).then(response => {
    //     console.log('in callback');
    //     console.log(response);
    //   if (response.status === 200) {
    //     res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
    //   } else {
    //     res.send(response);
    //   }
    // }).catch(error => {
    //     res.send(error);
    // });
// commented out

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
            console.log('in callback');
                console.log(response);
              if (response.status === 200) {
                res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
              } else {
                res.send(response);
              }
        }).catch(function (error) {
            res.send(error);
        });
});

app.use('/user', user);

// added
// TODO 3000 vs 3001
// app.get('/callback', function(req, res) {
//     console.log('in callback');
//     console.log(req);

//     var code = req.query.code || null;
//     var state = req.query.state || null;
  
//     if (state === null) {
//         // TODO error
//     //   res.redirect('/#' +
//     //     querystring.stringify({
//     //       error: 'state_mismatch'
//     //     }));
//         res.status(400).send({});
//     } else {
//       var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//           code: code,
//           redirect_uri: redirect_uri,
//           grant_type: 'authorization_code'
//         },
//         headers: {
//           'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//         },
//         json: true
//       };
//     }
// });

// app.get('/refresh_token', function(req, res) {
//     var refresh_token = req.query.refresh_token;
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//       form: {
//         grant_type: 'refresh_token',
//         refresh_token: refresh_token
//       },
//       json: true
//     };
  
//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var access_token = body.access_token;
//         res.send({
//           'access_token': access_token
//         });
//       }
//     });
// });
// added

app.get('/', (req, res) => {
    res.status(200).send({"ping": "pong"});
})

module.exports = app;