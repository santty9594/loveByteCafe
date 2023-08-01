import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import RemixIcon from 'react-native-remix-icon';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import EnterPinScreen from '../screens/Auth/EnterPinScreen';
import SetupPinScreen from '../screens/Auth/SetupPinScreen';

import TableScreen from '../screens/Table/TableScreen';
import OrderScreen from '../screens/Table/OrderScreen';
import ListScreen from '../screens/Table//ListScreen';
import MenuScreen from '../screens/Menu/MenuScreen';


export default function App() {
  const userToken = useSelector((state) => state.AuthReducer.loginToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = Boolean(userToken);
    setIsLoggedIn(userLoggedIn);
  }, [userToken]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigation /> : <LoginNavigation />}
    </NavigationContainer>
  );
}

const CustomBackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <RemixIcon name='arrow-left-line' size={25} color={"#000"} />
  </TouchableOpacity>
);

const LoginStack = createNativeStackNavigator();
const LoginNavigation = () => {
  return (
    <LoginStack.Navigator
      initialRouteName='LoginScreen'
    >
      <LoginStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={() => ({
          headerShown: false
        })}
      />

      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={() => ({
          headerShown: false
        })}
      />

      <LoginStack.Screen
        name="EnterPinScreen"
        component={EnterPinScreen}
        options={() => ({
          headerShown: false
        })}
      />

      <LoginStack.Screen
        name="SetupPinScreen"
        component={SetupPinScreen}
        options={() => ({
          headerShown: false
        })}
      />
    </LoginStack.Navigator>
  )
}


const MainStack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <MainStack.Navigator
      initialRouteName='EnterPinScreen'
    >
      <MainStack.Screen
        name="EnterPinScreen"
        component={EnterPinScreen}
        options={() => ({
          headerShown: false
        })}
      />

      <MainStack.Screen
        name="ListScreen"
        component={ListScreen}
        options={() => ({
          headerShown: false
        })}
      />

      <MainStack.Screen
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

      <MainStack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={({ navigation, route }) => ({
          headerTitle: `Table ${route.params.name}` || 'Order',
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <MainStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params.name || 'Menus',
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </MainStack.Navigator>
  )
}








