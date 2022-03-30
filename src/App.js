import React, { Component } from 'react';
import Routes from './pages/Routes';

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     requisitionStatus: false,
  //   };
  // }

  // handleRequisitionStatus = () => {
  //   this.setState((prevState) => ({
  //     requisitionStatus: !prevState.requisitionStatus,
  //   }));
  // }

  render() {
    return (
      <Routes />
    );
  }
}

export default App;
