import { ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import useValidateMobileNumber from '../Components/hooks/useValidateMobileNumber';

export default function CustomerInfo() {
    const { handleMobileNumberValidation } = useValidateMobileNumber()
    const [inputs, setInputs] = useState({ name: '', lastName: '', contactNo: '' });
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [errors, setErrors] = useState('');

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };

    const onPressSave = async () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.name) {
            handleError('Please enter first name', 'name');
            valid = false;
        }
        else if (inputs.name.length <= 3 || inputs.name > 150) {
            valid = false;
            handleError('Please enter valid first name', 'name');
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
        <View style={styles.container}>
            <TextInput
                style={[styles.textInputStyle, { paddingHorizontal: 0 }]}
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
            <TextInput
                style={[styles.textInputStyle, { paddingHorizontal: 0,marginVertical:0 }]}
                contentStyle={styles.textInputContentStyle}
                label="Name"
                value={inputs.name}
                onChangeText={text => handleOnChange(text, 'name')}
                onFocus={() => {
                    handleError(null, 'name');
                }}
            />
            <HelperText type="error" visible={errors.name} style={styles.err}>
                {errors.name}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    textInputStyle: {
        backgroundColor: '#fff',
    },
    textInputContentStyle: {
        color: '#000',
    },
    pickerStyle: {
        marginTop: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 0, // To remove left and right padding
        color: '#000',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    err: {
        left: 15
    }
});