import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DashboardForm from './Components/DashboardForm';
import { connect } from 'react-redux';

class MenuCreate extends Component {
    constructor(props) {
        super(props); {
            this.state = {
            }
        }
    }

    handleCardClick = (screenName) => {
        this.props.navigation.navigate(screenName)
    }


    render() {
        return (
            <DashboardForm
                handleClicked={this.handleCardClick}
            />
        )
    }
};



export default connect(null, {})(MenuCreate);


