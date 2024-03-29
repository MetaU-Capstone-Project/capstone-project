import React, { useState } from "react";
import Select from "react-select";
import "./Settings.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import {
  getTopArtists,
  getGenres,
  getRecommendations,
  getAudioFeatures,
} from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getRecommendedUsers } from "../../recommendationUtils";
import Recommendations from "../Recommendations/Recommendations";

export default function Settings({
  username,
  profile,
  isRegisterView,
  isFriendView,
}) {
  const [genreOptions, setGenreOptions] = useState(null);
  const [artistOptions, setArtistOptions] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [selectedArtists, setSelectedArtists] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isFetchingRecs, setIsFetchingRecs] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const usersTopArtists = await getTopArtists();
      let artistsResult = usersTopArtists.data.items.map((artist) => {
        return { value: artist.id, label: artist.name };
      });
      setArtistOptions(artistsResult);

      const allGenres = await getGenres();
      let genreResults = allGenres.data.genres.map((genre) => {
        return { value: genre, label: genre };
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

  async function handleGenreChange(genres) {
    let postRequest = {
      username: username,
      genres: genres,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/topgenres",
      postRequest
    );
    setSelectedGenres(data);
  }

  async function handleArtistChange(artists) {
    let postRequest = {
      username: username,
      artists: artists,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/topartists",
      postRequest
    );
    setSelectedArtists(data);
  }

  async function recommendUsers(e) {
    setIsFetchingRecs(true);
    let artistsResult = selectedArtists;
    let genresResult = selectedGenres;

    if (artistsResult === null) {
      artistsResult = [];
    }

    if (genresResult === null) {
      genresResult = [];
    }

    let recs = await getRecommendedUsers(username, genresResult, artistsResult);
    setRecommendations(recs);
    setIsFetchingRecs(false);
  }

  function handleNext() {
    window.location.href = "http://localhost:3000/main";
  }

  return (
    <div className="settings-component">
      {genreOptions != null && artistOptions != null ? (
        <>
          <div className="preferences">
            <span className="preference-heading">Favorite Genres</span>
            {/* Renders read only genres if the profile is that of a friend */}
            {isFriendView && (
              <Select
                className="preference-select"
                value={selectedGenres}
                isMulti
                readOnly
              />
            )}
            {/* Allows user to make changes to their favorite genres if this is their own profile */}
            {!isFriendView && (
              <Select
                className="preference-select"
                closeMenuOnSelect={false}
                value={selectedGenres}
                isMulti
                options={genreOptions}
                onChange={handleGenreChange}
              />
            )}
          </div>
          <div className="preferences">
            <span className="preference-heading">Favorite Artists</span>
            {/* Renders read only artists if the profile is that of a friend */}
            {isFriendView && (
              <Select
                className="preference-select"
                closeMenuOnSelect={false}
                value={selectedArtists}
                isMulti
                readOnly
              />
            )}
            {/* Allows user to make changes to their favorite artists if this is their own profile */}
            {!isFriendView && (
              <Select
                className="preference-select"
                closeMenuOnSelect={false}
                value={selectedArtists}
                isMulti
                options={artistOptions}
                onChange={handleArtistChange}
              />
            )}
          </div>
          {isRegisterView && <button onClick={handleNext}>Next</button>}
          {!isRegisterView && !isFriendView && (
            <div className="recommend-buttons-wrapper">
              <button className="recommend-button" onClick={recommendUsers}>
                Recommend Me Users
              </button>
            </div>
          )}
          {isFetchingRecs && (
            <div className="loading-recs-wrapper">
              {<LoadingSpinner></LoadingSpinner>}
            </div>
          )}
          {!isFetchingRecs && recommendations != null && (
            <>
              <span className="recommendations-heading">Recommendations</span>
              <Recommendations
                recs={recommendations}
                isFeedView={false}
              ></Recommendations>
            </>
          )}
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}
