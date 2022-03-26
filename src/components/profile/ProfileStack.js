import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from 'smartstudent/src/components/profile/ProfileScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const ProfileStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="profileview"
                options={{
                        
                        title: 'Student', //Set Header Title
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
                component={ProfileScreen}
            />
        </Stack.Navigator>
    );
}

export default ProfileStack;