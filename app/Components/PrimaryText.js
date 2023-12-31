import React from 'react';
import { Text } from 'react-native';
import Color from '../../src/constants/colors';

const PrimaryText = ({
  color = Color.primaryColor,
  align = 'center',
  bold = false,
  size = 16,
  children,
}) => {
  const textStyle = {
    width: '100%',
    color: color,
    fontFamily: 'Roboto Slab',
    textAlign: align,
    fontWeight: bold ? 'bold' : 'normal',
    fontSize: size,
  };

  return <Text style={textStyle}>{children}</Text>;
};

export default PrimaryText;