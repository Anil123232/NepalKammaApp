import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {UserProvider} from './src/contexts/UserContext';
import AppStack from './src/navigation/AppStack';
import DrawerStack from './src/navigation/DrawerStack';
import {SocketProvider} from './src/contexts/SocketContext';
import AppProvider from './src/contexts/AppProvider';
import {requestUserPermission} from './src/utils/notificationService';
import {LogBox} from 'react-native';

function App(): JSX.Element {
  React.useEffect(() => {
    requestUserPermission();

    LogBox.ignoreLogs(['ReactImageView']);
  }, []);

  return (
    <>
      {/* <SocketProvider> */}
      {/* <UserProvider> */}
      <AppProvider>
        <NavigationContainer>
          <AppStack />
          {/* <DrawerStack /> */}
        </NavigationContainer>
        <Toast />
      </AppProvider>
      {/* </UserProvider> */}
      {/* </SocketProvider> */}
    </>
  );
}

export default App;
