import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import Colors from '../../../constants/colors';
import PrimaryText from '../../../Components/PrimaryText';
import colors from '../../../constants/colors';

const OrderPage = ({ handleOrder }) => {
    const [inTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    const [outTime, setOutTime] = useState('0:0 PM');

    const handleInputChange = (event) => {
        setOutTime(event.target.value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <View>
                    <PrimaryText color='black'>In Time</PrimaryText>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={inTime}
                        editable={false}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <View style={styles.direction}>
                <View>
                    <PrimaryText color='black'>Order</PrimaryText>
                </View>
                <View onPress={() => handleOrder}>
                    <TouchableOpacity style={[styles.input, { backgroundColor: colors.green }]}>
                        <PrimaryText>ADD</PrimaryText>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.direction}>
                <View>
                    <PrimaryText color='black'>Out Time</PrimaryText>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChange={handleInputChange}
                        value={outTime}
                        editable={true}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    input: {
        borderColor: 'gray',
        width: 80,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default OrderPage;