import React, { useState } from "react";
import "./ProfileDetails.css";
import axios from "axios";
import { catchErrors } from "../../utils";
import { getTopArtists, getGenres, getRecommendations } from "../../spotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getRecommendedUsers } from "../../recommendation";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

export default function ProfileDetails({ username, token, profile, recs }) {
  return <div className="profiledetails-component">Details!</div>;
}
