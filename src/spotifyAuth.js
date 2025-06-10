export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
export const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
export const authEndpoint = "https://accounts.spotify.com/authorize";

export const scopes = [
  "user-top-read",
  "user-read-email",
  "user-read-private",
  // add other scopes you need
];

export const getAuthUrl = () => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
};

