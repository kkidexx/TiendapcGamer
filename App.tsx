import 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { RegisterScreens } from './src/screens/RegisterScreens';
import { LoginScreen } from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';

export const App = () => {
  return (
    <NavigationContainer>
    <PaperProvider>
<StackNavigator/>  
</PaperProvider>
</NavigationContainer>
  )
}


export default App;