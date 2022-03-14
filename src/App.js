import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/Search">
          <Search />
        </Route>
        <Route path="/album/:id">
          <Album />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    );
  }
}

export default App;
