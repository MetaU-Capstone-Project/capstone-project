import React, { useState } from "react";
import Select from "react-select";
import "./GroupInformation.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres, getRecommendations } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getRecommendedUsers } from "../../recommendation";
import Recommendations from "../Recommendations/Recommendations";

export default function GroupInformation({
  username,
  token,
  profile,
  isRegisterView,
  groupName,
}) {
  const [genreOptions, setGenreOptions] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState(null);
  const [description, setDescription] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const allGenres = await getGenres();
      let genreResults = allGenres.data.genres.map((element) => {
        return { value: element, label: element };
      });
      setGenreOptions(genreResults);

      let groupInfo = await axios.get(
        `http://localhost:3001/user/group/${groupName}`
      );

      setDescription(groupInfo.data.description);
      setSelectedGenres(groupInfo.data.genres);

      let postRequest = {
        username: username,
        groupName: groupName,
      };
      let membershipStatus = await axios.post(
        `http://localhost:3001/user/membershipstatus`,
        postRequest
      );
      setIsAdmin(membershipStatus.data.isAdmin);
    };

    catchErrors(fetchData());
  }, []);

  async function handleGenreChange(e) {
    let postRequest = {
      groupName: groupName,
      genres: e,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/groupgenres",
      postRequest
    );
    setSelectedGenres(data);
  }

  async function handleDescriptionChange(e) {
    setDescription(e.target.value);
    let postRequest = {
      groupName: groupName,
      description: e.target.value,
    };
    let { data } = await axios.post(
      "http://localhost:3001/user/groupdescription",
      postRequest
    );
    setDescription(data);
  }

  return (
    <div className="groupinformation-component">
      {description && genreOptions && isAdmin !== undefined ? (
        <>
          <div className="preferences">
            <div className="groupinformation-wrapper">
              <span className="preference-heading">Description</span>
              {isAdmin === true && (
                <textarea
                  className="description-input"
                  onChange={handleDescriptionChange}
                  value={description}
                  placeholder="Description"
                ></textarea>
              )}
              {isAdmin === false && (
                <textarea
                  className="description-input"
                  value={description}
                  placeholder="Description"
                  readOnly
                ></textarea>
              )}
            </div>
            <div className="groupinformation-wrapper">
              <span className="preference-heading">Genres</span>
              {isAdmin === true && (
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedGenres}
                  isMulti
                  options={genreOptions}
                  onChange={handleGenreChange}
                />
              )}
              {isAdmin === false && (
                <Select
                  className="preference-select"
                  closeMenuOnSelect={false}
                  value={selectedGenres}
                />
              )}
            </div>
            <div className="groupinformation-wrapper">
              <span className="preference-heading">Membership Status:</span>
              <span>{isAdmin ? "Admin" : "Member"}</span>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </div>
  );
}
