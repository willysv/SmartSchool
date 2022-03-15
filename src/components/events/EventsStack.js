import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventsScreen from 'smartstudent/src/components/events/EventsScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const EventsStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="eventslistview"
                options={{
                        
                        title: 'Events', //Set Header Title
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
                component={EventsScreen}
            />
        </Stack.Navigator>
    );
}

export default EventsStack;