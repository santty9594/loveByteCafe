import React, { Component } from 'react';
import Login from '../Components/Login'

class LoginScreen extends Component {

  handleListClick = () => {
    this.props.navigation.navigate('SignupScreen')
  }

  render() {
    return (
      <Login
        handleNavigation={this.handleListClick}
      />
    )
  }
};

export default LoginScreen;
