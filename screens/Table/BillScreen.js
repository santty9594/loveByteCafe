import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BillForm from './Components/BillForm'

class BillScreen extends Component {

    render() {
        let { selectedTableStartTime, totalPayAmount } = this.props;
        return (
            <BillForm
                startTime={selectedTableStartTime}
                totalPayAmount={totalPayAmount}
            />
        )
    }
};

function initMapStateToProps(state) {
    return {
        selectedTableStartTime: state.TableReducer.selectedTableStartTime,
        totalPayAmount: state.TableReducer.totalPayAmount,
    };
}

export default connect(initMapStateToProps, {})(BillScreen);


