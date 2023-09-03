import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryText from '../../../Components/PrimaryText';

const InTime = ({ handleStartTime, startTime }) => {

    const [time, setTime] = useState(new Date(startTime));
    const [showPicker, setShowPicker] = useState(false);
    const inputRef = useRef(null);

    const onInputPress = () => {
        setShowPicker(true);
    };

    const onChange = (event, selectedTime) => {
        setShowPicker(false);
        if (selectedTime) {
            setTime(selectedTime);
            handleStartTime(selectedTime);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <View>
                    <PrimaryText color='black'>In Time Start</PrimaryText>
                </View>
                <View>
                    {showPicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <TouchableOpacity onPress={onInputPress}>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            value={time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            placeholder="Select a Time"
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>
                <View>
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
        fontWeight: 'bold',
        color: 'gray',
        width: 90,
        height: 30,
        margin: 12,
        borderWidth: 1,
        padding: 8,
    },
});

export default InTime;