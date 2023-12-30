import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useGlobalStore} from '../global/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainHome = () => {
  const user = useGlobalStore((state: any) => state.user);
  const checkAuth = useGlobalStore((state: any) => state.checkAuth);

  useEffect(() => {
    const token = AsyncStorage.getItem('currentUser');
    console.log(token);

    checkAuth().then((res: any) => {
      console.log(res);
    });
  }, [checkAuth]);

  return (
    <View>
      <Text>MainHome</Text>
    </View>
  );
};

export default MainHome;
