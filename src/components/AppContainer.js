import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import HomeIcon from 'react-native-vector-icons/MaterialIcons';
import AutoIcon from 'react-native-vector-icons/MaterialIcons';
import LeaderIcon from 'react-native-vector-icons/MaterialIcons';
import SettingIcon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from "./HomeScreen";
import Test from "./Test";
import HistoryScreen from "./HistoryScreen";
import Leaderboard from "./Leaderboard";
import SettingsScreen from "./SettingsScreen";

const BottomTab = createBottomTabNavigator();

const AppContainer = () => {
    const { Navigator, Screen } = BottomTab;
    return (
        <Navigator
        screenOptions={{ headerShown: false,tabBarHideOnKeyboard : true }}>
            <Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <HomeIcon name="home-filled" size={30} color="black" />
                    )
                }}
            />
            <Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <SettingIcon name="settings" size={26} color="black" />
                    )
                }}
            />
        </Navigator>
    )
}
export default AppContainer;