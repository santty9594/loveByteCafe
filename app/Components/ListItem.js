import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryText from './PrimaryText';

const ListItem = ({ onPress }) => {

    const Item = ({ name, value }) => (
        <TouchableOpacity style={styles.item} onPress={() => onPress(value)}>
            <View style={styles.item1}>
                <PrimaryText>
                    {name}
                </PrimaryText>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Item name="Couple Table" value={1} />
            <Item name="Party Hall" value={2} />
            <Item name="Normal Table" value={3} />
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