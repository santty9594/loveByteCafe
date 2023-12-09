import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, ScrollView } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';
import colors from '../../../constants/colors';

const BoxWithMargin = ({ items, selectCategory, handleClicked, handleResetTable }) => {
  let width = Dimensions.get('window').width;
  const BOX_SIZE = width > 400 ? 200 : 100;
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
              <PrimaryText color='white'>{item.name}</PrimaryText>
              <PrimaryText color='white'>Booked</PrimaryText>
              <TouchableOpacity style={styles.button} onPress={() => handleResetTable(item)}>
                <PrimaryText color='#8b0000'>Reset</PrimaryText>
              </TouchableOpacity>
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
    alignItems:"flex-start",
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
  },
  alignItems: {
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    margin:16,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "pink",
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 8
  },

});

export default BoxWithMargin;