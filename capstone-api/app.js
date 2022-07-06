const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors')
// commented out for now 
// const store = require('./routes/Store');
const user = require('./routes/User');
// TODO import errors

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// commented out for now
// app.use('/store', store);
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