import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import InOutTime from './InOutTime';
import BillBreakup from './BillBreakup';
import MakePayment from './MakePayment';
import Customer from '../../Auth/Components/customerForm'

const BillForm = ({
  setOutTime, startTime, totalMinutes, paymentMode,
  setPaymentMode, selectTableCategory, totalPayAmount,
  tableCharge, totalAmount, getCustomerByPhone, customer,
  handleMakePayment
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Customer
          getCustomerByPhone={getCustomerByPhone}
          customer={customer}
        />
        <InOutTime
          selectTableCategory={selectTableCategory}
          paymentMode={paymentMode}
          startTime={startTime}
          setOutTime={setOutTime}
          setPaymentMode={setPaymentMode}
        />
        <BillBreakup
          selectTableCategory={selectTableCategory}
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
  },
  button: {
    paddingVertical: 10,
    flex: 1
  },
});

export default BillForm;