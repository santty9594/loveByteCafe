import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = (props) => {
    let { style, selectedTextStyle, data, value, isSearch, dropDownHeight, onChangeValue } = props;
    return (
        <Dropdown
            style={style ? style : styles.borderDropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={selectedTextStyle ? selectedTextStyle : styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            iconColor={'#544D7C'}
            search={isSearch}
            data={data}
            maxHeight={dropDownHeight}
            labelField="label"
            valueField="value"
            placeholder={''}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => onChangeValue(item.value)}
        />
    );
};

export { DropdownComponent };

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 8,
    },
    borderDropdown: {
        paddingLeft: 10,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E4E8ED',
    },
    label: {
        backgroundColor: 'white',
        left: 22,
        zIndex: 999,
        fontSize: 12,
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
        lineHeight: 17,
        color: '#544D7C',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        fontSize: 14,
    },
});