import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import InOutTime from './InOutTime';
import Customer from '../../Auth/Components/customerForm'
import colors from '../../../constants/colors';

const BillForm = ({ startTime }) => {
  return (
    <View style={styles.container}>
      <InOutTime startTime={startTime} />
      <Customer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default BillForm;