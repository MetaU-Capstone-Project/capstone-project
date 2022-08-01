import React, { useState } from "react";
import "./ProfileDetails.css";
import axios from "axios";
import { catchErrors } from "../../utils";

/**
 * Popup to display additional details of profile that mouse is hovering over
 * @param {object} props Component props
 * @param {string} props.username Username of profile that mouse is hovering over
 * @param {Function} props.setShouldUpdateProfileDetails Handler to rerender popup
 */
export default function ProfileDetails({
  username,
  setShouldUpdateProfileDetails,
}) {
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Retrieve user's top five genres to display in the popup
  React.useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      setSelectedGenres(
        (
          await axios.get(`http://localhost:3001/user/topgenres/${username}`)
        ).data.slice(0, 5)
      );

      setIsFetching(false);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="profiledetails-component">
      {!isFetching && selectedGenres != null && (
        <>
          <div className="profiledetails-name">{username}</div>
          <div className="profiledetails-wrapper">
            Top Genres:
            <div className="profiledetails-list">
              {selectedGenres.map((genre) => (
                <span className="profiledetails-preference" key={genre.value}>
                  {genre.value}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
