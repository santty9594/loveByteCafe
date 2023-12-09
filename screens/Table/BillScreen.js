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
            const { paymentMode } = this.state;
            const { totalPayAmount, tableList, selectedTable, createCustomer, makePayment, tableCharge,
                resetTable, navigation, customer, order_in_time, order_out_time, order_amount } = this.props;
            const { id, } = customer;

            const table_no = tableList.find((item) => item.value === selectedTable)?.name;

            this.setState({ loading: true });
            if (!id) {
                const { name, phone } = this.state.customer;
                if (!name || !phone) {
                    this.setState({ loading: false });
                    Alert.alert(
                        'Message',
                        'Please enter the customer name and phone number',
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel') },
                            { text: 'OK', onPress: () => console.log('OK'), style: 'Ok' },
                        ],
                        { cancelable: true }
                    );
                    return;
                }
            } else {
                try {
                    const response = await createCustomer(this.state.customer);
                    this.setState({ loading: false });
                    if (response && response.id) {
                        const { id, name, phone, gender } = response;
                        customer = { id, name, phone, gender };
                    }
                } catch (error) {
                    console.error('Error creating customer:', error);
                }
            }

            const model = {
                customer_id: customer.id,
                payment_mode: paymentMode,
                customer_name: customer.name,
                customer_phone: customer.phone,
                customer_gender: customer.gender,
                table_no: table_no,
                table_charge: tableCharge,
                order_amount,
                order_in_time,
                order_out_time,
                status: true,
                total_price: totalPayAmount,
                order_date: new Date(),
            };

            try {
                const result = await makePayment(model);
                this.setState({ loading: false });

                if (result && result.status === 0) {
                    alert(result?.message);
                    await resetTable(selectedTable);
                    setTimeout(() => {
                        navigation.navigate('ListScreen');
                    }, 100);
                } else {
                    alert(result?.message);
                }
            } catch (error) {
                this.setState({ loading: false });
                console.error('Error making payment:', error);
            }
        } catch (error) {
            console.error('General error:', error);
        }
    };


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
        order_in_time: state.TableReducer.order_in_time,
        order_out_time: state.TableReducer.order_out_time,
        tableList: state.TableReducer.tableList,
        order_amount: state.TableReducer.order_amount,
    };
}

export default connect(initMapStateToProps, { getCustomerByPhone, addEndTime, createCustomer, makePayment, resetTable })(BillScreen);


