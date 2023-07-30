import React, { Component } from 'react';
import Signup from '../Components/Signup'

class SignupScreen extends Component {

  handleListClick = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  render() {
    return (
      <Signup
        handleNavigation={this.handleListClick}
      />
    )
  }
};

export default SignupScreen;
