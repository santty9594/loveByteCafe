
import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import useValidateEmail from '../Components/hooks/useValidateEmail';
import useValidateMobileNumber from '../Components/hooks/useValidateMobileNumber';

export default function SignupScreen({ handleNavigation }) {
    const { handleEmailValidation } = useValidateEmail();
    const { handleMobileNumberValidation } = useValidateMobileNumber();
    const [inputs, setInputs] = useState({
        fullname: '',
        mobileNo: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState('');

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };
    const validatePassword = () => {
        if (
            inputs.password !== inputs.confirmPassword &&
            (inputs.password !== '' || inputs.confirmPassword !== '')
        ) {
            handleError('Password does not match', 'confirmPassword');
        } else {
            handleError(null, 'confirmPassword');
        }
    };

    const emailSignUpPress = async () => {
        Keyboard.dismiss();
        let valid = true;
        if (
            !inputs.fullname ||
            inputs.fullname.length < 3 ||
            inputs.fullname.length > 50
        ) {
            handleError('Please enter valid full name', 'fullname');
            valid = false;
        }
        if (!inputs.email) {
            handleError('Please enter email address', 'email');
            valid = false;
        } else if (handleEmailValidation(inputs.email) === false) {
            valid = false;
            handleError('Please enter valid email address', 'email');
        }
        if (!inputs.password || inputs.password.length < 6) {
            handleError('Please enter valid password', 'password');
            valid = false;
        }
        if (!inputs.mobileNo) {
            handleError('Please enter contact number', 'mobileNo');
            valid = false;
        } else if (handleMobileNumberValidation(inputs.mobileNo) === false) {
            handleError(
                'Please enter Valid contact number starting with 9876 ',
                'mobileNo',
            );
            valid = false;
        }
        if (!inputs.confirmPassword) {
            handleError('Please enter confirm password', 'confirmPassword');
            valid = false;
        }
        if (valid) {
            console.log('#############');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <View style={{ flex: 0.1 }}></View>
                        <View style={{ flex: 2.5, margin: 16 }}>
                            <Text style={{ color: '#000', fontSize: 26, fontWeight: 'bold' }}>
                                Sign Up
                            </Text>
                            <TextInput
                                style={styles.textInputStyle}
                                contentStyle={styles.textInputContentStyle}
                                label="Full Name"
                                value={inputs.fullname}
                                onChangeText={text => handleOnChange(text, 'fullname')}
                                onFocus={() => {
                                    handleError(null, 'fullname');
                                }}
                            />
                            <HelperText type="error" visible={errors.fullname}>
                                {errors.fullname}
                            </HelperText>
                            <TextInput
                                style={styles.textInputStyle}
                                contentStyle={styles.textInputContentStyle}
                                label="Mobile Number"
                                keyboardType="number-pad"
                                value={inputs.mobileNo}
                                onChangeText={text => handleOnChange(text, 'mobileNo')}
                                onFocus={() => {
                                    handleError(null, 'mobileNo');
                                }}
                            />
                            <HelperText type="error" visible={errors.mobileNo}>
                                {errors.mobileNo}
                            </HelperText>

                            <TextInput
                                style={styles.textInputStyle}
                                contentStyle={styles.textInputContentStyle}
                                label="Email"
                                value={inputs.email}
                                onChangeText={text => handleOnChange(text, 'email')}
                                onFocus={() => {
                                    handleError(null, 'email');
                                }}
                            />
                            <HelperText type="error" visible={errors.email}>
                                {errors.email}
                            </HelperText>
                            <TextInput
                                style={styles.textInputStyle}
                                contentStyle={styles.textInputContentStyle}
                                label="Password"
                                value={inputs.password}
                                onChangeText={text => handleOnChange(text, 'password')}
                                onFocus={() => {
                                    handleError(null, 'password');
                                }}
                                onBlur={validatePassword}
                            />
                            <HelperText type="error" visible={errors.password}>
                                {errors.password}
                            </HelperText>
                            <TextInput
                                style={styles.textInputStyle}
                                contentStyle={styles.textInputContentStyle}
                                label="Confirm Password"
                                value={inputs.confirmPassword}
                                onChangeText={text => handleOnChange(text, 'confirmPassword')}
                                onFocus={validatePassword}
                                onBlur={validatePassword}
                            />
                            <HelperText type="error" visible={errors.confirmPassword}>
                                {errors.confirmPassword}
                            </HelperText>
                            <Button
                                style={{ top: 20 }}
                                buttonColor="#6495ED"
                                textColor="#fff"
                                mode="contained"
                                onPress={() => emailSignUpPress()}>
                                Sign Up
                            </Button>
                        </View>

                        <View
                            style={{
                                flex: 0.5,
                                flexDirection: 'row',
                                alignItems: 'center',

                                justifyContent: 'center',
                            }}>
                            <Text style={{ color: '#000', fontSize: 18, fontWeight: '200' }}>
                                Already have an account ?
                            </Text>
                            <TouchableOpacity
                                onPress={() => handleNavigation()}>
                                <Text
                                    style={{ color: '#000', fontSize: 18, fontWeight: '700', left: 5 }}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        backgroundColor: '#fff',
    },
    textInputStyle: {
        backgroundColor: '#fff',
    },
    textInputContentStyle: {
        height:30,
        color: '#000',
    },
});