import React, { useState } from "react";
import Select from "react-select";
import "./Settings.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres, getRecommendations } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Settings({ username, token, profile }) {
  const [genreOptions, setGenreOptions] = useState(null);
  const [artistOptions, setArtistOptions] = useState(null);

  // TODO - for selected preferences
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const usersTopArtists = await getTopArtists();
      let artistsResult = usersTopArtists.data.items.map((element) => {
        return { value: element.id, label: element.name };
      });
      setArtistOptions(artistsResult);
      // TODO sets the top artists in database as id ?? change later
      console.log("users top artists");
      console.log(artistsResult);

      const allGenres = await getGenres();
      let genreResults = allGenres.data.genres.map((element) => {
        return { value: element, label: element };
      });
      setGenreOptions(genreResults);
    };

    catchErrors(fetchData());
  }, []);

  async function handleGenreChange(e) {
    let userGenres = [];
    for (let i = 0; i < e.length; i++) {
      userGenres.push(e[i].value);
    }
    let postRequest = {
      username: username,
      genres: userGenres,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/topgenres",
      postRequest
    );
    // TODO update select options
    // let genreResults = data.map((element) => {
    //   return { value: element, label: element };
    // });
    setSelectedGenres(data);
  }

  async function handleArtistChange(e) {
    let userArtists = [];
    for (let i = 0; i < e.length; i++) {
      userArtists.push(e[i].value);
    }
    let postRequest = {
      username: username,
      artists: userArtists,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/topartists",
      postRequest
    );
    // TODO update select options
    // let artistResults = data.map((element) => {
    //   return { value: element, label: element };
    // });
    setSelectedArtists(data);
  }

  async function recommendUsers(e) {
    console.log("recommended users");

    // TODO remove these calls and just use selected songs
    // let artistsResult = await axios.get(
    //   `http://localhost:3001/user/topartists/${username}`
    // );
    // let genresResult = await axios.get(
    //   `http://localhost:3001/user/topgenres/${username}`
    // );
    let artistsResult = selectedArtists;
    let genresResult = selectedGenres;
    let postedSongsResult = await axios.get(
      `http://localhost:3001/user/timeline/${username}`
    );
    let postedSongs = postedSongsResult.data;

    // format into strings for param queries
    let topArtists = artistsResult.join(",");
    let topGenres = genresResult.join(",");
    postedSongs = postedSongs.map((element) => element.trackId);
    // postedSongs = postedSongs.join(",");

    console.log(topArtists);
    console.log(topGenres);
    // console.log(postedSongs);

    // console.log("settings token");
    // console.log(token);
    let { data } = await axios
      .get(
        "https://api.spotify.com/v1/recommendations",
        {
          params: {
            seed_artists: topArtists,
            seed_genres: topGenres,
            // TODO uncomment out later - figure out which 5 to priortize
            // seed_tracks: postedSongs,
            // TODO other parameters
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error);
      });

    console.log("recommendation results");
    console.log(data);
    // TODO
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
              defaultValue={[]}
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
              defaultValue={[]}
              isMulti
              options={artistOptions}
              onChange={handleArtistChange}
            />
          </div>
          <div className="recommend-buttons-wrapper">
            <button className="recommend-button">Recommend Me Songs</button>
            <button className="recommend-button" onClick={recommendUsers}>
              Recommend Me Users
            </button>
          </div>
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}
