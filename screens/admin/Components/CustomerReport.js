import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import { BottomModalComponent } from '../../../Components/BottomModal';
import { NoDataFound } from '../../../Components/NoDataFound';
import DateRangePicker from '../../../Components/DateRangePicker';

const dateFilterList = [
  { key: 1, name: "Today", value: "today" },
  { key: 2, name: "Yesterday", value: "yesterday" },
  { key: 3, name: "Last30Days", value: "last30days" },
  { key: 4, name: "Date Range", value: "daterange" },
  { key: 5, name: "All", value: "all" },
]

const TableItem = ({
  customer_name, customer_phone, customer_gender, table_no,
  order_date, total_price, order_in_time, order_out_time, order_amount,
  table_type, table_charge, payment_mode }) => (
  <View style={styles.tableRow}>
    <Text style={{ textAlign: "left", width: 70 }}>{table_no}</Text>
    <Text style={{ textAlign: "left", width: 120 }}>{customer_name}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{customer_phone}</Text>
    <Text style={{ textAlign: "left", width: 60 }}>{customer_gender}</Text>
    <Text style={{ textAlign: "left", width: 130 }}>{moment(order_date).format('MMM DD YYYY h:mm')}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{table_type}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{order_in_time}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{order_out_time}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{order_amount && `₹ ${order_amount}`}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{table_charge && `₹ ${table_charge}`}</Text>
    <Text style={{ textAlign: "left", width: 80 }}>{total_price && `₹ ${total_price}`}</Text>
    <Text style={{ textAlign: "left", width: 100 }}>{payment_mode}</Text>
  </View>
);

const TableFooter = ({ totalCustomers, totalDays, totalAmount }) => (
  <View style={styles.tableFooter}>
    <Text>Customer: {totalCustomers}</Text>
    <Text>Days: {totalDays}</Text>
    <Text>Total: ₹{totalAmount}</Text>
  </View>
);

const TableScreen = ({ data, fetchDataByDate }) => {
  const [isModal, setModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [selectedFilter, setSelectedFilter] = useState(dateFilterList[0].value);
  const filteredData = data;

  const totalCustomers = Array.from(new Set(filteredData.map((item) => item.customer_name))).length;
  const totalDays = Array.from(new Set(filteredData.map((item) => moment(item.order_date).format('MMM DD YYYY')))).length;
  const totalAmount = filteredData.reduce((sum, item) => sum + item.total_price, 0);

  const handleDateFilterChange = (value) => {
    setSelectedFilter(value);
    setModal(false);
    let data = { filter: value, fromDate, toDate }
    fetchDataByDate(data)
  }
  const handleFromDate = (date) => {
    setFromDate(date)
    let data = { filter: selectedFilter, fromDate: date, toDate }
    fetchDataByDate(data)
  }

  const handleToDate = (date) => {
    setToDate(date)
    let data = { filter: selectedFilter, fromDate, toDate:date }
    fetchDataByDate(data)
  }

  const FilterList = ({ key, name, value }) => {
    return (
      <TouchableOpacity
        key={key}
        onPress={() => handleDateFilterChange(value)}
        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 10, }}>
        <Text style={selectedFilter === value
          ? [styles.filterText, { color: "#000" }]
          : styles.filterText
        }>
          {name}
        </Text>
      </TouchableOpacity>
    )
  }

  const DateFilter = () => {
    return (
      <BottomModalComponent
        isModal={isModal}
        height={0.3}
        handleCloseModal={() => setModal(false)}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={dateFilterList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <FilterList {...item} />}
          />
        </View>
      </BottomModalComponent >
    )
  }

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
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Table Type"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"In Time"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Out Time"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Order Amount"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Table Charge"}</Text>
        <Text style={[styles.textRowColumn, { width: 80 }]}>{"Total Price"}</Text>
        <Text style={[styles.textRowColumn, { width: 100 }]}>{"Payment Mode"}</Text>
      </View>
    )
  };


  const renderNoData = () => {
    if (data && data.length === 0) {
      return <NoDataFound />
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          {selectedFilter == 'daterange' ? (
            <DateRangePicker
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={(date) => handleFromDate(date)}
              setToDate={(date) => handleToDate(date)}
             
            />) : (<Text >{`Filter Display : ${selectedFilter?.toUpperCase()} `}</Text>)}
          <TouchableOpacity onPress={() => setModal(true)}>
            <Text style={{ color: "blue" }}>FILTER</Text>
          </TouchableOpacity>
        </View>
        {renderNoData()}
        <View style={{
          flex: 0.84,
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
      </View >
      <TableFooter
        totalCustomers={totalCustomers}
        totalDays={totalDays}
        totalAmount={totalAmount}
      />
      {DateFilter()}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 6
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },

  filterText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#555459",
    lineHeight: 19,
  }

});

export default TableScreen;