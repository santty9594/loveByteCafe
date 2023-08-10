import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import RemixIcon from 'react-native-remix-icon';
import colors from '../../../constants/colors';

const OrderItem = ({ OrderItems, handleAddQty, handleRemoveQty }) => {

    const Item = ({ name, qaty, value, id }) => (
        <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
            <View style={{ flex: 0.6 }}>
                <PrimaryText align='left' color='black'>
                    {name}
                </PrimaryText>
            </View>

            <View style={{ flex: 0.25, borderWidth: 1, borderRadius: 10, margin: 5, justifyContent: "center" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 2, alignItems: "center" }}>
                    <TouchableOpacity onPress={() => handleRemoveQty(id)}>
                        <RemixIcon name='subtract-line' size={25} color={"red"} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", justifyContent: "center" }}>
                        {qaty}
                    </Text>
                    <TouchableOpacity onPress={() => handleAddQty(id)}>
                        <RemixIcon name='add-line' size={25} color={"green"} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 0.15 }}>
                <PrimaryText color='black'>
                   ₹ {value}
                </PrimaryText>
            </View>
        </View >
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                {OrderItems.filter(item => item.qaty !== 0).map((data, i) => (
                    <Item key={data.key} name={data.name} qaty={data.qaty} value={data.totalAmount} id={data.id} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flex: 0.4,
        backgroundColor: colors.white,
    },
});

export default OrderItem;