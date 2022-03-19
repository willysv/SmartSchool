import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeworkScreen from 'smartstudent/src/components/homework/HomeworkScreen';
import HomeworkDetailScreen from 'smartstudent/src/components/homework/HomeworkDetailScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const HomeworkStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="homeworklistview"
                options={{
                        
                        title: 'Homework', //Set Header Title
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
                component={HomeworkScreen}
            />
            <Stack.Screen
                name="homeworkdetailview"
                options={{
                        
                        title: 'Homework', //Set Header Title
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
                component={HomeworkDetailScreen}
            />
        </Stack.Navigator>
    );
}

export default HomeworkStack;