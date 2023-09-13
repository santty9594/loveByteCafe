import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryText from '../../../Components/PrimaryText';

const InOutTime = ({ startTime, setOutTime }) => {

    const [inTime] = useState(new Date(startTime));
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const inputRef = useRef(null);

    const onInputPress = () => {
        setShowPicker(true);
    };

    const onChange = (event, selectedTime) => {
        setShowPicker(false);
        if (selectedTime) {
            setTime(selectedTime);
            setOutTime(selectedTime);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <View style={{ flex: 0.5 }}>
                    <PrimaryText color='black' align='left' >In Time </PrimaryText>
                </View>
                <View style={{ flex: 0.5 }}>
                    <TextInput
                        editable={false}
                        style={styles.input}
                        value={inTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    />
                </View>
            </View>

            <View style={styles.direction}>
                <View style={{ flex: 0.5 }}>
                    <PrimaryText color='black' align='left' >Out Time</PrimaryText>
                </View>
                <View style={{ flex: 0.5 }}>
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
                            value={time.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                            placeholder="Select a Time"
                            editable={false}
                        />
                    </TouchableOpacity>
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
        // height:52
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
    },
    input: {
        fontWeight: 'bold',
        color: 'gray',
        width: 90,
        height: 31,
        margin: 12,
        borderWidth: 1,
        padding: 8,
    },
});

export default InOutTime;