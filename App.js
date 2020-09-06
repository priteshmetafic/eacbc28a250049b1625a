import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from './src/Posts';
import RawJson from './src/RawJson';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="RawJson" component={RawJson} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
