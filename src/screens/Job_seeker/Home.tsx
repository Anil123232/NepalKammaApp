import {View, Text} from 'react-native';
import React from 'react';
import {useGlobalStore} from '../../global/store';

const Home = () => {
  const user = useGlobalStore((state: any) => state.user);
  console.log(user);

  return (
    <View>
      <Text className="text-black text-lg">I am JOb seeker</Text>
    </View>
  );
};

export default Home;
