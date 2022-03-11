import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SchoolStack from 'smartstudent/src/components/school/SchoolStack'
import ListStudentStack from 'smartstudent/src/components/school/ListStudentStack'
import DashboardStack from 'smartstudent/src/components/dashboard/DashboardStack'
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
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

export default App;
