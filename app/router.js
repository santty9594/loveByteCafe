import React, { useState, useEffect } from 'react';
import { TouchableOpacity,Text } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from './screens/SignupScreen';
import TableScreen from './screens/TableScreen';
import ListScreen from './screens/ListScreen';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer >
  );
}

const RootStack = createNativeStackNavigator();

const CustomBackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>Back</Text>
  </TouchableOpacity>
);


const RootNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName='ListScreen'
    >
      <RootStack.Screen
        name="TableScreen"
        component={TableScreen}
        options={({ navigation }) => ({
          headerTitle: 'Table',
          headerLeft: () => (
            <CustomBackButton
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <RootStack.Screen
        name="ListScreen"
        component={ListScreen}
        options={() => ({
          headerShown: false
        })}
      />
    </RootStack.Navigator>
  )
}


