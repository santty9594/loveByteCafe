import React, { Component } from 'react';
import Login from './Components/Login'
import Loader from '../../Components/loader'
import { connect } from 'react-redux';
import { authLogin } from './action';

class LoginScreen extends Component {

  handleLogin = (data) => {
    this.props.authLogin(data);
    if (this.props.loginSuccess) {
      this.props.navigation.navigate('SetupPinScreen')
    }else{
      alert(this.props.loginError)
    }
  }

  handleSignup = () => {
    this.props.navigation.navigate('SignupScreen');
  }

  render() {
    let { loginLoading } = this.props;
    if (loginLoading) {
      <Loader isLoading={loginLoading} />
    }
    return (
      <Login
        handleLogin={this.handleLogin}
        handleSignup={this.handleSignup}
      />
    )
  }

};


function initMapStateToProps(state) {
  return {
    loginLoading: state.AuthReducer.loginLoading,
    loginError: state.AuthReducer.loginError,
    loginSuccess: state.AuthReducer.loginSuccess,
    loginMessage: state.AuthReducer.loginMessage,
  };
}

export default connect(initMapStateToProps, { authLogin })(LoginScreen);
