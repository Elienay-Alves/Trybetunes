import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      redirect: false,
      disable: true,
    };
  }

  handleClick = () => {
    const { name } = this.state;
    const object = {
      name,
    };
    this.setState({ loading: true }, async () => {
      const response = await createUser(object);
      if (response === 'OK') {
        this.setState({
          loading: false,
          redirect: true,
        });
      }
    });
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
    const { name } = this.state;
    const charactersNumber = 2;
    if (name.length > charactersNumber) {
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
    const { name, loading, redirect, disable } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div
        data-testid="page-login"
      >
        <form
          action=""
        >
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ this.handleChange }
            name="name"
            value={ name }
            placeholder="Name"
          />
          <button
            data-testid="login-submit-button"
            type="button"
            onClick={ this.handleClick }
            disabled={ disable }
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
