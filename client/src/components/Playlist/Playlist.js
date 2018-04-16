import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Song from "../Song";
import Search from "./Search";
import EditPlaylistForm from "./EditPlaylistForm";
import styled from 'styled-components'

const FlexContainer = styled.div`
display: flex;
justify-content: space-around;
border: 5px solid red;
`

const SongFlex = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`

const ImageSize = styled.img`
height: 100px;
width: 100px;
`

class Playlist extends Component {
  state = {
    editForm: false,
    tracks: {
      items: [
        {
          track: {
            name: "",
            album: {
                images: [{}]
            }
          }
        }
      ]
    },
    playlist: {
      uri: ""
    }
  };

  componentDidMount() {
    this.getPlaylist();
    this.getTracks();
  }

  // getPlaylists = async () => {
  //     const userId = this.props.match.params.userId
  //     const playlistId = this.props.match.params.playlistId

  //     const res = await axios.get(`/api/users/${userId}/playlists/${playlistId}`)
  //     console.log(res.data)
  //     this.setState({ playlist: res.data })
  // }

  getPlaylist = () => {
    const token = localStorage.getItem("token");
    const userId = this.props.match.params.userId;
    const playlistId = this.props.match.params.playlistId;

    fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => response.json())
      .then(data => this.setState({ playlist: data }));
  };

  getTracks = () => {
    const token = localStorage.getItem("token");
    const userId = this.props.match.params.userId;
    const playlistId = this.props.match.params.playlistId;

    fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then(response => response.json())
      .then(data => this.setState({ tracks: data }))
      .catch(err => {
        console.log(err);
      });
  };


  removeTrackFromPlayList = (trackUri, index) => {
    const token = localStorage.getItem("token");
    const userId = this.props.match.params.userId;
    const playlistId = this.props.match.params.playlistId;
    const url = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
    const uri = `${trackUri}`;
    const position = index;
    console.log(uri, position);
    const params = `?uris=${uri}`;

    fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
      body: JSON.stringify({ "tracks": [{ "uri": uri, "positions": [position] }] })
    });
  };

  toggleForm = () => {
    this.setState({ editForm: !this.state.editForm });
  };

  render() {
    return (
      <div>
        <FlexContainer>
            <div>
          <iframe
            src={`https://open.spotify.com/embed?uri=${
              this.state.playlist.uri
            }`}
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
        
        </div>

        <div>
          {/* IMPORTANT!!!
         IF USER PLAYLIST WAS NOT MADE BY THE USER SIGNED IN, IT WILL ERROR OUT! */}
         <h1>{this.state.playlist.name}</h1>
         <button onClick={this.toggleForm}>Edit</button>
        {this.state.editForm ? (
          <EditPlaylistForm
            userId={this.props.match.params.userId}
            playlistId={this.props.match.params.playlistId}
            getPlaylist={this.getPlaylist}
          />
        ) : null}
        <SongFlex>
          {this.state.tracks.items.map((track, index) => (
            <div>
                <div><ImageSize src={track.track.album.images[0].url}/></div>
              <Link
                to={`/users/${this.props.match.params.userId}/playlists/${
                  this.props.match.params.playlistId
                }/songs/${track.track.id}`}
              >
                {track.track.name}
                {console.log(index)}
              </Link>
              <p
                onClick={() => {
                  this.removeTrackFromPlayList(track.track.uri, index);
                }}
              >
                X
              </p>
            </div>
          ))}
          </SongFlex>
        </div>
        </FlexContainer>
        <div>
          <Search
            userId={this.props.match.params.userId}
            playlistId={this.props.match.params.playlistId}
            getTracks={this.getTracks}
          />
        </div>
      </div>
    );
  }
}

export default Playlist;
