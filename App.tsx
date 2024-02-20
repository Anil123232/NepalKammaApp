import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {UserProvider} from './src/contexts/UserContext';
import AppStack from './src/navigation/AppStack';
import DrawerStack from './src/navigation/DrawerStack';

function App(): JSX.Element {

  return (
    <>
      <UserProvider>
        <NavigationContainer>
          <AppStack />
          {/* <DrawerStack /> */}
        </NavigationContainer>
        <Toast />
      </UserProvider>
    </>
  );
}

export default App;
