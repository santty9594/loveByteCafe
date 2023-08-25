import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import colors from '../../../constants/colors';

export default function EnterPinScreen({ handleNavigation }) {
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState('');

  const handlePinChange = (value) => {
    setPin(value);
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const handlePinSubmit = () => {
    if (!pin || pin.length < 4) {
      handleError('Enter PIN! ', 'pin');
    }
    handleNavigation(pin);

  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 2.5, margin: 16 }}>
        <Text style={{ color: '#000', fontSize: 26, fontWeight: 'bold' }}>
          Enter Pin
        </Text>

        <TextInput
          style={styles.textInputStyle}
          contentStyle={styles.textInputContentStyle}
          label="Pin"
          keyboardType="numeric"
          maxLength={4}
          value={pin}
          onChangeText={text => handlePinChange(text, 'pin')}
          onFocus={() => {
            handleError(null, 'pin');
          }}
        />
        <HelperText type="error" visible={errors.pin}>
          {errors.pin}
        </HelperText>

        <Button
          style={{ top: 20 }}
          buttonColor={colors.tableColor}
          labelStyle={styles.labelStyle}
          textColor="#fff"
          mode="contained"
          onPress={() => handlePinSubmit()}
        >
          Submit
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:16
  },
  textInputStyle: {
    paddingHorizontal:0,
    backgroundColor: '#fff',
  },
  textInputContentStyle: {
    color: '#000',
  },
  labelStyle:{fontFamily:'Montserrat-SemiBold'}

})