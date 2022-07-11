import React, { useState } from "react";
import Select from "react-select";
import "./Settings.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres } from "../../spotify";

export default function Settings({ username, token, profile }) {
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const usersTopArtists = await getTopArtists();
      console.log("top artists");
      console.log(usersTopArtists.data.items);
      let artistsResult = usersTopArtists.data.items.map((element) => {
        return { value: element.name, label: element.name };
      });
      setArtists(artistsResult);

      const allGenres = await getGenres();
      let genreResults = allGenres.data.genres.map((element) => {
        return { value: element, label: element };
      });
      setGenres(genreResults);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="settings-component">
      {genres.length !== 0 && (
        <div className="preferences">
          <span className="preference-heading">Your Favorite Genres</span>
          <Select
            closeMenuOnSelect={false}
            defaultValue={[]}
            isMulti
            options={genres}
          />
        </div>
      )}
      {artists.length !== 0 && (
        <div className="preferences">
          <span className="preference-heading">Your Favorite Artists</span>
          <Select
            closeMenuOnSelect={false}
            defaultValue={[]}
            isMulti
            options={artists}
          />
        </div>
      )}
    </div>
  );
}
