import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from 'react-native-elements';
import RemixIcon from 'react-native-remix-icon';
import PrimaryText from '../../../Components/PrimaryText';

const InOutTime = ({ startTime, setOutTime, selectTableCategory, paymentMode, setPaymentMode }) => {

    const [inTime] = useState(new Date(startTime));
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState(paymentMode);
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

    const onChangeChecbox = (value) => {
        setMode(value);
        setPaymentMode(value);
    };

    const InTime = () => (
        <View style={styles.direction}>
            <View >
                <PrimaryText color='black' align='left' >In Time </PrimaryText>
            </View>
            <View >
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
    )

    const OutTime = () => (
        <View style={styles.direction}>
            <View>
                <PrimaryText color='black' align='left'>Out Time</PrimaryText>
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
    )

    const PaymentType = () => (
        <View style={[styles.direction, { marginVertical: 10 }]}>
            <View>
                <PrimaryText color='black' align='left'> Payment Mode </PrimaryText>
            </View>
            <View style={{ flexDirection: "row" }}>
                <CheckBox
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        padding: 5,
                        paddingBottom: 0
                    }}
                    size={20}
                    checkedColor={'#262728'}
                    uncheckedColor={'#262728'}
                    textStyle={styles.checkbox}
                    title={"Cash"}
                    checkedIcon={<RemixIcon name="radio-button-line" />}
                    uncheckedIcon={<RemixIcon name="checkbox-blank-circle-line" />}
                    checked={mode == "Cash"}
                    onPress={() => onChangeChecbox('Cash')}
                />
                <CheckBox
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        padding: 5,
                        paddingBottom: 0
                    }}
                    size={20}
                    checkedColor={'#262728'}
                    uncheckedColor={'#262728'}
                    textStyle={styles.checkbox}
                    title={"UPI"}
                    checkedIcon={<RemixIcon name="radio-button-line" />}
                    uncheckedIcon={<RemixIcon name="checkbox-blank-circle-line" />}
                    checked={mode == "UPI"}
                    onPress={() => onChangeChecbox('UPI')}
                />
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            {selectTableCategory && (selectTableCategory !== 3 && selectTableCategory !== 2) && (<InTime />)}
            {selectTableCategory && (selectTableCategory !== 3 && selectTableCategory !== 2) && (<OutTime />)}
            <PaymentType />
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
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
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
    checkbox: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        lineHeight: 17,
        color: '#262728',
    }
});

export default InOutTime;