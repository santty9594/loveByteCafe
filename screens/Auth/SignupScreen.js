import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signup from './Components/Signup'
import Loader from '../../Components/loader';
import { signupUser } from './action';

class SignupScreen extends Component {

  handleListClick = () => {
    this.props.navigation.navigate('LoginScreen')
  }

  handleSignup = async (model) => {
    await this.props.signupUser(model);
    if (this.props.registerSuccess) {
      this.props.navigation.navigate('LoginScreen')
    } else {
      alert(this.props.registerError)
    }
  }

  renderLoading = () => {
    let { registerLoading } = this.props;
    return registerLoading && <Loader isLoading={registerLoading} />
  }

  render() {
    return (
      <>
        <Signup
          handleListClick={this.handleListClick}
          handleSignup={this.handleSignup}
        />
        {this.renderLoading()}
      </>
    )
  }
};

function initMapStateToProps(state) {
  return {
    registerLoading: state.AuthReducer.registerLoading,
    registerError: state.AuthReducer.registerError,
    registerSuccess: state.AuthReducer.registerSuccess,
  };
}

export default connect(initMapStateToProps, { signupUser })(SignupScreen);
