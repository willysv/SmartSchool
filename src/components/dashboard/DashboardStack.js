import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from 'smartstudent/src/components/dashboard/DashboardScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const DashboardStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="infogen"
                options={{
                        
                        title: 'Dashboard', //Set Header Title
                        headerLeft: ()=>
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />,
                        headerStyle: {
                        backgroundColor: '#1B4085', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        fontWeight: 'normal', //Set Header text style
                        }
                    }
                }
                component={DashboardScreen}
            />
        </Stack.Navigator>
    );
}

export default DashboardStack;