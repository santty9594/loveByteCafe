import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import PrimaryText from '../../../Components/PrimaryText';

const InTime = ({ handleStartTime, startTime }) => {

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
                <View>
                    <PrimaryText color='black'>In Time Start</PrimaryText>
                </View>
                <View>
                    <TextInput
                        editable={isDisable}
                        style={styles.input}
                        value={inTime}
                        onChangeText={(value) => handleInputChange(value)}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
                <View>
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
        width: 90,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default InTime;