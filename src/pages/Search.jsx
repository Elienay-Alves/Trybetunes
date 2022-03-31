import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      disable: true,
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
    const { search, disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <main>
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
        </main>
      </div>
    );
  }
}

export default Search;
