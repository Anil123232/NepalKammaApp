import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {useGlobalStore} from '../../global/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamsList } from '../../navigation/AppStack';

interface logOutProps {
  navigation: StackNavigationProp<RootStackParamsList>;
}

type userStateProps = {
  __v: number;
  _id: string;
  email: string;
  isVerified: boolean;
  role: string;
  username: string;
};

const Home = ({navigation}: logOutProps) => {
  const user: userStateProps = useGlobalStore((state: any) => state.user);
  console.log('this is ', user);

  const handleLogoutFunction = async () => {
    await AsyncStorage.removeItem('currentUser');
    useGlobalStore.setState({user: null});
    navigation.replace('Login');
  };

  return (
    <View>
      <Text className="text-black text-lg">I am JOb seeker</Text>
      <Text className="text-black text-lg">My name is {user?.username}</Text>
      <Text className="text-black text-lg">My name is {user?.email}</Text>
      <Text className="text-black text-lg">My name is {user?._id}</Text>

      <TouchableOpacity onPress={handleLogoutFunction}>
        <View className="py-4 px-8 bg-color2 w-[50%]">
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
