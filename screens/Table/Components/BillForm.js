import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard ,Dimensions, ScrollView} from 'react-native';
import InOutTime from './InOutTime';
import BillBreakup from './BillBreakup';
import MakePayment from './MakePayment';
import Customer from '../../Auth/Components/customerForm'


const {height ,width}=    Dimensions.get('window')

const BillForm = ({
  setOutTime, startTime, totalMinutes,
  totalPayAmount, tableCharge, totalAmount,
  getCustomerByPhone, customer, handleMakePayment
}) => {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
        <Customer
          getCustomerByPhone={getCustomerByPhone}
          customer={customer}
        />
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
        <MakePayment
          handleMakePayment={handleMakePayment}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
      // backgroundColor:'#fff',
    
  },
  button: {
   paddingVertical: 20,
     flex: 1
  },
});

export default BillForm;