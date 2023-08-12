import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderItem from './Components/CartForm';
import { addQty, removeQty } from './action';

class OrderDetails extends Component {

    handleAddQty = (id) => {
        this.props.addQty(id)
    }

    handleRemoveQty = (id) => {
        this.props.removeQty(id)
    }

    render() {
        let { selectedMenus,selectedTable } = this.props;
        return (
            <OrderItem
                OrderItems={selectedMenus}
                selectedTable={selectedTable}
                handleAddQty={this.handleAddQty}
                handleRemoveQty={this.handleRemoveQty}
            />
        )
    }
};


function initMapStateToProps(state) {
    return {
        selectedMenus: state.MenuReducer.selectedMenus,
        selectedTable: state.TableReducer.selectedTable
    };
}

export default connect(initMapStateToProps, { addQty, removeQty })(OrderDetails);


