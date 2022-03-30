import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import searchLogo from '../images/searchLogo.png';
import styles from './header.module.css';

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
          <div className={ styles.header_container }>
            <div className={ styles.header_top }>
              <img
                src={ searchLogo }
                alt="logo TrybeTunes"
                className={ styles.img_header }
              />
              <span
                className={ styles.name_container }
                data-testid="header-user-name"
              >
                { name }
              </span>
            </div>
            <div className={ styles.header_bot }>
              <Link
                className={ styles.link }
                to="/search"
                data-testid="link-to-search"
              >
                Search
              </Link>
              <Link
                className={ styles.link }
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites
              </Link>
              <Link
                className={ styles.link }
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
