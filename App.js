import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CarouselScreen from './screens/Carousel';
import Login from './screens/Login';
import AddLocation from './screens/AddLocation';
import SignUp from './screens/SignUp';
import Account from './screens/Account';

const Stack = createStackNavigator();

/* App Navigation
Implements Navigation for all Screens
Initalizes App Data
 - account-info
 - user-beaches
 Ensures GuestID has default data
displays loading wheel */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAppData = async () => {
      try {

        const accountData = await AsyncStorage.getItem('account-info');
        const userData = accountData ? JSON.parse(accountData) : {};
        if (!Object.values(userData).some(user => user.userToken)) {
          userData.GuestID = { role: 'Guest', userToken: true };
          await AsyncStorage.setItem('account-info', JSON.stringify(userData));
        }


        const beachesData = await AsyncStorage.getItem('user-beaches');
        const beaches = beachesData ? JSON.parse(beachesData) : {};
        if (!beaches.GuestID) {
          beaches.GuestID = ['gold_coast_beach'];
          await AsyncStorage.setItem('user-beaches', JSON.stringify(beaches));
        }
      } catch (error) {
        console.error('Error initializing AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAppData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Carousel">
        <Stack.Screen name="Carousel" component={CarouselScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="AddLocation" component={AddLocation} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
