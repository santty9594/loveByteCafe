import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
let width = Dimensions.get('window').width;
const BOX_SIZE = width > 400 ? 200 : 100;

const items = [
    { key: 1, name: "Create Update Inventory", value: 'InventoryCreateUpdateScreen' },
    { key: 2, name: "Create Update Menu", value: 'MenuCreateUpdateScreen' },
    { key: 3, name: "Inventory Report", value: 'InventroyReportScreen' },
    { key: 3, name: "Customer Report", value: 'CustomerReportScreen' },
]

const ReportForm = ({ handleClicked }) => {
    return (
        <View
            style={styles.container}>
            {items.map((item, i) => (
                <TouchableOpacity
                    style={[
                        styles.box,
                        {
                            width: BOX_SIZE,
                            height: BOX_SIZE,
                        },
                    ]}
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
        margin: 16,
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