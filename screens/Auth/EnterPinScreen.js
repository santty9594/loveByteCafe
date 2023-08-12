import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnterPinForm from './Components/EnterPinForm';

import { getMenuItems, getMenuCategory } from '../Menu/action'

class EnterPinScreen extends Component {

  handleListClick = (pin) => {
    if (this.props.pinNumber === pin) {
      this.props.navigation.navigate('ListScreen')
      this.props.getMenuItems();
      this.props.getMenuItems();
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


export default connect(initMapStateToProps, { getMenuItems, getMenuCategory })(EnterPinScreen);
