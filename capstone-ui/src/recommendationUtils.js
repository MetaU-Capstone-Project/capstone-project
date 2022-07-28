import React, { useState } from "react";
import axios from "axios";
import { accessToken, getTrack } from "../src/spotify";

function rankUsers(recommendedUsers) {
  recommendedUsers.sort(function (a, b) {
    return b.score - a.score;
  });
}

// calculates the similarity score between two users and updates the score determined previously by genre/artist preferences
function calculateAudioFeaturesSimilarity(
  username,
  currUserAudioAverage,
  otherUserAudioAverage,
  userResult
) {
  let audioSimilarity = 0;
  currUserAudioAverage.forEach(function (audioFeature, index) {
    audioSimilarity -= Math.abs(
      audioFeature.average - otherUserAudioAverage[index].average
    );
  });

  userResult.find((friend) => friend.username === username).score +=
    audioSimilarity;

  return userResult;
}

// computes the average of all audio features given song IDs
async function getAudioFeaturesAverage(songIds) {
  let audioFeaturesResponse = await axios.get(
    "https://api.spotify.com/v1/audio-features",
    {
      params: {
        ids: songIds,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  let audioFeatures = audioFeaturesResponse.data.audio_features;
  let avgAudioFeatures = Array.from(
    audioFeatures.reduce(
      (acc, obj) =>
        Object.keys(obj).reduce(
          (acc, key) =>
            typeof obj[key] == "number"
              ? acc.set(
                  key,
                  (([sum, count]) => [sum + obj[key], count + 1])(
                    acc.get(key) || [0, 0]
                  )
                )
              : acc,
          acc
        ),
      new Map()
    ),
    ([name, [sum, count]]) => ({ name, average: sum / count })
  );

  // length of song should not affect similarity
  avgAudioFeatures = avgAudioFeatures.filter(
    (feature) => feature.name != "duration_ms"
  );

  return avgAudioFeatures;
}

// returns the recommended users determined by shared artist/genree preferences, similar audio features in timeline songs, and similar recent searches
export const getRecommendedUsers = async (username, topGenres, topArtists) => {
  let userRecentSearchesResponse = await axios.get(
    `http://localhost:3001/user/recentsearches/${username}`
  );

  let userRecentSearches = userRecentSearchesResponse.data;

  // find users with most similar preferences (genres and artists)
  let allUsers = await axios.get(`http://localhost:3001/user/users`);

  let friends = await axios.get(
    `http://localhost:3001/user/followers/${username}`
  );

  friends = friends.data;
  let nonFriendUsers = allUsers.data
    .map((user) => user.username)
    .filter(
      (currentUsername) =>
        currentUsername != username && !friends.includes(currentUsername)
    );
  let userResult = [];

  for (let i = 0; i < nonFriendUsers.length; i++) {
    let score = 0;
    let friendUsername = nonFriendUsers[i];
    let friendArtists = await axios.get(
      `http://localhost:3001/user/topartists/${friendUsername}`
    );
    let friendGenres = await axios.get(
      `http://localhost:3001/user/topgenres/${friendUsername}`
    );
    let friendRecentSearches = await axios.get(
      `http://localhost:3001/user/recentsearches/${friendUsername}`
    );

    // weigh shared artist preferences more heavily than genres since more rare to like a specific artist
    for (let j = 0; j < friendArtists.data.length; j++) {
      let currArtist = friendArtists.data[j];
      let hasSameArtist = topArtists.some((e) => e.value === currArtist.value);
      if (hasSameArtist) {
        score += 5;
      }
    }

    // weigh shared genres preferences less than artists since there are fewer genres than artists and so more likely to share genre preferences
    for (let j = 0; j < friendGenres.data.length; j++) {
      let currGenre = friendGenres.data[j];
      let hasSameGenre = topGenres.some((e) => e.value === currGenre.value);
      if (hasSameGenre) {
        score++;
      }
    }

    // weigh similarities between recent searches
    const sharedRecentSearches = userRecentSearches.filter((searchValue) =>
      friendRecentSearches.data.includes(searchValue)
    );

    score += sharedRecentSearches.length * 100;
    userResult.push({ username: friendUsername, score: score });
  }
  rankUsers(userResult);

  let postedSongsResult = await axios.get(
    `http://localhost:3001/user/timeline/${username}`
  );

  // TODO - change slice number? when continually pressing offset update
  let postedSongs = postedSongsResult.data.slice(0, 5);
  if (postedSongs.length > 0) {
    postedSongs = postedSongs.map((element) => element.trackId).join(",");
    let currUserAudioAverage = await getAudioFeaturesAverage(postedSongs);
    let audioResult = [];

    for (let i = 0; i < userResult.length; i++) {
      let user = userResult[i].username;
      const { data } = await axios.get(
        `http://localhost:3001/user/timeline/${user}`
      );

      // TODO ? offset only retrieve 5 since otherwise too much
      let otherUserTimeline = data.slice(0, 5);
      if (otherUserTimeline.length != 0) {
        otherUserTimeline = otherUserTimeline
          .map((post) => post.trackId)
          .join(",");
        let otherUserAudioAverage = await getAudioFeaturesAverage(
          otherUserTimeline
        );
        // calculate song similarity between current user and another user
        audioResult = calculateAudioFeaturesSimilarity(
          user,
          currUserAudioAverage,
          otherUserAudioAverage,
          userResult
        );
      }
    }

    rankUsers(audioResult);
    return audioResult;
  }

  return userResult;
};
