import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const ImageSize = styled.img`
height: 200px;
width: 200px;
`

const Body = styled.div`
min-height: 100vh;
margin: 20px;
`

class Song extends Component {
    state = {
        track: {
            artists: [{}],
            album: {
                images: [{}]
            }
        }
    }

    getTrack = () => {
        const token = localStorage.getItem('token')
        const songId = this.props.match.params.songId

        fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => response.json())
        .then(data => this.setState({track: data}))
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getSong()
        this.getTrack()
    }

    getSong = async () => {
        const userId = this.props.match.params.userId
        const playlistId = this.props.match.params.playlistId
        const songId = this.props.match.params.songId

        const res = await axios.get(`/api/users/${userId}/playlists/${playlistId}/songs/${songId}`)
        this.setState({ song: res.data})
    }

    render() {
        return (
            <Body>
                
                {<ImageSize src={this.state.track.album.images[0].url} />}
                <div>
                {this.state.track.name}
                </div>
                <div>
                {this.state.track.artists[0].name}
                </div>
                <div>
                {this.state.track.album.name}
                </div>
            </Body>
        );
    }
}

export default Song;