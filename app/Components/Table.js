import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from './PrimaryText';

const BoxWithMargin = () => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const CARD_MARGIN = 20;
  const BOX_SIZE = (SCREEN_WIDTH - CARD_MARGIN * 4) / 3;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[...Array(30).keys()].map((item, i) => (
        <TouchableOpacity key={i} style={[styles.box, { width: BOX_SIZE, height: BOX_SIZE }]}>
          <PrimaryText>{item + 1}</PrimaryText>
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