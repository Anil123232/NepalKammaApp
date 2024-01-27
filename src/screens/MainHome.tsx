import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useGlobalStore} from '../global/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../navigation/AppStack';

interface mainHomeStoreState {
  checkAuth: () => Promise<any>;
}

interface userStateProps {
  user: any;
}

interface MainHomeScreenProps {
  navigation: StackNavigationProp<RootStackParamsList>;
}

const MainHome = ({navigation}: MainHomeScreenProps) => {
  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await (
        useGlobalStore.getState() as mainHomeStoreState
      ).checkAuth();

      // if response is true
      if (response) {
        const getUser = (useGlobalStore.getState() as userStateProps).user;
        // if user is job seeker
        getUser &&
          getUser.role === 'job_seeker' &&
          navigation.replace('Job_Seeker');
        // if user is job provider
        getUser &&
          getUser.role === 'job_provider' &&
          navigation.replace('Job_Provider');
      }
    };
    checkAuthentication();
  }, []);

  return (
    <View>
      <Text className="text-black">Loading....</Text>
    </View>
  );
};

export default MainHome;
