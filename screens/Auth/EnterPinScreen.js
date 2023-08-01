import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnterPinForm from './Components/EnterPinForm';

class EnterPinScreen extends Component {

  handleListClick = (pin) => {
    if (this.props.pinNumber === pin) {
      this.props.navigation.navigate('ListScreen')
    } else {
      alert("Pin Not Matched")
    }
  }

  render() {
    return (
      <EnterPinForm
        handleNavigation={this.handleListClick}
      />
    )
  }
};

function initMapStateToProps(state) {
  return {
    pinNumber: state.AuthReducer.pinNumber,
  };
}


export default connect(initMapStateToProps, {})(EnterPinScreen);
