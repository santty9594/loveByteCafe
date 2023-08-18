import React from 'react';
import { Text } from 'react-native';

const FormValidationMessage = (props) => {
    return (
        <Text style={styles.containerStyles}>
            {props.children}
        </Text>
    );
}

const styles = {
    containerStyles: {
        paddingTop: 8,
        textAlign: 'center',
        color: 'red'
    }
}

export default  FormValidationMessage ;
