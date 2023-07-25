import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from '../Components/ListItem'
import { authLogin } from '../../src/actions/index';

class ListScreen extends Component {
    
    handleListClick = (value) => {
        this.props.authLogin('', value)
        this.props.navigation.navigate('TableScreen')
    }

    render() {
        console.log(this.props.registerLoading)
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
    return bindActionCreators({ authLogin, }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(ListScreen);
