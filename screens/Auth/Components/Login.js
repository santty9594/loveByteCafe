
import React, { useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View,
  Keyboard, TouchableWithoutFeedback,
  KeyboardAvoidingView, TouchableOpacity
} from 'react-native';

import { TextInput, Button, HelperText } from 'react-native-paper';
import useValidateEmail from './hooks/useValidateEmail'

export default function LoginScreen({ handleLogin, handleSignup }) {

  const { handleEmailValidation } = useValidateEmail();

  const [inputs, setInputs] = useState({ email: 'feroz.shaikh@gmail.com', password: 'feroz@123$' });
  const [errors, setErrors] = useState('');

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };

  const emailSignInPress = async () => {
    try {
      Keyboard.dismiss();
      let valid = true;
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
      if (valid) {
        handleLogin({ ...inputs })
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 2.5, margin: 16 }}>
              <Text style={{ color: '#000', fontSize: 26, fontWeight: 'bold' }}>
                Login
              </Text>
              <Text style={{ color: '#BCBCBC', fontSize: 18, fontWeight: 'bold' }}>
                Please sign in to continue
              </Text>
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
              />
              <HelperText type="error" visible={errors.password}>
                {errors.password}
              </HelperText>
              <Button
                style={{ top: 20 }}
                buttonColor="#6495ED"
                textColor="#fff"
                mode="contained"
                onPress={emailSignInPress}>
                Login
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
                Don't have an account ?
              </Text>
              <TouchableOpacity
                onPress={handleSignup}>
                <Text
                  style={{ color: '#000', fontSize: 18, fontWeight: '700', left: 5 }}>
                  Sign up
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
    color: '#000',
  },
});
