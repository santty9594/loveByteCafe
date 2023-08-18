import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import PrimaryText from '../../../Components/PrimaryText';

const InOutTime = ({ startTime, setOutTime }) => {
    
    console.log(startTime);

    const [time, setTime] = useState('0:0');

    const handleInputChange = (value) => {
        setTime(value);
        setOutTime(value);
    };

    const ChangeEndTime = () => {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        setTime(time);
        setOutTime(time);
    }

    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <View style={{ flex: 0.5 }}>
                    <PrimaryText color='black'>In Time </PrimaryText>
                </View>
                <View style={{ flex: 0.5 }}>
                    <TextInput
                        editable={false}
                        style={styles.input}
                        value={startTime}
                    />
                </View>
                <View style={{ flex: 0.5 }}>
                </View>
            </View>

            <View style={styles.direction}>
                <View style={{ flex: 0.5 }}>
                    <PrimaryText color='black'>Out Time</PrimaryText>
                </View>
                <View style={{ flex: 0.5 }}>
                    <TextInput
                        style={styles.input}
                        value={time}
                        onChangeText={(value) => handleInputChange(value)}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ flex: 0.5 }}>
                    <Button mode="contained" onPress={() => ChangeEndTime()}>
                        {'End Time'}
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.18,
        marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
    },
    input: {
        borderColor: 'gray',
        width: 90,
        margin: 12,
        borderWidth: 1,
        padding: 8,
    },
});

export default InOutTime;