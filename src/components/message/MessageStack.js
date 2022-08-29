import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from 'smartstudent/src/components/message/MessageScreen';
import NavigationDrawerStructure from 'smartstudent/src/components/drawer/NavigationDrawerStructure';
const Stack = createStackNavigator();

const MessageStack = ({navigation}) => {
    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name="messageview"
                options={{
                        
                        title: 'Message', //Set Header Title
                        headerLeft: ()=>
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />,
                        headerRight: () => (
                            <TouchableHighlight onPress={()=>{navigation.navigate('DashboardStack',{screen:"dashboardscreenview"});}}>
                                <View style={{backgroundColor:"#1B4085",marginRight:10}}>
                                    <Text style={{color:"#FFF"}}>BACK</Text>
                                </View>
                            </TouchableHighlight>
                          ),
                        headerStyle: {
                        backgroundColor: '#1B4085', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        fontWeight: 'normal', //Set Header text style
                        }
                    }
                }
                component={MessageScreen}
            />
        </Stack.Navigator>
    );
}

export default MessageStack;