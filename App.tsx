import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingScreen} from './src/screens';
import {getItem} from './src/utils/asyncStorage';
import {Text} from 'react-native';
import Login from './src/screens/LoginSignup/Login';
import Signup from './src/screens/LoginSignup/Signup';
import Toast from 'react-native-toast-message';
import OtpScreen from './src/screens/LoginSignup/OtpScreen';

export type RootStackParamsList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: {id: string; email: string; timer: string};
};

const stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isOnboarding, setIsOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    checkIfHomePage();
  }, []);

  const checkIfHomePage: any = async () => {
    let onboarding = await getItem('onboarding');
    console.log(onboarding);

    if (onboarding == '1') {
      setIsOnboarding(false);
    } else {
      setIsOnboarding(true);
    }
  };

  if (isOnboarding === null) {
    return <Text>Loading.....</Text>;
  }

  return (
    <>
      <NavigationContainer>
        <stack.Navigator
          initialRouteName={isOnboarding ? 'Onboarding' : 'Login'}>
          <stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="OTP"
            component={OtpScreen}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
