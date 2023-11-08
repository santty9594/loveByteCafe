import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import BillForm from './Components/BillForm';
import Loader from '../../Components/loader';
import { getCustomerByPhone, createCustomer } from '../Auth/action';
import { addEndTime, makePayment, resetTable } from './action';

class BillScreen extends Component {

    constructor(props) {
        super(props); {
            this.state = {
                loading: false,
                customer: { name: "", phone: "", gender: "" },
                paymentMode: "Cash"
            }
        }
    }

    getCustomerByPhone = (text, input) => {
        this.state.customer[input] = text;
        if (text.length > 9 && input == 'phone') {
            this.props.getCustomerByPhone({ phone: parseInt(text) });
        }
    }

    setPaymentMode = (value) => {
        this.setState({ paymentMode: value })
    }

    setOutTime = (EndTime) => {
        let { totalAmount, selectedTableStartTime, } = this.props;
        let model = { totalAmount, selectedTableStartTime, selectedTableEndTime: EndTime };
        this.props.addEndTime(model);
    }

    handleMakePayment = async () => {
        try {
            let { paymentMode } = this.state;
            let { totalPayAmount, selectedTable } = this.props;
            let customer_id = null, customer_name = null; customer_phone = null; customer_gender = null;
            let { customer } = this.props;
            this.setState({ loading: true });
            if (!customer.id) {
                let { customer } = this.state;
                if (!customer.name || !customer.phone) {
                    this.setState({ loading: false });
                    Alert.alert(
                        'Message',
                        'Please enter the customer name and phone number', [
                        { text: 'Cancel', onPress: () => console.log('Cancel') },
                        { text: 'OK', onPress: () => console.log('OK'), style: 'Ok' },
                    ],
                        { cancelable: true },
                    )
                    return true
                } else {
                    let response = await this.props.createCustomer(customer);
                    if (response && response.id) {
                        customer_id = response?.id;
                        customer_name = response?.name;
                        customer_phone = response?.phone;
                        customer_gender = response?.gender;
                    }
                }
            } else {
                customer_id = customer?.id;
                customer_name = customer?.name;
                customer_phone = customer?.phone;
                customer_gender = customer?.gender;
            }

            let model = {
                customer_id,
                payment_mode: paymentMode,
                customer_name,
                customer_phone,
                customer_gender,
                status: true,
                total_price: totalPayAmount,
                order_date: new Date()
            };
         
            let resutl = await this.props.makePayment(model);
            this.setState({ loading: false });
            if (resutl && resutl.status == 0) {
                alert(resutl?.message);
                await this.props.resetTable(selectedTable);
                setTimeout(() => {
                    this.props.navigation.navigate('ListScreen')
                }, 100)
            } else {
                alert(resutl?.message);
            }
        } catch (error) {
            this.setState({ loading: false });
            console.log(error)
        }
    }


    renderLoading = () => {
        let { loading } = this.state;
        return loading && <Loader isLoading={loading} />
    }

    render() {
        let { totalAmount, totalPayAmount, totalMinutes,
            tableCharge, customer, selectedTableStartTime } = this.props;
        return (
            <>
                <BillForm
                    startTime={selectedTableStartTime}
                    paymentMode={this.state.paymentMode}
                    totalAmount={totalAmount}
                    totalPayAmount={totalPayAmount}
                    tableCharge={tableCharge}
                    totalMinutes={totalMinutes}
                    customer={customer}
                    setOutTime={this.setOutTime}
                    setPaymentMode={this.setPaymentMode}
                    handleMakePayment={this.handleMakePayment}
                    getCustomerByPhone={this.getCustomerByPhone}
                />
                {this.renderLoading()}
            </>
        )
    }
};

function initMapStateToProps(state) {
    return {
        selectedTableStartTime: state.TableReducer.selectedTableStartTime,
        selectedTable: state.TableReducer.selectedTable,
        customer: state.AuthReducer.customer,
        totalPayAmount: state.TableReducer.totalPayAmount,
        totalMinutes: state.TableReducer.totalMinutes,
        tableCharge: state.TableReducer.tableCharge,
        totalAmount: state.TableReducer.totalAmount,
    };
}

export default connect(initMapStateToProps, { getCustomerByPhone, addEndTime, createCustomer, makePayment, resetTable })(BillScreen);


