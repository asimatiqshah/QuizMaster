import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/components/LoginScreen';
import LoginForm from './src/components/LoginForm';
import HomeScreen from './src/components/HomeScreen';
import SignupForm from './src/components/SignupForm';
import FlashMessage from 'react-native-flash-message';
import QuestionsScreen from './src/components/QuestionsScreen';
import Test from './src/components/Test';
import ScoreScreen from './src/components/ScoreScreen';
import OTPScreen from './src/components/OTPScreen';
import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import AppContainer from './src/components/AppContainer';

const StackNav = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNav = () => {

  let { Navigator, Screen } = Drawer;
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AppContainer" component={AppContainer} />
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="QuestionsScreen" component={QuestionsScreen} />
      <Screen name="ScoreScreen" component={ScoreScreen} />
      <Screen name="LoginForm" component={LoginForm} />
      <Screen name="SignupForm" component={SignupForm} />
      <Screen name="OTPScreen" component={OTPScreen} />
    </Navigator>
  )
}

const App = () => {
  const [isLoggenIn, setIsLoggenIn] = useState(false);
  let { Navigator, Screen } = StackNav;
  //getData
  const getData = async () => {
    try {
      // const user_email = await AsyncStorage.getItem('userLogin_token');
      const token = await AsyncStorage.getItem('isLoggenIn');
      if (token) {
        // setIsLoggenIn({ user_email: JSON.parse(user_email), token: JSON.parse(token), navScreen: 'HomeScreen' });
        setIsLoggenIn(token);
      }
    } catch (error) {
      console.log(error, 'ERROR');
    }
  }
  useEffect(() => {
    getData();
    console.log(isLoggenIn);
    // console.log(ref);
  }, []);
  return (


    <>
      <NavigationContainer>
        {
          isLoggenIn
            ?
            <DrawerNav />
            :
            <Navigator screenOptions={{ headerShown: false }}>
              <Screen name="LoginForm" component={LoginForm} />
              <Screen name="HomeScreen" component={HomeScreen} />
              <Screen name="SignupForm" component={SignupForm} />
              <Screen name="OTPScreen" component={OTPScreen} />
              <Screen name="ScoreScreen" component={ScoreScreen} />
              <Screen name="QuestionsScreen" component={QuestionsScreen} />
              <Screen name="AppContainer" component={AppContainer} />
            </Navigator>
        }
      </NavigationContainer>
      <FlashMessage position="top" />
    </>


  )

};
export default App;
