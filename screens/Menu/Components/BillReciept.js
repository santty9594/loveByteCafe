import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import colors from '../../../constants/colors';

const BIllReciept = ({ totalPay, handleClick }) => {
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#fff", padding: 16 }}>
                <View style={styles.row}>
                    <View>
                        <PrimaryText align='left' color='black' >
                            Total Amount
                        </PrimaryText>
                    </View>
                    <View>
                        <PrimaryText align='left' color='black' >
                            ₹ {totalPay}
                        </PrimaryText>
                    </View>
                </View>
                <View>
                    {totalPay < 100 && (
                        <Text style={styles.note}>
                            Note : {`If you want to get something else, go ahead, because if you order less than 100, you'll need to pay 100`}
                        </Text>
                    )}
                </View>
            </View>

            <View
                style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
                <TouchableOpacity onPress={() => handleClick(totalPay)} style={[styles.button, { backgroundColor: "green" }]}>
                    <PrimaryText align='center'>
                        Place Order
                    </PrimaryText>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 0.2,
    },
    row: {
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    note: {
        fontFamily: "Lato-Regular",
        fontSize: 16,
        lineHeight: 19,
        color: "#333333"
    },
    button: {
        // paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 50

    },
});

export default BIllReciept;