import { ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import useValidateMobileNumber from '../Components/hooks/useValidateMobileNumber';

export default function CustomerInfo() {
  const { handleMobileNumberValidation } = useValidateMobileNumber()
  const [inputs, setInputs] = useState({ firstName: '', lastName: '', contactNo: '' });
  const [errors, setErrors] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const onPressSave = async () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.firstName) {
      handleError('Please enter first name', 'firstName');
      valid = false;
    }
    else if (inputs.firstName.length <= 3 || inputs.firstName > 150) {
      valid = false;
      handleError('Please enter valid first name', 'firstName');
    }
    if (!inputs.lastName) {
      handleError('Please enter last name', 'lastName');
      valid = false;
    }
    else if (inputs.lastName.length <= 3 || inputs.lastName > 150) {
      valid = false;
      handleError('Please enter valid last name', 'lastName');
    }
    if (!inputs.contactNo) {
      handleError('Please enter contact number', 'contactNo');
      valid = false;
    }
    else if (handleEmailValidation(inputs.contactNo) === false) {
      valid = false;
      handleError('Please enter valid last name', 'contactNo');
    }
    if (valid) {
      console.log('#############');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        contentStyle={styles.textInputContentStyle}
        label="First Name"
        value={inputs.firstName}
        onChangeText={text => handleOnChange(text, 'firstName')}
        onFocus={() => {
          handleError(null, 'firstName');
        }}
      />
      <HelperText type="error" visible={errors.firstName} style={styles.err}>
        {errors.firstName}
      </HelperText>
      <TextInput
        style={styles.textInputStyle}
        contentStyle={styles.textInputContentStyle}
        label="Last Name"
        value={inputs.lastName}
        onChangeText={text => handleOnChange(text, 'lastName')}
        onFocus={() => {
          handleError(null, 'lastName');
        }}
      />
      <HelperText type="error" visible={errors.lastName} style={styles.err}>
        {errors.lastName}
      </HelperText>
      <TextInput
        style={styles.textInputStyle}
        contentStyle={styles.textInputContentStyle}
        label="Contact Number"
        keyboardType='number-pad'
        value={inputs.contactNo}
        onChangeText={text => handleOnChange(text, 'contactNo')}
        onFocus={() => {
          handleError(null, 'contactNo');
        }}
      />
      <HelperText type="error" visible={errors.contactNo} style={styles.err}>
        {errors.contactNo}
      </HelperText>
      <Picker
        style={{ margin: 16 }}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Button
        style={{ margin: 10, }}
        buttonColor="#6495ED"
        textColor="#fff"
        mode="contained"
        onPress={() => onPressSave()}>
        Save
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputStyle: {
    backgroundColor: '#fff',
    margin: 16
  },
  textInputContentStyle: {
    color: '#000',
  },
  err: {
    left: 15
  }
});
