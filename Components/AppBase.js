import React from 'react';
import { Platform, View, ImageBackground } from 'react-native';
import Colors from '../constants/colors';
import Assets from '../constants/assets';

const AppBaseViewStyles = {
  background: Colors.baseColor,
  flex: 1,
  padding: 10,
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: Platform.OS === 'ios' ? 0 : undefined,
};

const AppBaseImageStyles = {
  background: Colors.baseColor,
  flex: 1,
  padding: 10,
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: Platform.OS === 'ios' ? 20 : undefined,
};

const AppBase = ({ image, children, ...props }) => (
  image ? (
    <ImageBackground
      source={Assets.Images.foodBg}
      style={AppBaseImageStyles}
      {...props}
    >
      {children}
    </ImageBackground>
  ) : (
    <View style={AppBaseViewStyles} {...props}>
      {children}
    </View>
  )
);



export default AppBase;