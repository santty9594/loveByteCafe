import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment';

const TableItem = ({ customer_name, order_date, total_price }) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>{customer_name}</Text>
    <Text style={styles.tableCell}>{moment(order_date).format('MMM DD YYYY h:mm')}</Text>
    <Text style={styles.tableCell}> ₹ {total_price}</Text>
  </View>
);

const TableFooter = ({ totalCustomers, totalDays, totalAmount }) => (
  <View style={styles.tableFooter}>
    <Text>Customer: {totalCustomers}</Text>
    <Text>Days: {totalDays}</Text>
    <Text>Amt: {totalAmount}</Text>
  </View>
);

const TableScreen = ({ data }) => {
  const totalCustomers = Array.from(new Set(data.map((item) => item.customer_name))).length;
  const totalDays = Array.from(new Set(data.map((item) => moment(item.order_date).format('MMM DD YYYY')))).length;
  const totalAmount = data.reduce((sum, item) => sum + item.total_price, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TableItem {...item} />}
        ListFooterComponent={() => <View style={{ height: 80 }} />} // Spacer for the footer
      />
      <TableFooter
        totalCustomers={totalCustomers}
        totalDays={totalDays}
        totalAmount={totalAmount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableFooter: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TableScreen;