import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import RemixIcon from 'react-native-remix-icon';
import colors from '../../../constants/colors';

const BIllReciept = ({ totalPay }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 }}>
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

            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]}>
                    <PrimaryText align='center'>
                        Place Order
                    </PrimaryText>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 0.3,
        backgroundColor: colors.white,
    },
    button: {
        paddingVertical: 20,
        flex: 1
    },
});

export default BIllReciept;