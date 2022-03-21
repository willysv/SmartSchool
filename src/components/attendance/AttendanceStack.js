import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AttendanceScreen from 'smartstudent/src/components/attendance/AttendanceScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const AttendanceStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="attendanceview"
                options={{
                        
                        title: 'Attendance', //Set Header Title
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
                component={AttendanceScreen}
            />
        </Stack.Navigator>
    );
}

export default AttendanceStack;