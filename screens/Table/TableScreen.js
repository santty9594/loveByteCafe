import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from './Components/Table';
import { bookedTable } from './action';


class TableScreen extends Component {

    handleListClick = (item) => {
        this.props.bookedTable(item.value);
        this.props.navigation.navigate('OrderScreen', { name: item.name })
    }

    render() {
        let { tableList, selectCategory } = this.props;
        return (
            <Table
                items={tableList}
                selectCategory={selectCategory}
                handleClicked={this.handleListClick}

            />
        )
    }
};

function initMapStateToProps(state) {
    return {
        tableList: state.MYReducer.tableList,
        selectCategory: state.MYReducer.selectCategory,
    };
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({ bookedTable, }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(TableScreen);
