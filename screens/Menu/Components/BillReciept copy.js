import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import RemixIcon from 'react-native-remix-icon';
import colors from '../../../constants/colors';

const BIllReciept = ({ }) => {
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
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

                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='left' color='black'>
                            Table Charge
                        </PrimaryText>
                    </View>

                    <View style={{ borderWidth: 1, backgroundColor: '#F5F5F5', marginVertical: 4 }} />

                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='left' color='black'>
                            Total Pay
                        </PrimaryText>
                    </View>

                </View>

                <View style={{ flex: 0.3 }}>
                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='right' color='black'>
                            1230 ₹
                        </PrimaryText>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='right' color='black'>
                            1230 ₹
                        </PrimaryText>
                    </View>

                    <View style={{ borderWidth: 1, backgroundColor: '#F5F5F5', marginVertical: 4 }} />

                    <View style={{ marginVertical: 10 }}>
                        <PrimaryText align='right' color='black'>
                            1230 ₹
                        </PrimaryText>
                    </View>
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