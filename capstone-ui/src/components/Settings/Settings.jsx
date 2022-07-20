import React, { useState } from "react";
import Select from "react-select";
import "./Settings.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres, getRecommendations } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getRecommendedUsers } from "../../recommendation";
import Recommendations from "../Recommendations/Recommendations";

export default function Settings({ username, token, profile, isRegisterView }) {
  const [genreOptions, setGenreOptions] = useState(null);
  const [artistOptions, setArtistOptions] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const usersTopArtists = await getTopArtists();
      let artistsResult = usersTopArtists.data.items.map((element) => {
        return { value: element.id, label: element.name };
      });
      setArtistOptions(artistsResult);

      const allGenres = await getGenres();
      let genreResults = allGenres.data.genres.map((element) => {
        return { value: element, label: element };
      });
      setGenreOptions(genreResults);

      let savedTopArtists = await axios.get(
        `http://localhost:3001/user/topartists/${username}`
      );
      let savedTopGenres = await axios.get(
        `http://localhost:3001/user/topgenres/${username}`
      );
      setSelectedArtists(savedTopArtists.data);
      setSelectedGenres(savedTopGenres.data);
    };

    catchErrors(fetchData());
  }, []);

  async function handleGenreChange(e) {
    let postRequest = {
      username: username,
      genres: e,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/topgenres",
      postRequest
    );
    setSelectedGenres(data);
  }

  async function handleArtistChange(e) {
    let postRequest = {
      username: username,
      artists: e,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/topartists",
      postRequest
    );
    setSelectedArtists(data);
  }

  async function recommendUsers(e) {
    let artistsResult = selectedArtists;
    console.log("recommendinggewgaweg");
    console.log(artistsResult);
    let genresResult = selectedGenres;
    let postedSongsResult = await axios.get(
      `http://localhost:3001/user/timeline/${username}`
    );
    let postedSongs = postedSongsResult.data;

    // format into strings for param queries
    if (artistsResult === null) {
      artistsResult = [];
    }

    if (genresResult === null) {
      genresResult = [];
    }
    let topArtists = artistsResult.join(",");
    let topGenres = genresResult.join(",");
    postedSongs = postedSongs.map((element) => element.trackId);

    let recs = await getRecommendedUsers(
      username,
      genresResult,
      artistsResult,
      postedSongs
    );
    setRecommendations(recs);

    // postedSongs = postedSongs.join(",");

    // console.log(topArtists);
    // console.log(topGenres);

    // recommended songs
    // let { data } = await axios
    //   .get(
    //     "https://api.spotify.com/v1/recommendations",
    //     {
    //       params: {
    //         seed_artists: topArtists,
    //         seed_genres: topGenres,
    //         // TODO uncomment out later - figure out which 5 to priortize
    //         // seed_tracks: postedSongs,
    //         // TODO other parameters
    //       },
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // console.log("recommendation results");
    // console.log(data);
    // TODO
  }

  function handleNext() {
    window.location.href = "http://localhost:3000/main";
  }

  return (
    <div className="settings-component">
      {genreOptions && artistOptions ? (
        <>
          <div className="preferences">
            <span className="preference-heading">Your Favorite Genres</span>
            <Select
              className="preference-select"
              closeMenuOnSelect={false}
              value={selectedGenres}
              isMulti
              options={genreOptions}
              onChange={handleGenreChange}
            />
          </div>
          <div className="preferences">
            <span className="preference-heading">Your Favorite Artists</span>
            <Select
              className="preference-select"
              closeMenuOnSelect={false}
              value={selectedArtists}
              isMulti
              options={artistOptions}
              onChange={handleArtistChange}
            />
          </div>
          {isRegisterView && <button onClick={handleNext}>Next</button>}
          {/* {isRegisterView && <button onClick={recommendUsers}>Next</button>} */}
          {!isRegisterView && (
            <div className="recommend-buttons-wrapper">
              <button className="recommend-button">Recommend Me Songs</button>
              <button className="recommend-button" onClick={recommendUsers}>
                Recommend Me Users
              </button>
            </div>
          )}
          {/* <div className="recommend-buttons-wrapper">
            <button className="recommend-button">Recommend Me Songs</button>
            <button className="recommend-button" onClick={recommendUsers}>
              Recommend Me Users
            </button>
          </div> */}
          {recommendations && (
            <span className="recommendations-heading">Recommendations</span>
          )}
          <Recommendations recs={recommendations}></Recommendations>
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}
