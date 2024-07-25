import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
const App = () => {
  const navigationRef = useRef(null);
  const [isLoggenIn, setIsLoggenIn] = useState({});
  let { Navigator, Screen } = StackNav;
  //getData
  const getData = async () => {
    const user_email = await AsyncStorage.getItem('userLogin_token');
    const token = await AsyncStorage.getItem('isLoggenIn');
    // console.log(user_email);
    // console.log(token);
    setIsLoggenIn({user_email:JSON.parse(user_email), token:JSON.parse(token)});
  }

  //LoginNav
  const LoginNav = () => {
    console.log(isLoggenIn);
    // if(isLoggenIn.token == 'true'){
    //   navigationRef.current?.navigate('HomeScreen');
    // }else{
    //   navigationRef.current?.navigate('LoginForm');
    // }
  }


  useEffect(() => {
    getData();
  }, [])


  return (
    <>
    {LoginNav()}
    {
      isLoggenIn.token == true
      ?
      <NavigationContainer >
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="HomeScreen" component={HomeScreen} />
          <Screen name="QuestionsScreen" component={QuestionsScreen} />
          <Screen name="LoginScreen" component={LoginScreen} />
          <Screen name="ScoreScreen" component={ScoreScreen} />
        </Navigator>
      </NavigationContainer>
      :
      <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="LoginForm" component={LoginForm} />
          <Screen name="SignupForm" component={SignupForm} />
          <Screen name="OTPScreen" component={OTPScreen} />
          <Screen name="HomeScreen" component={HomeScreen} />
        </Navigator>
      </NavigationContainer>
    }
      <FlashMessage position="top" />
    </>
  );
};
export default App;
