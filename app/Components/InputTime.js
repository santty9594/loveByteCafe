import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import PrimaryText from './PrimaryText';

const INTime = () => {
    const [dt, setDt] = useState(new Date().toLocaleString());
    
    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(secTimer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.direction}>
                <View>
                    <PrimaryText color='black'>In Time</PrimaryText>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={dt}
                        editable={false}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <View style={styles.direction}>
                <View>
                    <PrimaryText color='black'>out Time</PrimaryText>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        value={dt}
                        editable={false}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    direction: {
        alignItems:"center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default INTime;