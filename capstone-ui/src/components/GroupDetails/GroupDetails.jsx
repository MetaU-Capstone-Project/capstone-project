import React, { useState } from "react";
import "./GroupDetails.css";
import axios from "axios";
import { catchErrors } from "../../utils";

export default function GroupDetails({ groupName }) {
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [description, setDescription] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Retrieve group's top five genres to display in the popup
  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      const groupInfo = (
        await axios.get(`http://localhost:3001/user/group/${groupName}`)
      ).data;

      setSelectedGenres(groupInfo.genres.slice(0, 5));
      setDescription(groupInfo.description);

      setIsFetching(false);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="groupdetails-component">
      {!isFetching && selectedGenres != null && description != null && (
        <>
          <div className="groupdetails-name">{groupName}</div>
          <div className="groupedetails-wrapper">
            <span className="group-detail-heading">Genres:</span>
            <div className="groupdetails-list">
              {selectedGenres.map((genre) => (
                <span className="groupdetails-preference" key={genre.value}>
                  {genre.value}
                </span>
              ))}
            </div>
          </div>
          <div className="groupdetails-wrapper">
            <span className="group-detail-heading">Description:</span>
            <span>{description}</span>
          </div>
        </>
      )}
    </div>
  );
}
