import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/components/LoginScreen';
import LoginForm from './src/components/LoginForm';
import HomeScreen from './src/components/HomeScreen';
import SignupForm from './src/components/SignupForm';
import FlashMessage from 'react-native-flash-message';
import QuestionsScreen from './src/components/QuestionsScreen';
import Test from './src/components/Test';
import ScoreScreen from './src/components/ScoreScreen';
const App = () => {
  const StackNav = createNativeStackNavigator();
  let {Navigator, Screen} = StackNav;

  return (
    <>
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="HomeScreen" component={HomeScreen} />
          <Screen name="QuestionsScreen" component={QuestionsScreen} />
          <Screen name="LoginScreen" component={LoginScreen} />
          <Screen name="LoginForm" component={LoginForm} />
          <Screen name="SignupForm" component={SignupForm} />
          <Screen name="ScoreScreen" component={ScoreScreen} />
        </Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
};
export default App;
