import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './LoginScreen.js';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';

const Stack = createStackNavigator();

const SchoolStack = () => {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="LoginScren"
                
                component={LoginScreen}
            />
        </Stack.Navigator>
    )
}

export default SchoolStack;