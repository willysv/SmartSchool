import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListStudentScreen from 'smartstudent/src/components/school/ListStudentScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const ListStudentStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="infogen"
                options={{
                        
                        title: 'iSKOOL Parent', //Set Header Title
                        headerLeft: ()=>
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />,
                        headerStyle: {
                        backgroundColor: '#3d00e0', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                        }
                    }
                }
                component={ListStudentScreen}
            />
        </Stack.Navigator>
    );
}

export default ListStudentStack;