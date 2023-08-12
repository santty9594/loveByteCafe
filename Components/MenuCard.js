import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import {Avatar, Button, Card, Text} from 'react-native-paper';

const {height, width} = Dimensions.get('screen');

export default function MenuCard({item}) {

  const { name,category} = item;
  return (
    <Card style={styles.box}>
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={1} style={{color:'#fff'}}>
          {name}
        </Text>
        <Text variant="bodyMedium" numberOfLines={1} style={{color:'#fff'}}>
          {category}
        </Text>
        <Text variant="bodySmall" style={{color:'#fff'}}>{'\u20B9'} 500</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  box: {
    margin:20,
     flex:.5,
    backgroundColor: '#000',
    borderRadius: 8,
    width:(width -20*2) /2,
    maxWidth:(width -40*2) /2,
    height:height*.2
    
  },

  
});
