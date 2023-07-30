import React, { Component } from 'react';
import OrderPage from '../Components/OrderPage';

class OrderScreen extends Component {

    handleListClick = () => {
        console.log("hello")
        this.props.navigation.navigate('MenuScreen')
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
