import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SchoolViewScreen from 'smartstudent/src/components/schoolview/SchoolViewScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const SchoolViewStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="schoolview"
                options={{
                        
                        title: 'School', //Set Header Title
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
                component={SchoolViewScreen}
            />
        </Stack.Navigator>
    );
}

export default SchoolViewStack;