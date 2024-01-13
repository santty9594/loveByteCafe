import {StyleSheet, Text, View ,ScrollView} from 'react-native';
import React from 'react';
import {Card, Button} from 'react-native-paper';

export default function InvoiceScreen() {
  const itemList = [
    {id: '1', name: 'Item 1', price: 10},
    {id: '2', name: 'Item 2', price: 15},
  ];

  const totalAmount = itemList.reduce((total, item) => total + item.price, 0);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Invoice</Text>
      <Text style={{alignSelf:'center'}}>Aishwarya</Text>
      <Text style={{alignSelf:'center'}}>8920423580</Text>

      {itemList.map(item => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Text>{item.name}</Text>
            <Text>{'\u20B9'}{item.price}</Text>
          </Card.Content>
        </Card>
      ))}

      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: {'\u20B9'}{totalAmount}</Text>
      </View>
      <Button mode="contained" style={styles.payButton}>
        Pay Now
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  card: {
    top:5,
    marginBottom: 8,
    elevation: 4,
  },
  totalContainer: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#6495ED',

     marginTop: 10,
  },
});
