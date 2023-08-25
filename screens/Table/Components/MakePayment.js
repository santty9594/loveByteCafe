import React from 'react';
import { View, StyleSheet, TouchableOpacity, } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';

const MakePayment = ({ handleMakePayment }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleMakePayment} style={[styles.button, { backgroundColor: "green" }]}>
                <PrimaryText align='center' >
                    Make Payment
                </PrimaryText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 0.1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
       
    },
    button: {
     paddingVertical: 20,
        flex: 1
    },
});

export default MakePayment;