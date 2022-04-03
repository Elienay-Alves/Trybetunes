import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.takeFavorites();
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    this.setState({
      [name]: checked,
    });
  };

  takeFavorites = () => {
    const { favoriteSongs } = this.props;
    const checking = favoriteSongs.reduce((acc, { trackId }) => {
      acc[trackId] = true;
      return acc;
    }, {});

    this.state = { ...checking };
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      favorite,
    } = this.props;
    const checkingValues = Object.keys(this.state);
    const itsChecked = checkingValues.includes(`${trackId}`);

    return (
      <div>
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          Your Browser does not support the element
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
        >
          favorite
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            name={ trackId }
            type="checkbox"
            onChange={ this.handleChange }
            onClick={ (event) => favorite(event) }
            checked={ itsChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorite: PropTypes.func.isRequired,
  favoriteSongs: PropTypes.string.isRequired,
};

export default MusicCard;
