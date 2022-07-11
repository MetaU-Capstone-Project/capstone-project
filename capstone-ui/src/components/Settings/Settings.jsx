import React, { useState } from "react";
import Select from "react-select";
import "./Settings.css";
import axios from "axios";
import { catchErrors } from "../../utils";

export default function Settings({ username, token, profile }) {
  console.log("token in settings");
  console.log(token);

  const [genres, setGenres] = useState([]);
  // TODO temp - delete later
  const colourOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  React.useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios
        .get(
          "https://api.spotify.com/v1/recommendations/available-genre-seeds",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .catch((error) => {
          console.log(error.message);
        });

      // format genres to be options
      let result = data.genres.map((element) => {
        console.log("element: " + element);
        return { value: element, label: element };
      });

      setGenres(result);
      console.log("genres!!!");
      console.log(result);
    };

    catchErrors(getGenres());
  }, []);

  return (
    <div className="settings-component">
      {genres.length !== 0 && (
        <Select
          closeMenuOnSelect={false}
          defaultValue={[]}
          isMulti
          options={genres}
        />
      )}
    </div>
  );
}
