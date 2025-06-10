import React, { useEffect, useState } from "react";
import { getAuthUrl, getTokenFromUrl } from "./spotifyAuth";

function App() {
  const [token, setToken] = useState(null);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      localStorage.setItem("spotifyAccessToken", _token);
      fetchUserTopArtists(_token);
    }
  }, []);

  const fetchUserTopArtists = async (token) => {
    try {
      const res = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTopArtists(data.items);
    } catch (err) {
      console.error("Error fetching top artists", err);
    }
  };

  return (
    <div className="App">
      {!token ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Welcome to Spotify Soulmate</h2>
          <a href={getAuthUrl()} className="login-button">Login with Spotify</a>
        </div>
      ) : (
        <div style={{ padding: "20px" }}>
          <h2>Your Top Artists</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {topArtists.map((artist) => (
              <div key={artist.id} style={{ textAlign: "center", width: "150px" }}>
                <img src={artist.images[0]?.url} alt={artist.name} style={{ width: "100%", borderRadius: "10px" }} />
                <p>{artist.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const fetchUserTopTracks = async (token) => {
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("Top Tracks: ", data.items);
  return data.items;
};

const fetchAudioFeatures = async (token, trackIds) => {
  const idsParam = trackIds.join(',');
  const res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${idsParam}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("Audio Features: ", data.audio_features);
  return data.audio_features;
};

const onLogin = async (_token) => {
  setToken(_token);
  localStorage.setItem("spotifyAccessToken", _token);

  const topTracks = await fetchUserTopTracks(_token);
  const trackIds = topTracks.map(track => track.id);
  const features = await fetchAudioFeatures(_token, trackIds);

  // Optional: Save them in state too
};


export default App;

