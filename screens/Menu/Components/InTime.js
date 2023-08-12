import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';

const InTime = ({ handleOrder }) => {
    const [inTime, setInTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));

    const handleInputChange = (value) => {
        setInTime(value);
    };

    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <View>
                    <PrimaryText color='black'>In Time Start</PrimaryText>
                </View>
                <View style={{ marginRight: 50 }}>
                    <TextInput
                        style={styles.input}
                        value={inTime}
                        onChangeText={(value) => handleInputChange(value)}
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
        flex: 0.1,
        marginTop: 8,
        paddingHorizontal: 16,
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

export default InTime;