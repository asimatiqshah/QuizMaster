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


const StackNav = createNativeStackNavigator();

// const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const DrawerMenu = createDrawerNavigator();
  let { Navigator, Screen } = DrawerMenu;
  return (
    <Navigator>
      <Screen name="HomeScreen" component={HomeScreen} />
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
      console.log(token);
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
    <NavigationContainer>
      {
        isLoggenIn
          ?
          <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="HomeScreen" component={HomeScreen} />
            <Screen name="LoginForm" component={LoginForm} />
            <Screen name="SignupForm" component={SignupForm} />
            <Screen name="OTPScreen" component={OTPScreen} />
            <Screen name="QuestionsScreen" component={QuestionsScreen} />
            <Screen name="LoginScreen" component={LoginScreen} />
            <Screen name="ScoreScreen" component={ScoreScreen} />
          </Navigator>
          :
          <DrawerNav />
      }
    </NavigationContainer>
  )

};
export default App;
