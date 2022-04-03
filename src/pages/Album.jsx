import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      loading: true,
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

  render() {
    const { musicList, loading } = this.state;
    const list = musicList.slice(1);
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { !loading && (
            <div>
              <h1 data-testid="album-name">{ musicList[0].collectionName}</h1>
              <h2 data-testid="artist-name">{ musicList[0].artistName }</h2>
            </div>
          )}
          <section>
            { list.map(({ trackName, previewUrl, id }) => (
              <MusicCard
                key={ id }
                trackName={ trackName }
                previewUrl={ previewUrl }
                id={ id }
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
