const { response } = require("express");
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 2020;

app.get("/:username", function (req, res) {
  res.json({
    username: req.params.username,
  });

  let config = {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "gitprofiler",
    },
  };
  axios
    .get(`https://api.github.com/users/${username}`, config)
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        const responseData = response.data;

        res.json({
          name: responseData.name,
          location: responseData.location,
          twitterUsername: responseData.twitter_username,
          joined: responseData.created_at,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log("running app...");
});
