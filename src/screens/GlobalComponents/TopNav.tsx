import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const TopNav = ({props, user}: any) => {
  console.log(props);
  return (
    <View
      className="flex flex-row items-center justify-between">
      {/* hamburger  */}
      <View>
        <TouchableOpacity onPress={() => props.openDrawer()}>
          <AntDesign name="menu-fold" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {/* name  */}
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
      {/* image  */}
      <View>
        <Image
          source={require('../../../assets/images/user-profile.jpg')}
          style={{height: 40, width: 40, borderRadius: 40}}
        />
      </View>
    </View>
  );
};

export default TopNav;
