import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './login.module.css';
import loginImage from '../images/loginImage.png';

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
        className={ styles.body }
        data-testid="page-login"
      >
        <img src={ loginImage } alt="trybeTunes logo" />
        <form
          action=""
          className={ styles.form }
        >
          <input
            className={ styles.input }
            data-testid="login-name-input"
            type="text"
            onChange={ this.handleChange }
            name="name"
            value={ name }
            placeholder="Nome"
          />
          <button
            className={ styles.button }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.handleClick }
            disabled={ disable }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
