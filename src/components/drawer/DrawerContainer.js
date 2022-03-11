import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//import SchoolStack from 'smartstudent/src/components/school/SchoolStack'
import ListStudentStack from 'smartstudent/src/components/school/ListStudentStack'
//import TestScreen from 'smartstudent/src/components/school/Test';
import { DrawerContent } from 'smartstudent/src/components/drawer/DrawerCustom';
const Drawer = createDrawerNavigator();
const DrawerCountainer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
        drawerStyle={{
          width: "85%"
        }}
      >
          {/*
        <Drawer.Screen
            name="LoginStack" component={SchoolStack}
        />
        */ }
        <Drawer.Screen
            name="ListStudenStack" component={ListStudentStack}
        />  
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

export default DrawerCountainer;