export const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/feed/";
// this was working
// const redirectURI = "http://localhost:3001/callback";
const clientId = "df31a108deeb4f8698d7936b772522bb";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];

export const loginURL = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
