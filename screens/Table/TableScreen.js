import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from './Components/Table';
import { bookedTable } from './action';


class TableScreen extends Component {

    handleListClick = (item) => {
        this.props.bookedTable(item.value);
        this.props.navigation.navigate('MenuScreen', { name: item.name })
    }

    render() {
        let { tableList, selectCategory, menuCategory } = this.props;
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
        tableList: state.TableReducer.tableList,
        menuCategory: state.MenuReducer.menuCategory,
        menusItems: state.MenuReducer.menusItems,
        selectCategory: state.TableReducer.selectCategory,
    };
}

function initMapDispatchToProps(dispatch) {
    return bindActionCreators({ bookedTable, }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(TableScreen);
