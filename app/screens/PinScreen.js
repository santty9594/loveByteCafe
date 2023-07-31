
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import colors from '../../src/constants/colors';

const PinScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');

  const handlePinChange = (value) => {
    setPin(value);
  };

  const handlePinSubmit = () => {
    // Check the PIN here, you can implement your own logic
    // For example, compare the entered PIN with the saved PIN in your app
    if (pin === '1234') {
      // Navigate to the next screen or perform the necessary action
      console.log('PIN is correct!'); // Replace this with your desired action
    } else {
      console.log('Incorrect PIN!'); // Replace this with your desired action
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <TextInput
        style={styles.pinInput}
        keyboardType="numeric"
        maxLength={4}
        value={pin}
        onChangeText={handlePinChange}
        secureTextEntry
      />
      <TouchableOpacity style={styles.submitButton} onPress={handlePinSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:colors.primaryColor,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color:colors.black
    },
    pinInput: {
      fontSize: 20,
      borderWidth: 1,
      borderColor: '#333',
      padding: 10,
      borderRadius: 5,
      width: 200,
      textAlign: 'center',
      marginBottom: 20,
      color:colors.black
    },
    submitButton: {
        backgroundColor: colors.buttonColor,
        padding: 10,
        borderRadius: 5,
      },
      submitButtonText: {
        color: colors.primaryColor,
        fontSize: 16,
        textAlign: 'center',
      },
    });
    
    export default PinScreen;
  