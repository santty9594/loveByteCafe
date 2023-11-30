import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';

const FilterOptions = {
  ALL: 'all',
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_30_DAYS: 'last30days',
};

const filterData = (data, selectedFilter) => {
  const currentDate = moment();
  return data.filter(item => {
    const itemDate = moment(item.order_date);
    switch (selectedFilter) {
      case FilterOptions.TODAY:
        return itemDate.isSame(currentDate, 'day');
      case FilterOptions.YESTERDAY:
        return itemDate.isSame(currentDate.clone().subtract(1, 'days'), 'day');
      case FilterOptions.LAST_30_DAYS:
        return itemDate.isAfter(currentDate.clone().subtract(30, 'days'));
      default:
        return true; // 'all' filter, show all data
    }
  });
};


const TableItem = ({
  customer_name, customer_phone, customer_gender, table_no,
  order_date, total_price, order_in_time, order_out_time, order_amount,
  table_charge, payment_mode }) => (
  <View style={styles.tableRow}>
    <Text style={{ textAlign: "left", width: 70 }}>{table_no}</Text>
    <Text style={{ textAlign: "left", width: 120 }}>{customer_name}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{customer_phone}</Text>
    <Text style={{ textAlign: "left", width: 60 }}>{customer_gender}</Text>
    <Text style={{ textAlign: "left", width: 130 }}>{moment(order_date).format('MMM DD YYYY h:mm')}</Text>
    <Text style={{ textAlign: "left", width: 100 }}> {order_in_time}</Text>
    <Text style={{ textAlign: "left", width: 100 }}> {order_out_time}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{order_amount && `₹ ${order_amount}`}</Text>
    <Text style={{ textAlign: "left", width: 100 }}> {table_charge && `₹ ${table_charge}`}</Text>
    <Text style={{ textAlign: "left", width: 80 }}> {total_price && `₹ ${total_price}`}</Text>
    <Text style={{ textAlign: "left", width: 100 }}> {payment_mode}</Text>
  </View>
);

const TableFooter = ({ totalCustomers, totalDays, totalAmount }) => (
  <View style={styles.tableFooter}>
    <Text>Customer: {totalCustomers}</Text>
    <Text>Days: {totalDays}</Text>
    <Text>Total: ₹{totalAmount}</Text>
  </View>
);

const TableScreen = ({ data }) => {
  const [selectedFilter, setSelectedFilter] = useState(FilterOptions.ALL);
  const filteredData = filterData(data, selectedFilter);

  const totalCustomers = Array.from(new Set(filteredData.map((item) => item.customer_name))).length;
  const totalDays = Array.from(new Set(filteredData.map((item) => moment(item.order_date).format('MMM DD YYYY')))).length;
  const totalAmount = filteredData.reduce((sum, item) => sum + item.total_price, 0);

  const TableHeader = () => {
    if (!filteredData.length) {
      return
    }
    return (
      <View style={styles.tableHead}>
        <Text style={[styles.textRowColumn, { width: 70 }]}>{"Table No"}</Text>
        <Text style={[styles.textRowColumn, { width: 120 }]}>{"Name"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Phone"}</Text>
        <Text style={[styles.textRowColumn, { width: 60 }]}>{"Gender"}</Text>
        <Text style={[styles.textRowColumn, { width: 130 }]}>{"Order Date"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"In Time"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Out Time"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Order Amount"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Table Charge"}</Text>
        <Text style={[styles.textRowColumn, { width: 80 }]}>{"Total Price"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Payment Mode"}</Text>
      </View>
    )
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          {Object.values(FilterOptions).map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={selectedFilter === filter ? styles.filterButtonSelected : styles.filterButton}
            >
              <Text style={selectedFilter === filter ? styles.filterTextSelected : styles.filterText}>
                {filter.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          <ScrollView horizontal>
            <ScrollView>
              <TableHeader />
              {filteredData.map((data, i) => (
                <View key={i}>
                  <TableItem {...data} />
                </View>
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
      <TableFooter
        totalCustomers={totalCustomers}
        totalDays={totalDays}
        totalAmount={totalAmount}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60
  },
  textRowColumn: {
    color: "#000",
    textAlign: 'left'
  },
  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#000',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  filterButtonSelected: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#007BFF',
  },
  filterText: {
    color: '#007BFF',
  },
  filterTextSelected: {
    color: 'white',
  },
});

export default TableScreen;