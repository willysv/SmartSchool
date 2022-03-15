import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangePasswordScreen from 'smartstudent/src/components/changepass/ChangePasswordScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const ChangePasswordStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="changepassview"
                options={{
                        
                        title: 'Change Password', //Set Header Title
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
                component={ChangePasswordScreen}
            />
        </Stack.Navigator>
    );
}

export default ChangePasswordStack;