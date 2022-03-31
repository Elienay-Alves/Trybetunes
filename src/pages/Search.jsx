import React, { Component } from 'react';
import Header from '../components/Header';
import AlbumCards from '../components/AlbumCards';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      disable: true,
      loading: false,
      album: [],
      result: '',
      renderAlbumCard: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validation();
    });
  }

  handleClick = async () => {
    this.setState({ loading: true }, async () => {
      const { search } = this.state;
      const album = await searchAlbumsAPI(search);
      if (album !== undefined) {
        this.setState({
          loading: false,
          album,
          result: search,
          search: '',
          renderAlbum: true,
        });
      }
    });
  }

  validation = () => {
    const { search } = this.state;
    const charactersNumber = 1;
    if (search.length > charactersNumber) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }

  render() {
    const {
      search,
      disable,
      loading,
      album,
      result,
      renderAlbum,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          { loading && (
            <Loading />
          ) }

          { !loading && (
            <div>
              <div>
                <form>
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    onChange={ this.handleChange }
                    name="search"
                    value={ search }
                  />
                  <button
                    data-testid="search-artist-button"
                    onClick={ this.handleClick }
                    type="button"
                    disabled={ disable }
                  >
                    Search
                  </button>
                </form>
              </div>
              { renderAlbum && (
                <div>
                  <h1>
                    { album.length === 0
                      ? 'Nenhum álbum foi encontrado'
                      : `Resultado de álbuns de: ${result}` }
                  </h1>
                  <div>
                    { album
                      .map((alb) => (
                        <AlbumCards
                          key={ alb.collectionId }
                          albName={ alb.collectionName }
                          artName={ alb.artistName }
                          albImage={ alb.artworkUrl100 }
                          id={ alb.collectionId }
                        />))}
                  </div>
                </div>
              )}
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default Search;
