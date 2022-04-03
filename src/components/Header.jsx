import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.getname();
  }

  async getname() {
    const response = await getUser();
    if (response.name !== undefined) {
      this.setState({
        loading: false,
        name: response.name,
      });
    }
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {loading && (<Loading />)}
        {!loading && (
          <div>
            <div>
              <span
                data-testid="header-user-name"
              >
                { name }
              </span>
            </div>
            <div>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Search
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
