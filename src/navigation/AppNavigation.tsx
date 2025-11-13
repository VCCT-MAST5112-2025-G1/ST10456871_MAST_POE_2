import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import FilterScreen from '../screens/FilterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import { Ionicons } from '@expo/vector-icons';
import { MenuProvider } from '../context/MenuContext';

export type RootTabParamList = {
    Home: undefined;
    Add: undefined;
    Filter: undefined;
};

//this function is responsible for creating te bottom tabs that the usr will navigate throughout the app
const Tab = createBottomTabNavigator<RootTabParamList>();

const screenOptions: (props: { route: any }) => BottomTabNavigationOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert-circle';

        if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        }
         else if (route.name === 'AddMenuItem') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        else if (route.name === 'FilterScreen') {
            iconName = focused ? 'filter' : 'filter-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },

    /*(React native. 2025)*/

    tabBarActiveTintColor: '#ffffff',
    tabBarInactiveTintColor: '#d4d4d4',
    tabBarStyle: {
        backgroundColor: '#a27c00',  
        height: 60,
        borderTopWidth: 0,
    },
    tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerShown: false, 
    
});

//this is the main component and is wrapped in MenuProvider to ensure all data is transfered between screens

export default function AppNavigator() {

    return (
        <MenuProvider>
        <Tab.Navigator screenOptions={screenOptions} id={undefined}>
            <Tab.Screen name='Filter' component={FilterScreen} />
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Add' component={AddScreen} />
        </Tab.Navigator>
        </MenuProvider>
    );
}