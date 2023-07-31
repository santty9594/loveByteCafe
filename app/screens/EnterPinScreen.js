import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../src/constants/colors';
import {TextInput, Button, HelperText} from 'react-native-paper';

export default function EnterPinScreen() {
    const [pin, setPin] = useState('');
    const [errors, setErrors] = useState('');


    const handlePinChange = (value) => {
      setPin(value);
    };
    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({...prevState, [input]: errorMessage}));
      };
  
    const handlePinSubmit = () => {
      // Check the PIN here, you can implement your own logic
      // For example, compare the entered PIN with the saved PIN in your app
      if (pin === '1234') {
        // Navigate to the next screen or perform the necessary action
        console.log('PIN is correct!'); // Replace this with your desired action
      } 
       else if(!pin || pin.length < 4){
        handleError('Enter PIN! ', 'pin');
       } else {
        handleError('Incorrect PIN!', 'pin');
      }
    };
  return (
    <View style={styles.container}>
    <View style={{flex: 1}}></View>
    <View style={{flex: 2.5, margin: 16}}>
      <Text style={{color: '#000', fontSize: 26, fontWeight: 'bold'}}>
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
        style={{top: 20}}
        buttonColor="#6495ED"
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
      },
      textInputStyle: {
        backgroundColor: '#fff',
      },
      textInputContentStyle: {
        color: '#000',
      },
})