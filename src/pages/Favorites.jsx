import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loadingF: false,
    };
  }

  componentDidMount() {
    this.saveFavMusicList();
  }

  saveFavMusicList = async () => {
    const favoriteSongList = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favoriteSongList,
    });
  }

  removeFavMusicList = async ({ target }) => {
    const { id } = target;
    const { favoriteSongs } = this.state;
    const favorite = favoriteSongs.find((music) => music.trackId === +id);
    this.setState({
      loadingF: true,
    }, async () => {
      const removeFavorite = await removeSong(favorite);
      const favoriteSongList = await getFavoriteSongs();
      if (removeFavorite) {
        this.setState({
          favoriteSongs: favoriteSongList,
          loadingF: false,
        });
      }
    });
  }

  render() {
    const { favoriteSongs, loadingF } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {loadingF && (
            <Loading />
          )}

          {!loadingF && (
            favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                favorite={ this.removeFavMusicList }
                favoriteSongs={ favoriteSongs }
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Favorites;
