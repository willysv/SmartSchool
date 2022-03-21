import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SchoolStack from 'smartstudent/src/components/school/SchoolStack';
import ListStudentStack from 'smartstudent/src/components/school/ListStudentStack';
import DashboardStack from 'smartstudent/src/components/dashboard/DashboardStack';
import SchoolViewStack from 'smartstudent/src/components/schoolview/SchoolViewStack';
import EventsStack from 'smartstudent/src/components/events/EventsStack';
import HomeworkStack from 'smartstudent/src/components/homework/HomeworkStack';
import AttendanceStack from 'smartstudent/src/components/attendance/AttendanceStack';
import ChangePasswordStack from 'smartstudent/src/components/changepass/ChangePasswordStack';
//import TestScreen from 'smartstudent/src/components/school/Test';
import { DrawerContent } from 'smartstudent/src/components/drawer/DrawerCustom';
const Drawer = createDrawerNavigator();
const App = () => {
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
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

export default App;
