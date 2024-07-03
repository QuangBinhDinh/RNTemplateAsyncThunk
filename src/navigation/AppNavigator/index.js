import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import { Home, HomeFill } from '@svg/index';
import EmptyScreen from '../../module/test/EmptyScreen';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                lazy: false,
            }}
            tabBar={props => <CustomTabBar {...props} />}
            //initialRouteName="HomeScreen"
        >
            <Tab.Screen
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => {
                        if (focused) return <HomeFill width={18} height={18} />;
                        else return <Home width={18} height={18} />;
                    },
                }}
                name="HomeScreen"
                component={EmptyScreen}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
