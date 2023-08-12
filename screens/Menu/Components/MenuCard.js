import { StyleSheet, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import PrimaryText from '../../../Components/PrimaryText';
import { Avatar, Button, Card, Text } from 'react-native-paper';
const { height, width } = Dimensions.get('screen');

export default function MenuCard({ item, onPress }) {
  const { name, price } = item;

  const boxAnimation = new Animated.Value(0); // Initial value for animation

  const handlePressIn = () => {
    Animated.timing(boxAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(boxAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onPress(); // Call the original onPress function
  };

  const boxScale = boxAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95], // Scale down a bit when pressed
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ scale: boxScale }],
          },
        ]}
      >
        <View style={styles.cardContent}>
          <PrimaryText color='black'>{name}</PrimaryText>
          <PrimaryText color='black'>₹{price}</PrimaryText>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 15,
    flex: 0.1,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: (width - 20*3)/2,
    height: height *0.14,
    overflow: 'hidden', // To prevent scaled content from overflowing
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});




