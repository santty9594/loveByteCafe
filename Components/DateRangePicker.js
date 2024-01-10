import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}/${year}`;
};

const DateRangePicker = ({ fromDate, toDate, setFromDate, setToDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || (event && event.nativeEvent.timestamp) || new Date();
    setShowDatePicker(false);
    if (fromDate <= toDate) {
      setFromDate(currentDate);
    } else {
      setFromDate(currentDate);
      setToDate(currentDate);
    }
  };

  const showFromDatepicker = () => {
    setShowDatePicker(true);
  };

  const showToDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateContainer} onPress={showFromDatepicker}>
        <TextInput
          style={styles.dateInput}
          editable={false}
          value={`From : ${formatDate(fromDate)}`}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dateContainer} onPress={showToDatepicker}>
        <TextInput
          style={styles.dateInput}
          editable={false}
          value={`To: ${formatDate(toDate)}`}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateContainer: {
    height: 35,
    marginHorizontal: 10,
    backgroundColor: '#828282',
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dateInput: {
    fontSize: 'Lato-Regular',
    color: '#fff',
    fontSize: 14,
    color: "#000"
  },
});

export default DateRangePicker;
