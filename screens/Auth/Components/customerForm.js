import { StyleSheet, View, Keyboard, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, HelperText, Text } from 'react-native-paper';
import { DropdownComponent } from '../../../Components/Dropdown';
import PrimaryText from '../../../Components/PrimaryText';
import useValidateMobileNumber from '../Components/hooks/useValidateMobileNumber';

export default function CustomerInfo({ getCustomerByPhone, customer }) {
    const { handleMobileNumberValidation } = useValidateMobileNumber()
    const [inputs, setInputs] = useState({ name: "", phone: "", });
    const [gender, setGender] = useState();
    const [errors, setErrors] = useState('');

    useEffect(() => {
        setInputs(customer);
        setGender(customer?.gender);
    }, [inputs?.length > 9, customer]);

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
        if (text.length > 9 && input == 'phone') {
            getCustomerByPhone({ phone: parseInt(text) });
        }
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
        if (!inputs.phone) {
            handleError('Please enter contact number', 'phone');
            valid = false;
        }
        else if (handleEmailValidation(inputs.phone) === false) {
            valid = false;
            handleError('Please enter valid last name', 'phone');
        }
        if (valid) {
            console.log('#############');
        }
    };


    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 16 }}>
                <PrimaryText align='left' color='black'  >
                    Customer Details
                </PrimaryText>
            </View>

            <View style={{ flex: 1 }}>
                <TextInput
                    style={[styles.textInputStyle]}
                    contentStyle={[styles.textInputContentStyle]}
                    label="Phone Number"
                    keyboardType='number-pad'
                    value={inputs?.phone}
                    onChangeText={text => handleOnChange(text, 'phone')}
                    onFocus={() => {
                        handleError(null, 'phone');
                    }}
                />
                <HelperText type="error" visible={errors.phone} style={styles.err}>
                    {errors.phone}
                </HelperText>
                <TextInput
                    style={styles.textInputStyle}
                    contentStyle={styles.textInputContentStyle}
                    label="Name"
                    value={inputs?.name}
                    onChangeText={text => handleOnChange(text, 'name')}
                    onFocus={() => {
                        handleError(null, 'name');
                    }}
                />
                <HelperText type="error" visible={errors.name} style={styles.err}>
                    {errors.name}
                </HelperText>
                <View >
                    <Text>
                        Gender
                    </Text>
                    <DropdownComponent
                        style={{
                            backgroundColor: '#ffffff',
                            borderColor: '#E4E8ED',
                            borderBottomWidth: 1
                        }}
                        dropDownHeight={100}
                        data={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                        value={gender}
                        onChangeValue={(value) => setGender(value)}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    textInputStyle: {
        backgroundColor: "#fff",
        paddingHorizontal: 0,
        height: 0,
        margin: 0,
        padding: 0
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