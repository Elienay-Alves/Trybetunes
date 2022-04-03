import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      loading: true,
      loadingF: false,
    };
  }

  componentDidMount() {
    this.musicsId();
  }

  musicsId = async () => {
    const { match: { params: { id } } } = this.props;
    const musicId = await getMusics(id);
    this.setState({
      musicList: musicId,
      loading: false,
    });
  }

  favMusicList = async ({ target }) => {
    const { id } = target;
    const { musicList } = this.state;
    const favorites = musicList.find((music) => music.trackId === +id);

    this.setState({
      loadingF: true,
    }, async () => {
      const getFavorites = await addSong(favorites);
      if (getFavorites) {
        this.setState({
          loadingF: false,
        });
      }
    });
  }

  render() {
    const {
      musicList,
      loading,
      loadingF,
    } = this.state;
    const list = musicList.slice(1);
    return (
      <div data-testid="page-album">
        <Header />
        {loadingF && (
          <Loading />
        )}
        <div>
          { !loading && (
            <div>
              <h1 data-testid="album-name">{ musicList[0].collectionName}</h1>
              <h2 data-testid="artist-name">{ musicList[0].artistName }</h2>
            </div>
          )}
          <section>
            { list.map(({ trackName, previewUrl, trackId }) => (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                favorite={ this.favMusicList }
              />
            ))}
          </section>
        </div>
        <div />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

// slice:
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

export default Album;
