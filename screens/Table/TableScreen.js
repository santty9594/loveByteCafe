import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from './Components/Table';
import { bookedTable, resetTable } from './action';

class TableScreen extends Component {

    handleResetTableClick = (item) => {
        Alert.alert(
            'Alert',
            'Do you want to reset this table', [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Yes', onPress: () => this.props.resetTable(item.value), style: 'Ok' },
        ],
            { cancelable: true },
        )
        return true
    }

    handleListClick = (item) => {
        this.props.bookedTable(item.value);
        this.props.navigation.navigate('MenuScreen', { name: item.name })
    }

    render() {
        let { tableList, selectCategory, } = this.props;
        return (
            <Table
                items={tableList}
                selectCategory={selectCategory}
                handleClicked={this.handleListClick}
                handleResetTable={this.handleResetTableClick}
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
    return bindActionCreators({ bookedTable, resetTable }, dispatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(TableScreen);
