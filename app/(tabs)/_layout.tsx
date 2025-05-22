import HomeScreen from "@/app/(tabs)/home";
import ProfileScreen from "@/app/(tabs)/profile";
import SearchScreen from "@/app/(tabs)/search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
    return(
       <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    margin: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 50,
                    height: 40
                },
                tabBarActiveTintColor: 'white',
                tabBarActiveBackgroundColor: 'rgba(128, 0, 128, 0.7)',
                tabBarInactiveTintColor: 'black',
                tabBarShowLabel: false,
            }}
        >
                <Tab.Screen name="home" component={HomeScreen} options={{
                    title: 'Home',
                    tabBarIcon: (focused) => (
                        <View className="center">
                            <Image
                                source={require("../../assets/images/react-logo.png")}
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }} />
                        </View>
                    ),
                }} />
                <Tab.Screen name="search" component={SearchScreen} options={{
                    title: 'Search',
                    tabBarIcon: (focused) => (
                        <View className="center">
                            <Image
                                source={require("../../assets/images/react-logo.png")}
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }} />
                        </View>
                    ),
                }} />
                <Tab.Screen name="profile" component={ProfileScreen} options={{
                    title: 'Profile',
                    tabBarIcon: (focused) => (
                        <View className="center">
                            <Image
                                source={require("../../assets/images/react-logo.png")}
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? '#e32f45' : '#748c94',
                                }} />
                        </View>
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default Tabs;