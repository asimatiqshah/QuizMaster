import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/components/LoginScreen";
import LoginForm from "./src/components/LoginForm";
import HomeScreen from "./src/components/HomeScreen"

const App=()=>{

  const StackNav = createNativeStackNavigator();
  let {Navigator,Screen} = StackNav;

  return(
    <NavigationContainer>
      <Navigator screenOptions={{headerShown:false}}>
        <Screen name="LoginScreen" component={LoginScreen} />
        <Screen name="LoginForm" component={LoginForm} />
        <Screen name="HomeScreen" component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
  )
}
export default App;