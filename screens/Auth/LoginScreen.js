import React, { Component } from 'react';
import Login from './Components/Login'
import Loader from '../../Components/loader'
import { connect } from 'react-redux';
import { authLogin,reset } from './action';

class LoginScreen extends Component {

  componentDidMount(){
    this.props.reset();
  }

  handleLogin = async (data) => {
    await this.props.authLogin(data);
    if (this.props.loginSuccess) {
      this.props.navigation.navigate('SetupPinScreen')
    } else {
      alert(this.props.loginError)
    }
  }

  handleSignup = () => {
    this.props.navigation.navigate('SignupScreen');
  }

  renderLoading = () => {
    let { loginLoading } = this.props;
    return loginLoading && <Loader isLoading={loginLoading} />
  }

  render() {
    return (
      <>
        <Login
          handleLogin={this.handleLogin}
          handleSignup={this.handleSignup}
        />
        {this.renderLoading()}
      </>
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

export default connect(initMapStateToProps, { authLogin,reset })(LoginScreen);
