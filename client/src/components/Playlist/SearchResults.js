import React, { Component } from "react";
import axios from 'axios'
class SearchResults extends Component {
    state = {
        tracks: [{}]
    }


//THIS NEEDS TO BE CLEANED UP AND ALSO
//NEEDS TO UPDATE IN REAL TIME
// FUCKING PLEASE

  addTrackToPlaylist = async (trackUri) => {
    const token = localStorage.getItem("token");
    const uri = trackUri
    const params = `?uris=${uri}`
    fetch(
      `https://api.spotify.com/v1/users/${this.props.userId}/playlists/${
        this.props.playlistId
      }/tracks/${params}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json"
      }
    )
    //   .then(res => res.json())
    //   .catch(err => console.log(err))
    //   .then(data => this.setState({ tracks: data }))
    //   .then(this.props.getTracks())
  };


  render() {
    return (
      <div>
        <h1>results:</h1>
        {this.props.results.tracks.items.map(track => (
          <div>
            <img src={track.album.images[0].url} />
            <div>{track.name}</div>
            <div>{track.artists[0].name}</div>
            <div>{track.album.name}</div>
            {this.props.toggleButton ? <button onClick={() => this.addTrackToPlaylist(track.uri)}>Add to playlist</button> : null}
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
