import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import RemixIcon from 'react-native-remix-icon';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import EnterPinScreen from '../screens/Auth/EnterPinScreen';
import SetupPinScreen from '../screens/Auth/SetupPinScreen';

import TableScreen from '../screens/Table/TableScreen';
import ListScreen from '../screens/Table//ListScreen';
import MenuScreen from '../screens/Menu/MenuScreen';
import OrderDetails from '../screens/Menu/CartDetails';
import BillScreen from '../screens/Table/BillScreen';

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


const CartItem = ({ onPress }) => {

  const tempSelectedMenuCount = useSelector(state => state.MenuReducer.tempSelectedMenuCount);

  const handleNavigation = () => {
    if (tempSelectedMenuCount <= 0) {
      Alert.alert(
        'Message',
        'Please Select at least one item', [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => console.log('Press Ok'), style: 'Ok' },
      ],
        { cancelable: true },
      )
      return true
    }
    onPress();
  }

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <RemixIcon name='shopping-cart-2-line' size={25} color={"#000"} />
      {tempSelectedMenuCount > 0 && (
        <View style={{
          height: 20, width: 20, position: 'absolute',
          justifyContent: "center", alignItems: "center", backgroundColor: "red", borderRadius: 20, top: -10, left: 10, padding: 2
        }}>
          <Text style={{ color: '#fff' }}>
            {tempSelectedMenuCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};


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

      <MainStack.Screen
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
  const pinNumber = useSelector((state) => state.AuthReducer.pinNumber);
  return (
    <MainStack.Navigator
      initialRouteName={pinNumber ? "EnterPinScreen" : 'SetupPinScreen'}
    >
      <MainStack.Screen
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

      <MainStack.Screen
        name="ListScreen"
        component={ListScreen}
        
        options={() => ({
          headerShown: false,
         
        })}
      />

      <MainStack.Screen
        name="TableScreen"
        component={TableScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params.name || 'Table',
          headerTitleAlign:"center",
          headerLeft: () => (
            <CustomBackButton
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <MainStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={({ navigation, route }) => ({
          headerTitle: 'Menu',
          headerTitleAlign:"center",
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.goBack()} />
          ),
          headerRight: () => (
            <CartItem onPress={() => navigation.navigate('OrderDetails')} />
          ),
        })}
      />

      <MainStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={({ navigation, route }) => ({
          headerTitle: 'Cart',
          headerTitleAlign:"center",
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.goBack()} />
          ),
        })}
      />

      <LoginStack.Screen
        name="BillScreen"
        component={BillScreen}
        options={({ navigation, route }) => ({
          headerTitle: 'Billing',
          headerTitleAlign:"center",
          headerLeft: () => (
            <CustomBackButton onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </MainStack.Navigator>
  )
}








