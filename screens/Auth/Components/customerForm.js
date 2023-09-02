import { StyleSheet, View, Keyboard ,ScrollView ,Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, HelperText, Text } from 'react-native-paper';
import { DropdownComponent } from '../../../Components/Dropdown';
import PrimaryText from '../../../Components/PrimaryText';
import useValidateMobileNumber from '../Components/hooks/useValidateMobileNumber';


const {height ,width}=    Dimensions.get('window')

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
        getCustomerByPhone(text, input);
    };

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
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
                    maxLength={10}
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
                            borderBottomWidth: 1,
                            height:52
                        }}
                        dropDownHeight={100}
                        data={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                        value={gender}
                        onChangeValue={(value) => { setGender(value), getCustomerByPhone(value, "gender"); }}
                    />
                </View>
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        // marginBottom:8,
        flex: 0.45,
         marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor:'#fff'
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