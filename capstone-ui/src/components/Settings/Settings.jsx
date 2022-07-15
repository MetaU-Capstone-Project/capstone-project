import React, { useState } from "react";
import Select from "react-select";
import "./Settings.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres } from "../../spotify";
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
        return { value: element.name, label: element.name };
      });
      setArtistOptions(artistsResult);

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
            <button className="recommend-button">Recommend Me Users</button>
          </div>
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}
