import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useGlobalStore} from '../../../global/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type userStateProps = {
  __v: number;
  _id: string;
  email: string;
  isVerified: boolean;
  role: string;
  username: string;
  profilePic: {
    url: string;
  };
};

const CustomDrawerSeeker = (props: DrawerContentComponentProps) => {
  const {navigation} = props;
  const user: userStateProps = useGlobalStore((state: any) => state.user);

  const handleLogoutFunction = async () => {
    await AsyncStorage.removeItem('currentUser');
    useGlobalStore.setState({user: null});
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'black'}}>
        <ImageBackground
          source={require('../../../../assets/images/menu_job_provider.jpg')}
          style={{padding: 20}}>
          {user && user?.profilePic.url && (
            <Image
              source={{uri: user?.profilePic.url}}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          )}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-Bold',
              marginBottom: 5,
            }}>
            {user?.username}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
                marginRight: 5,
              }}>
              Rs. 500
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={25} color="black" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 5,
              }}
              className="text-black">
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogoutFunction}
          style={{paddingVertical: 15}}
          className="bg-color2 rounded-lg">
          <View className="flex flex-row items-center justify-center">
            <Ionicons name="exit-outline" size={25} color="white" />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 5,
              }}
              className="text-white">
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerSeeker;
