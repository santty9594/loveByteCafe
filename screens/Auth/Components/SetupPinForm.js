
import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import colors from '../../../constants/colors';


const PinScreen = ({ handleNavigation }) => {
  const [inputs, setInputs] = useState({ pin: '', confirmPin: '' });
  const [errors, setErrors] = useState('');

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const handlePinSubmit = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.pin || inputs.pin < 4) {
      handleError('Please enter pin', 'pin');
      valid = false;
    }
    if (!inputs.confirmPin || inputs.confirmPin.length < 4) {
      handleError('Please enter valid password', 'confirmPin');
      valid = false;
    }
    if (inputs.pin !== inputs.confirmPin) {
      handleError('Pin does not match !!', 'confirmPin');
      valid = false;
    }
    if (valid) {
      handleNavigation(inputs.pin);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}></View>
      <View style={{ flex: 2.5, margin: 16 }}>
        <Text style={{ color: '#000', fontSize: 26, fontWeight: 'bold' }}>
          Setup Pin
        </Text>

        <TextInput
          style={styles.textInputStyle}
          contentStyle={styles.textInputContentStyle}
          label="Pin"
          keyboardType="numeric"
          maxLength={4}
          value={inputs.pin}
          onChangeText={text => handleOnChange(text, 'pin')}
          onFocus={() => {
            handleError(null, 'pin');
          }}
        />
        <HelperText type="error" visible={errors.pin}>
          {errors.pin}
        </HelperText>
        <TextInput
          style={styles.textInputStyle}
          contentStyle={styles.textInputContentStyle}
          keyboardType="numeric"
          maxLength={4}
          label="Confirm Pin"
          value={inputs.confirmPin}
          onChangeText={text => handleOnChange(text, 'confirmPin')}
          onFocus={() => {
            handleError(null, 'confirmPin');
          }}
        />
        <HelperText type="error" visible={errors.confirmPin}>
          {errors.confirmPin}
        </HelperText>
        <Button
          style={{ top: 20 }}
          labelStyle={styles.labelStyle}
          buttonColor={colors.tableColor}
          textColor="#fff"
          mode="contained"
          onPress={() => handlePinSubmit()}
        >
          Create Pin
        </Button>
      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:16,
  },
  textInputStyle: {
    backgroundColor: '#fff',
    paddingHorizontal:0,
  },
  textInputContentStyle: {
    color: '#000',
  },
  labelStyle:{fontFamily:'Montserrat-SemiBold'}

});

export default PinScreen;
