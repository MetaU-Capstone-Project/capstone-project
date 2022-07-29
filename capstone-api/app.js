const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/User");
const axios = require("axios");
// TODO import errors
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Handles the callback after authorization and redirects user to home page on success
app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const isRegister = req.query.register || null;
  const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}`;

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${new Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    )
    .then(function (response) {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = `access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`;
        res.redirect(`http://localhost:3000/main/?${queryParams}`);
      } else {
        res.redirect(`http://localhost:3000/error`);
      }
    })
    .catch(function (error) {
      res.redirect("http://localhost:3000");
    });
});

// Retrieves the refresh token when access token has expired
app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;
  const code = req.query.code || null;

  const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}`;

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${new Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});

// Returns the app profile of the current user
app.use("/user", user);

app.get("/", (req, res) => {
  res.status(200).send({ ping: "pong" });
});

module.exports = app;
