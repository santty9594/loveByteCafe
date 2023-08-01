import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loader = ({ isLoading }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#000" animating={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#ECEFF1",
        opacity: 0.5,
        alignItems: 'center'
    },
});

export default Loader;