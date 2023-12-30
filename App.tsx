import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  OnboardingScreen,
  Login,
  Signup,
  OtpScreen,
  Home,
  JobSeeker,
  JobProvider,
} from './src/screens';
import {getItem} from './src/utils/asyncStorage';
import {Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {UserProvider} from './src/contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamsList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: {id: string; email: string; timer: string};
  Job_Seeker: undefined;
  Job_Provider: undefined;
};

const stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isOnboarding, setIsOnboarding] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    checkIfHomePage();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const storedCurrentUser = await AsyncStorage.getItem('currentUser');
      setCurrentUser(storedCurrentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const checkIfHomePage: any = async () => {
    let onboarding = await getItem('onboarding');

    if (onboarding == '1') {
      setIsOnboarding(false);
    } else {
      setIsOnboarding(true);
    }
    // can remove it
    // setLoading(false);
  };

  if (isOnboarding === null) {
    return <Text>Loading.....</Text>;
  }

  if (loading) {
    return <Text>Loading.....</Text>;
  }

  return (
    <>
      <UserProvider>
        <NavigationContainer>
          <stack.Navigator
            initialRouteName={
              isOnboarding ? 'Onboarding' : currentUser ? 'Home' : 'Login'
            }>
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
            <stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="Job_Seeker"
              component={JobSeeker}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="Job_Provider"
              component={JobProvider}
              options={{headerShown: false}}
            />
          </stack.Navigator>
        </NavigationContainer>
        <Toast />
      </UserProvider>
    </>
  );
}

export default App;
