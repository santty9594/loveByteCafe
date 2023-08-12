import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
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
              backgroundColor: item.booked ? '#E4CD05' : '#6495ED',
            },
          ]}
          onPress={() => handleClicked(item)}
          key={i}
        >
          <PrimaryText>{item.name}</PrimaryText>
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
  box: {
    backgroundColor: '#6495ED',
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BoxWithMargin;