import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';

const items = [
    { key: 1, name: "Create Update Menu", value: 'MenuCreateUpdateScreen' },
    { key: 2, name: "Report", value: 'ReportScreen' },
]

const ReportForm = ({ handleClicked }) => {
    return (
        <View style={styles.container}>
            {items.map((item, i) => (
                <TouchableOpacity
                    style={[styles.box]}
                    onPress={() => handleClicked(item.value)}
                    key={i}
                >
                    <PrimaryText color='black'>
                        {item.name}
                    </PrimaryText>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
    },
    alignItems: {
        justifyContent: "center", alignItems: "center"
    },
    box: {
        height: 100,
        width: 100,
        margin: 10,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "pink",
        marginTop: 5,
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 8
    },

});

export default ReportForm;