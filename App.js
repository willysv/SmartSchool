import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SchoolStack from 'smartstudent/src/components/school/SchoolStack'
const App = () => {
  return (
    <NavigationContainer>
      <SchoolStack/>
    </NavigationContainer>
  )
};

export default App;
