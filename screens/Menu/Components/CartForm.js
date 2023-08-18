import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import RemixIcon from 'react-native-remix-icon';
import BillReciept from './BillReciept';
import InTime from './InTime';
import colors from '../../../constants/colors';

const OrderItem = ({
    OrderItems, handleClickStartTime,
    handleAddQty, selectedTable,
    handleRemoveQty, startTime, handlePlaceOrder
}) => {

    const [totalPay, setTotalPay] = useState(0);

    useEffect(() => {
        let amount = 0;
        OrderItems.map((element) => {
            if (element.selectedTable === selectedTable) {
                amount = amount + element.totalAmount;
            }
        });
        setTotalPay(amount);
    }, [OrderItems, handleAddQty, selectedTable, handleRemoveQty]);

    const memoizedItem = useMemo(() => (
        <View style={styles.cart}>
            <ScrollView>
                {OrderItems.filter(item => item.qty !== 0).map((data, i) => (
                    <View key={i} style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
                        <View style={{ flex: 0.6 }}>
                            <PrimaryText align='left' color='black'>
                                {data.name}
                            </PrimaryText>
                        </View>

                        <View style={{ flex: 0.25, borderWidth: 1, borderRadius: 10, margin: 2, justifyContent: "center" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 2, alignItems: "center" }}>
                                <TouchableOpacity onPress={() => handleRemoveQty(data.id)}>
                                    <RemixIcon name='subtract-line' size={25} color={"red"} />
                                </TouchableOpacity>
                                <Text style={{ textAlign: "center", justifyContent: "center" }}>
                                    {data.qty}
                                </Text>
                                <TouchableOpacity onPress={() => handleAddQty(data.id)}>
                                    <RemixIcon name='add-line' size={25} color={"green"} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 0.15 }}>
                            <PrimaryText color='black'>
                                ₹ {data.totalAmount}
                            </PrimaryText>
                        </View>
                    </View >
                ))}
            </ScrollView>
        </View>
    ), [OrderItems]);


    return (
        <View style={styles.container}>
            <InTime handleStartTime={handleClickStartTime} startTime={startTime} />
            {memoizedItem}
            <BillReciept totalPay={totalPay} handleClick={handlePlaceOrder} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cart: {
        marginTop: 8,
        flex: 0.65,
        backgroundColor: colors.white,
    },

});

export default OrderItem;