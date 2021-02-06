import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from './screens/UserList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetail from './screens/UserDetail';

const Stack = createStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen component={UserList} name="UserList" options={{title:'Users List'}}></Stack.Screen>
      <Stack.Screen component={CreateUserScreen}name="CreateUserScreen" options={{title:'Create New User'}}></Stack.Screen>
      <Stack.Screen component={UserDetail} name="UserDetail" options={{title:'User Detail'}}></Stack.Screen>
      
      
      

    </Stack.Navigator>
  )
}


export default function App() {
  const[color, setColor]=useState('blue')
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
