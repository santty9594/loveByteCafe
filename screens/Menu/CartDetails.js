import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import OrderItem from './Components/CartForm';
import { addQty, removeQty, addStartTimeTable, placeOrder } from './action';

class OrderDetails extends Component {
    constructor(props) {
        super(props); {
            this.state = {
                initialStartTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
            }
        }
    }

    handleAddQty = (id) => {
        this.props.addQty(id)
    }

    handleRemoveQty = (id) => {
        this.props.removeQty(id, this.props.selectedTable)
    }

    handleClickStartTime = (startTime) => {
        this.props.addStartTimeTable(
            {
                selectedTable: this.props.selectedTable, startTime
            }
        )
    }

    handlePlaceOrder = async (totalPay) => {
        await this.handleClickStartTime(this.state.initialStartTime);
        await this.props.placeOrder(totalPay);
        this.props.navigation.navigate('BillScreen')
    }

    render() {
        let { selectedMenus, selectedTable, selectedTableStartTime } = this.props;
        selectedTableStartTime = (selectedTableStartTime !== '0:0') ? selectedTableStartTime : this.state.initialStartTime;

        selectedMenus = Array.isArray(selectedMenus) ?
            selectedMenus.filter(item => item.selectedTable === selectedTable)
            : selectedMenus;

        return (
            <OrderItem
                OrderItems={selectedMenus}
                startTime={selectedTableStartTime}
                selectedTable={selectedTable}
                handleAddQty={this.handleAddQty}
                handleRemoveQty={this.handleRemoveQty}
                handleClickStartTime={this.handleClickStartTime}
                handlePlaceOrder={this.handlePlaceOrder}
            />
        )
    }
};


function initMapStateToProps(state) {
    return {
        selectedMenus: state.MenuReducer.selectedMenus,
        selectedTableStartTime: state.TableReducer.selectedTableStartTime,
        selectedTable: state.TableReducer.selectedTable
    };
}

export default connect(initMapStateToProps, { addQty, removeQty, addStartTimeTable, placeOrder })(OrderDetails);


