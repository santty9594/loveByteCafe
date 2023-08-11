import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const InvoiceScreen = () => {
  const restaurantName = "Love Byte Cafe";
  const restaurantAddress = "123 Main St, City";
  const tableNumber = "Table No: 5";
  const billNumber = "Bill No: 12345";

  const [items, setItems] = useState([
    { id: '1', name: 'Item 1', quantity: 2, price: 10 },
    { id: '2', name: 'Item 2', quantity: 3, price: 15 },
    // Add more items here
  ]);

  const tableCharge = 5; // Example table charge

  const renderItemList = () => {
    return items.map(item => (
      <View key={item.id} style={styles.itemRow}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text  style={{paddingRight:10}} >{item.quantity}</Text>
        <Text style={{paddingRight:10}}>${item.price}</Text>
        <Text style={{paddingRight:10}}>${item.quantity * item.price}</Text>
      </View>
    ));
  };

  const calculateSubtotal = () => {
    return items.reduce((subtotal, item) => subtotal + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + tableCharge;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.restaurantAddress}>{restaurantAddress}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.info}>{tableNumber}</Text>
        <Text style={styles.info}>{billNumber}</Text>
        <Text style={styles.info}>Date/Time: {new Date().toLocaleString()}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.itemRow}>
          <Text style={styles.heading}>Item</Text>
          <Text style={styles.heading}>Qty</Text>
          <Text style={styles.heading}>Rate</Text>
          <Text style={styles.heading}>Amount</Text>
        </View>

        {renderItemList()}
      </View>
      <View style={styles.section}>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Subtotal:</Text>
          <Text>${calculateSubtotal()}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Table Charge:</Text>
          <Text>${tableCharge}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemName}>Total:</Text>
          <Text>${calculateTotal()}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.thankYouMessage}>Thank you for visiting Love Byte Cafe</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  restaurantAddress: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
   
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
   
  },
  heading: {
    fontWeight: 'bold',
  },
  itemName: {
    flex: 2,
    backgroundColor:'yellowr'
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    bottom:18,
  },
  thankYouMessage: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default InvoiceScreen;
