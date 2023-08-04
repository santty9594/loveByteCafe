import React, { Component } from 'react';
import OrderPage from './Components/OrderPage';

class OrderScreen extends Component {

    handleListClick = () => {
        this.props.navigation.navigate('MenuScreen', { name: "Menu" })
    }

    render() {
        return (
            <OrderPage
                handleOrder={this.handleListClick}
            />
        )
    }
};


export default OrderScreen;
