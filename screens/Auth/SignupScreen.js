import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signup from './Components/Signup'
import Loader from '../../Components/loader';
import { signup } from './action';

class SignupScreen extends Component {

  handleListClick = (model) => {
    this.props.navigation.navigate('LoginScreen')
  }

  handleSignup = (model) => {
    this.props.signup(model);
    if (this.props.registerSuccess) {
      this.props.navigation.navigate('LoginScreen')
    }else{
      alert(this.props.registerError)
    }
  }

  render() {
    let { registerLoading,registerError } = this.props;
    if (registerLoading) {
      <Loader isLoading={registerLoading} />
    }
    return (
      <Signup
        handleListClick={this.handleListClick}
        handleSignup={this.handleSignup}
      />
    )
  }
};

function initMapStateToProps(state) {
  return {
    registerLoading: state.AuthReducer.registerLoading,
    registerError: state.AuthReducer.registerError,
    registerError: state.AuthReducer.registerError,
    registerMessage: state.AuthReducer.registerMessage,
  };
}

export default connect(initMapStateToProps, { signup })(SignupScreen);
