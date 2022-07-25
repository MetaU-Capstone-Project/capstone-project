const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/User");
const axios = require("axios");
// TODO import errors

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

const REDIRECT_URI = "http://localhost:3001/callback";
const CLIENT_ID = "df31a108deeb4f8698d7936b772522bb";
const CLIENT_SECRET = "4c7a1c1bec464bf0ad268409131e0c67";

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const isRegister = req.query.register || null;
  const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${REDIRECT_URI}`;

  axios
    .post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${new Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
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
        res.redirect(`http://localhost:3000`);
      }
    })
    .catch(function (error) {
      res.redirect("http://localhost:3000");
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;
  const code = req.query.code || null;

  const data = `grant_type=authorization_code&rcode=${code}&redirect_uri=${REDIRECT_URI}`;

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
            `${CLIENT_ID}:${CLIENT_SECRET}`
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

app.use("/user", user);

app.get("/", (req, res) => {
  res.status(200).send({ ping: "pong" });
});

module.exports = app;
