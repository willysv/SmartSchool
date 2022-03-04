import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './LoginScreen.js';

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