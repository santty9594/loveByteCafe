import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetupPinForm from './Components/SetupPinForm';
import { setupPin } from './action';

class SetupPinScreen extends Component {

  handleListClick = (pin) => {
    this.props.setupPin(pin);
    this.props.navigation.navigate('EnterPinScreen')
  }

  render() {
    return (
      <SetupPinForm
        handleNavigation={this.handleListClick}
      />
    )
  }
};


export default connect(null, { setupPin })(SetupPinScreen);
