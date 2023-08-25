import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import colors from '../../../constants/colors';

const BoxWithMargin = ({ items, selectCategory, handleClicked }) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const CARD_MARGIN = 20;
  const BOX_SIZE = (SCREEN_WIDTH - CARD_MARGIN * 4) / 3;
  const filteredItems = items.filter(item => item.tableType === selectCategory);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredItems.map((item, i) => (
        <TouchableOpacity
          style={[
            styles.box,
            {
              width: BOX_SIZE,
              height: BOX_SIZE,
              backgroundColor: item.booked ? `${colors.tableColor}` : '#fff',
            },
          ]}
          onPress={() => handleClicked(item)}
          key={i}
        >
          {item.booked ? (
            <View style={styles.alignItems}>
              <PrimaryText color='black'>{item.name}</PrimaryText>
              <PrimaryText color='black'>Booked</PrimaryText>
            </View>
          ) : (
            <View style={styles.alignItems}>
              <PrimaryText color='black'>{item.name}</PrimaryText>
              <PrimaryText color='black'>Available</PrimaryText>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 16,
  },
  alignItems: {
    justifyContent: "center", alignItems: "center"
  },
  box: {
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BoxWithMargin;