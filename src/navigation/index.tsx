import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { navigationRef } from './service';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import LoadingSpinner from '@components/loading/LoadingSpinner';
import BottomMessage from '@components/popup/BottomMessage';

import EmptyScreen from '../module/test/EmptyScreen';
import LoginScreen from '@auth/index';
const Stack = createSharedElementStackNavigator();

const Router = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <LoadingSpinner />
            <BottomMessage />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
