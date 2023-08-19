import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './Components/ListItem'
import { tableType } from './action';

class ListScreen extends Component {

    handleListClick = async(name, value) => {
       await this.props.tableType(value)
        this.props.navigation.navigate('TableScreen', { name })
    }

    render() {
        return (
            <ListItem
                onPress={this.handleListClick}
            />
        )
    }
};

function initMapStateToProps(state) {
    return {
        registerLoading: state.AuthReducer.registerLoading,
        loginMessage: state.AuthReducer.loginMessage,
    };
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({ tableType, }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(ListScreen);
