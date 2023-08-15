import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BillForm from './Components/BillForm'
import { getCustomerByPhone } from '../Auth/action';
import { addEndTime } from './action';

class BillScreen extends Component {

    getCustomerByPhone = (phone) => {
        this.props.getCustomerByPhone(phone)
    }

    setOutTime = (EndTime) => {
        let { totalAmount, selectedTableStartTime, } = this.props;
        let model = { totalAmount, selectedTableStartTime:"3:45 PM", selectedTableEndTime: EndTime };
        this.props.addEndTime(model);
    }

    render() {
        let { totalAmount, totalPayAmount, totalMinutes, tableCharge, customer, selectedTableStartTime, } = this.props;
        return (
            <BillForm
                startTime={selectedTableStartTime}
                totalAmount={totalAmount}
                totalPayAmount={totalPayAmount}
                tableCharge={tableCharge}
                totalMinutes={totalMinutes}
                customer={customer.data}
                setOutTime={this.setOutTime}
                getCustomerByPhone={this.getCustomerByPhone}
            />

        )
    }
};

function initMapStateToProps(state) {
    return {
        selectedTableStartTime: state.TableReducer.selectedTableStartTime,
        customer: state.AuthReducer.customer,
        totalPayAmount: state.TableReducer.totalPayAmount,
        totalMinutes: state.TableReducer.totalMinutes,
        tableCharge: state.TableReducer.tableCharge,
        totalAmount: state.TableReducer.totalAmount,
    };
}

export default connect(initMapStateToProps, { getCustomerByPhone, addEndTime })(BillScreen);


