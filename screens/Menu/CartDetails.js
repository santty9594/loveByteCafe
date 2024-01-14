import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import OrderItem from './Components/CartForm';
import { addQty, removeQty, addStartTimeTable, placeOrder } from './action';
import { addEndTime } from '../Table/action';

class OrderDetails extends Component {
    constructor(props) {
        super(props); {
            this.state = {
            }
        }
    }

    handleAddQty = (id) => {
        this.props.addQty(id, this.props.selectedTable);
    }

    handleRemoveQty = (id) => {
        this.props.removeQty(id, this.props.selectedTable);
    }

    handleClickStartTime = (startTime) => {
        this.props.addStartTimeTable(
            {
                selectedTable: this.props.selectedTable, startTime
            }
        )
    }

    handlePlaceOrder = async (totalPay) => {
        let { selectCategory } = this.props;
        if (totalPay === 0) {
            Alert.alert(
                'Message',
                'Please add at least one menu item', [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => console.log('Press Ok'), style: 'Ok' },
            ],
                { cancelable: true },
            )
            return true
        }
        if (totalPay < 100 && selectCategory === 1) {
            totalPay = 100;
        }
        await this.props.placeOrder(totalPay);
        this.calculateTime(totalPay);
        this.props.navigation.navigate('BillScreen')
    }

    calculateTime = (totalAmount) => {
        let { selectedTableStartTime, selectCategory } = this.props;
        let model = {
            totalAmount,
            selectCategory,
            selectedTableStartTime: new Date(selectedTableStartTime),
            selectedTableEndTime: new Date()
        };
        this.props.addEndTime(model);
    }

    render() {
        let { selectedMenus, selectedTable, selectedTableStartTime, selectCategory } = this.props;
        selectedMenus = Array.isArray(selectedMenus) ?
            selectedMenus.filter(item => item.selectedTable === selectedTable)
            : selectedMenus;
        return (
            <OrderItem
                OrderItems={selectedMenus}
                selectTableCategory={selectCategory}
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
        selectCategory: state.TableReducer.selectCategory,
        selectedTableStartTime: state.TableReducer.selectedTableStartTime,
        selectedTable: state.TableReducer.selectedTable
    };
}

export default connect(initMapStateToProps, {
    addQty, removeQty,
    addStartTimeTable, placeOrder,
    addEndTime
})(OrderDetails);


