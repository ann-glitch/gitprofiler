const { response } = require("express");
const express = require("express");

const axios = require("axios").default;

const app = express();
const port = 2020;

app.get("/:username", function (req, res) {
  let config = {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "gitprofiler",
    },
  };
  axios
    .get(`https://api.github.com/users/${req.params.username}`, config)
    .then(function (response) {
      if (response.status == 200) {
        res.json({
          name: response.data.name,
          location: response.data.location,
          twitterUsername: response.data.twitter_username,
          joined: response.data.created_at,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`running app on port => ${port}`);
});
