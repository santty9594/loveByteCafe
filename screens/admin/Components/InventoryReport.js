import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
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
    const itemDate = moment(item.created_date);
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

const TableItem = ({ name, created_date, price }) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>{name}</Text>
    <Text style={styles.tableCell}>{moment(created_date).format('MMM DD YYYY h:mm')}</Text>
    <Text style={styles.tableCell}> ₹ {price}</Text>
  </View>
);

const TableFooter = ({ totalCustomers, totalDays, totalAmount }) => (
  <View style={styles.tableFooter}>
    <Text>Distinct Item: {totalCustomers}</Text>
    <Text>Distinct Days: {totalDays}</Text>
    <Text>Total: ₹{totalAmount}</Text>
  </View>
);

const TableScreen = ({ data }) => {
  const [selectedFilter, setSelectedFilter] = useState(FilterOptions.ALL);
  const filteredData = filterData(data, selectedFilter);

  const totalCustomers = Array.from(new Set(filteredData.map((item) => item.name))).length;
  const totalDays = Array.from(new Set(filteredData.map((item) => moment(item.created_date).format('MMM DD YYYY')))).length;
  const totalAmount = filteredData.reduce((sum, item) => sum + item.price, 0);

  return (
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
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TableItem {...item} />}
        ListFooterComponent={() => <View style={{ height: 80 }} />}
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