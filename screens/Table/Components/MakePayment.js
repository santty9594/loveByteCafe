import React from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';

const MakePayment = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]}>
                    <PrimaryText align='center' >
                        Make Payment
                    </PrimaryText>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 0.14,
    },
    button: {
        paddingVertical: 20,
        flex: 1
    },
});

export default MakePayment;