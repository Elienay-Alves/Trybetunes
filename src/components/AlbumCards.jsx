import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCards extends React.Component {
  render() {
    const {
      albName,
      artName,
      albImage,
      id,
    } = this.props;

    return (
      <section>
        <div>
          <Link
            to={ `/album/${id}` }
            data-testid={ `link-to-album-${id}` }
          >
            <img
              src={ albImage }
              alt="Album"
            />
          </Link>
        </div>
        <div>
          <p>{ albName }</p>
          <p>{ artName }</p>
        </div>
      </section>
    );
  }
}

AlbumCards.propTypes = {
  albName: propTypes.string.isRequired,
  artName: propTypes.string.isRequired,
  albImage: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
};

export default AlbumCards;
