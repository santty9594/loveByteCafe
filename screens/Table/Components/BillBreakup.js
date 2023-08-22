import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import RemixIcon from 'react-native-remix-icon';
import colors from '../../../constants/colors';

const BIllReciept = ({ totalAmount, totalMinutes, totalPayAmount, tableCharge }) => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 16, paddingLeft: 16 }}>
                <PrimaryText align='left' color='black' >
                    Bill Reciept
                </PrimaryText>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
                <View style={{ flex: 0.8 }}>
                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='left' color='black'>
                            Total
                        </PrimaryText>
                    </View>

                    <View style={{ marginVertical: 10, justifyContent: "center" }}>
                        <PrimaryText align='left' color='black'>
                            {`Table Charge ( ${totalMinutes} minutes)`}   <RemixIcon name='information-line' size={18} color={"#000"} />
                        </PrimaryText>
                    </View>
                </View>

                <View style={{ flex: 0.3 }}>
                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='right' color='black'>
                            {totalAmount} ₹
                        </PrimaryText>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='right' color='black'>
                            {tableCharge} ₹
                        </PrimaryText>
                    </View>
                </View>
            </View>

            <View style={{ borderWidth: 1,  borderColor: '#808080', marginHorizontal: 16 }} />

            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
                <View >
                    <PrimaryText align='right' color='black'>
                        Pay Total
                    </PrimaryText>
                </View>
                <View >
                    <PrimaryText align='right' color='black'>
                        {totalPayAmount} ₹
                    </PrimaryText>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 0.4,
        backgroundColor: colors.white,
    },
    button: {
        paddingVertical: 20,
        flex: 1
    },
});

export default BIllReciept;