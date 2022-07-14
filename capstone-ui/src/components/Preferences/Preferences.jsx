import React, { useState } from "react";
import "./Preferences.css";
import axios from "axios";
import ProfileCard from "../ProfileCard/ProfileCard";
import Settings from "../Settings/Settings";

import { catchErrors } from "../../utils";

export default function Preferences({ username, token, profile }) {
  const [appProfile, setAppProfile] = React.useState();

  React.useEffect(() => {
    const fetchAppUser = async () => {
      const { data } = await axios.get("http://localhost:3001/user");
      setAppProfile(data);
    };

    catchErrors(fetchAppUser());
  }, []);

  return (
    <div className="preferences-page">
      <div className="info-wrapper">
        <ProfileCard
          username={username}
          token={token}
          profile={profile}
          appProfile={appProfile}
          isPreferencesView={true}
        ></ProfileCard>
      </div>
      <div className="settings-wrapper">
        <span className="settings-heading">Settings</span>
        <Settings
          username={username}
          token={token}
          profile={profile}
        ></Settings>
      </div>
    </div>
  );
}
