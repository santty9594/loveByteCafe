import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import PrimaryText from '../../../Components/PrimaryText';

const InOutTime = ({ handleStartTime, startTime }) => {

    const [inTime, setInTime] = useState(startTime ? startTime : "0:0");
    const [isDisable, setDisable] = useState(false);

    const handleInputChange = (value) => {
        setInTime(value);
        handleStartTime(value);
    };

    const ChangeStartTime = () => {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        setInTime(time);
        handleStartTime(time);
        setDisable(!isDisable)
    }

    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <View style={{ flex: 0.5 }}>
                    <PrimaryText color='black'>In Time Start</PrimaryText>
                </View>
                <View style={{ flex: 0.5}}>
                    <TextInput
                        editable={true}
                        style={styles.input}
                        value={inTime}
                        onChangeText={(value) => handleInputChange(value)}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
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
                        value={inTime}
                        onChangeText={(value) => handleInputChange(value)}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ flex: 0.5 }}>
                    <Button mode="contained" onPress={() => ChangeStartTime()}>
                        {isDisable ? 'Edit' : 'Start'}
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.2,
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