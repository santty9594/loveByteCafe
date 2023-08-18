import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import InOutTime from './InOutTime';
import PrimaryText from '../../../Components/PrimaryText';
import BillBreakup from './BillBreakup';
import MakePayment from './MakePayment';
import Customer from '../../Auth/Components/customerForm'

const BillForm = ({
  setOutTime, startTime, totalMinutes,
  totalPayAmount, tableCharge, totalAmount,
  getCustomerByPhone, customer

}) => {

  return (
    <View style={styles.container}>

      <InOutTime
        startTime={startTime}
        setOutTime={setOutTime}
      />

      <BillBreakup
        totalAmount={totalAmount}
        totalMinutes={totalMinutes}
        totalPayAmount={totalPayAmount}
        tableCharge={tableCharge}
      />

      <Customer
        getCustomerByPhone={getCustomerByPhone}
        customer={customer}
      />

      <MakePayment />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingVertical: 20,
    flex: 1
  },
});

export default BillForm;