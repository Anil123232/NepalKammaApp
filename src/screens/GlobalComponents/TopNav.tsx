import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {DrawerStackParamsListSeeker} from '../../navigation/DrawerStackSeeker';

const TopNav = ({props, user}: any) => {
  return (
    <View className="flex flex-row items-center justify-between">
      {/* hamburger  */}
      <View>
        <TouchableOpacity onPress={() => props.openDrawer()}>
          <AntDesign name="menu-fold" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {/* name  */}
      <View className="flex flex-col items-center gap-x-1">
        <View className="flex flex-row items-center gap-x-1">
          <Text
            className="text-gray-500 flex flex-row"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(2.25),
            }}>
            Hello
          </Text>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2.5),
            }}>
            {user?.username}
          </Text>
        </View>
        <View>
          <Text
            className="text-color2"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.5),
              marginLeft: responsiveWidth(12),
            }}>
            {user?.role === 'job_seeker' ? 'Freelancer' : 'Job Provider'}
          </Text>
        </View>
      </View>
      {/* image  */}
      <TouchableOpacity onPress={() => props.navigate('My_Profile')}>
        <View>
          {user?.profilePic.url && (
            <Image
              source={{uri: user?.profilePic.url}}
              style={{height: 40, width: 40, borderRadius: 40}}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TopNav;
