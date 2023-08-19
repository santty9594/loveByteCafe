import React, { Component } from 'react';
import { connect } from 'react-redux';
import BillForm from './Components/BillForm'
import { getCustomerByPhone, createCustomer } from '../Auth/action';
import { addEndTime } from './action';

class BillScreen extends Component {

    constructor(props) {
        super(props); {
            this.state = {
                customer: { name: "", phone: "", gender: "" }
            }
        }
    }

    getCustomerByPhone = (text, input) => {
        this.state.customer[input] = text;
        if (text.length > 9 && input == 'phone') {
            this.props.getCustomerByPhone({ phone: parseInt(text) });
        }
    }

    setOutTime = (EndTime) => {
        let { totalAmount, selectedTableStartTime, } = this.props;
        let model = { totalAmount, selectedTableStartTime, selectedTableEndTime: EndTime };
        this.props.addEndTime(model);
    }

    handleMakePayment = async () => {
        let { tableCharge, customer } = this.props;
        !tableCharge && alert("Please Enter Out Time");
        if (!customer.id) {
            let { customer } = this.state;
            await this.props.createCustomer(customer);
        }
    }

    render() {
        let { totalAmount, totalPayAmount, totalMinutes,
            tableCharge, customer, selectedTableStartTime, } = this.props;
        return (
            <BillForm
                startTime={selectedTableStartTime}
                totalAmount={totalAmount}
                totalPayAmount={totalPayAmount}
                tableCharge={tableCharge}
                totalMinutes={totalMinutes}
                customer={customer}
                setOutTime={this.setOutTime}
                handleMakePayment={this.handleMakePayment}
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

export default connect(initMapStateToProps, { getCustomerByPhone, addEndTime, createCustomer })(BillScreen);


