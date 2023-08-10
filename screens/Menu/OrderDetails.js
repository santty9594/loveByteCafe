import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import OrderItem from './Components/OrderForm';
import { addQty, removeQty, RESET } from './action';

class OrderDetails extends Component {

    componentDidMount() {
        this.props.RESET()
    }

    handleAddQty = (id) => {
        this.props.addQty(id)
    }

    handleRemoveQty = (id) => {
        this.props.removeQty(id)
    }

    render() {
        let { OrderItems } = this.props;
        console.log(OrderItems)
        return (
            <OrderItem
                OrderItems={OrderItems}
                handleAddQty={this.handleAddQty}
                handleRemoveQty={this.handleRemoveQty}
            />
        )
    }
};

function initMapStateToProps(state) {
    return {
        OrderItems: state.MenuReducer.OrderItems,
    };
}

export default connect(initMapStateToProps, { addQty, removeQty, RESET })(OrderDetails);


