import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryText from './PrimaryText';
import Constant from '../../src/constants/values';

const ListItem = ({ onPress }) => {
    const Item = ({ name, value }) => (
        <TouchableOpacity style={styles.item} onPress={() => onPress(name, value)}>
            <View style={styles.item1}>
                <PrimaryText>
                    {name}
                </PrimaryText>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {Constant.listItem.map((data, i) => (
                <Item key={data.key} name={data.name} value={data.value} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        width: '100%',
        alignItems: "center",
        padding: 20,
    },
    item1: {
        backgroundColor: "#6495ED",
        width: '100%',
        alignItems: "center",
        borderRadius: 20,
        padding: 20,
    },
});

export default ListItem;