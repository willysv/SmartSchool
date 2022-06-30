import React, {useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SchoolStack from 'smartstudent/src/components/school/SchoolStack';
import ListStudentStack from 'smartstudent/src/components/school/ListStudentStack';
import DashboardStack from 'smartstudent/src/components/dashboard/DashboardStack';
import SchoolViewStack from 'smartstudent/src/components/schoolview/SchoolViewStack';
import EventsStack from 'smartstudent/src/components/events/EventsStack';
import HomeworkStack from 'smartstudent/src/components/homework/HomeworkStack';
import AttendanceStack from 'smartstudent/src/components/attendance/AttendanceStack';
import TimeTableStack from 'smartstudent/src/components/timetable/TimeTableStack';
import HolidaysStack from 'smartstudent/src/components/holidays/HolidaysStack';
import ProfileStack from 'smartstudent/src/components/profile/ProfileStack';
import ChangePasswordStack from 'smartstudent/src/components/changepass/ChangePasswordStack';
//import TestScreen from 'smartstudent/src/components/school/Test';
import { DrawerContent } from 'smartstudent/src/components/drawer/DrawerCustom';
import { Alert } from 'react-native';
/*import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  //console.log('Message handled in the background!', remoteMessage);
  Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
});*/
const Drawer = createDrawerNavigator();
const App = () => {
  /*useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
      //console.log(JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);*/

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
        drawerStyle={{
          width: "85%"
        }}
      >
        <Drawer.Screen
            options={{headerShown:false}}
            name="LoginStack" component={SchoolStack}
        />

        <Drawer.Screen
            options={{headerShown:false}}
            name="ListStudenStack" component={ListStudentStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="DashboardStack" component={DashboardStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="SchoolViewStack" component={SchoolViewStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="ChangePasswordStack" component={ChangePasswordStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="EventsStack" component={EventsStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="HomeworkStack" component={HomeworkStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="AttendanceStack" component={AttendanceStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="ProfileStack" component={ProfileStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="TimeTableStack" component={TimeTableStack}
        />
        <Drawer.Screen
            options={{headerShown:false}}
            name="HolidaysStack" component={HolidaysStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

export default App;
