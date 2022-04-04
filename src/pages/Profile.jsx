import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: '',
    };
  }

  componentDidMount() {
    this.userData();
  }

  userData = async () => {
    this.setState({ loading: true }, async () => {
      const data = await getUser();
      const { name, email, description, image } = data;
      this.setState({
        name,
        email,
        description,
        image,
        loading: false,
      });
    });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
    } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {loading && (
            <Loading />
          )}
          <img
            data-testid="profile-image"
            src={ image }
            alt="User"
          />
          <p>{ name }</p>
          <p>{ email }</p>
          <p>{ description }</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
