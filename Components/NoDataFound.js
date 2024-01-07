import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Assets from '../constants/assets';

const NoDataFound = () => {
    return (
        <View style={styles.containder}>
            <Image  resizeMode='cover' source={Assets.Images.noData} />
            <Text style={styles.text}>No Data Found</Text>
        </View>
    );
};

export { NoDataFound };

const styles = StyleSheet.create({
    containder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        paddingTop: 20,
        fontFamily: "Lato-Medium",
        fontSize: 20,
        lineHeight: 16,
        color: "gray"
    }

});