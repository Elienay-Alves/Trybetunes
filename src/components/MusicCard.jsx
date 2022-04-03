import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = ({ target }) => {
    const { name, checked } = target;
    this.setState({
      [name]: checked,
    });
  };

  getFavorites = () => {
    const { favoriteSongs, trackId } = this.props;
    favoriteSongs.filter((favorite) => {
      const check = favorite.trackId === trackId ? this.setState({ checked: true }) : '';
      return check;
    });
  }

  takeFavorites = () => {
    const { trackId } = this.props;
    const checkingValues = Object.keys(this.state);
    const itsChecked = checkingValues.includes(`${trackId}`);
    this.state = {
      checked: itsChecked,
    };
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      favorite,
    } = this.props;
    const { checked } = this.state;

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
          htmlFor={ `${trackId}` }
        >
          favorite
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            name="checked"
            type="checkbox"
            onChange={ this.handleChange }
            onClick={ (event) => favorite(event) }
            checked={ checked }
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
