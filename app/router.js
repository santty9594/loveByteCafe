import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from './screens/SignupScreen';
import TableScreen from './screens/TableScreen';
import OrderScreen from './screens/OrderScreen';
import ListScreen from './screens/ListScreen';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import PinScreen from './screens/PinScreen';
import EnterPinScreen from './screens/EnterPinScreen';


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
    <RemixIcon name='arrow-left-line' size={25} color={"#000"} />
  </TouchableOpacity>
);


const RootNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName='EnterPinScreen'
    >
      <RootStack.Screen
        name="EnterPinScreen"
        component={EnterPinScreen}
        options={() => ({
          headerShown: false
        })}
      />
      <RootStack.Screen
        name="PinScreen"
        component={PinScreen}
        options={() => ({
          headerShown: false
        })}
      />
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={() => ({
          headerShown: false
        })}
      />
      <RootStack.Screen
        name="TableScreen"
        component={TableScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params.name || 'Table',
          headerLeft: () => (
            <CustomBackButton
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <RootStack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={({ navigation, route }) => ({
          headerTitle: `Table ${route.params.name}` || 'Order',
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <RootStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params.name || 'Menus',
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.goBack()} />
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
       <RootStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={() => ({
          headerShown: false
        })}
      />
       
    </RootStack.Navigator>
  )
}


