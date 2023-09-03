import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../Components/loader'
import MenusComponent from './Components/MenuForm';
import {
    getMenuItems,
    getMenuCategory,
    addItemMenu,
    getTableStartTime
} from './action';

class MenuScreen extends Component {

    componentDidMount() {
        this.props.getMenuItems();
        this.props.getMenuCategory({}, this.props.selectedTable);
        this.props.getTableStartTime(this.props.selectedTable);
    }

    handleCardClick = (value) => {
        let { selectedTable } = this.props;
        let model = { ...value, qty: 1, selectedTable, totalAmount: value.price };
        this.props.addItemMenu(model);
    }

    renderLoading = () => {
        let { loginLoading } = this.props;
        return loginLoading && <Loader isLoading={loginLoading} />
    }

    render() {
        let { menusItems, menuCategory, } = this.props;
        return (
            <>
                <MenusComponent
                    menusItems={menusItems}
                    menuCategory={menuCategory}
                    handleCardClick={this.handleCardClick}
                />
            </>
        )
    }
};

function initMapStateToProps(state) {
    return {
        menusItems: state.MenuReducer.menusItems,
        menuCategory: state.MenuReducer.menuCategory,
        OrderItems: state.MenuReducer.OrderItems,
        selectCategory: state.TableReducer.selectCategory,
        selectedTable: state.TableReducer.selectedTable
    };
}

export default connect(initMapStateToProps, {
    getMenuItems,
    getMenuCategory,
    addItemMenu,
    getTableStartTime
})(MenuScreen);
