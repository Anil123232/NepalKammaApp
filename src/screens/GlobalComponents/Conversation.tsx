import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const Conversation = ({data}: any) => {
  return (
    <View className="flex pl-5 flex-row gap-x-5 py-2 rounded-md border-b-[1.5px] border-[#e5e8e9]">
      {/* image  */}
      <View>
        <Image
          source={{uri: data?.conversation[0]?.profilePic.url}}
          style={{
            width: responsiveHeight(8),
            height: responsiveHeight(8),
            borderRadius: responsiveHeight(8) / 2,
          }}
        />
      </View>
      {/* other things */}
      <View className="flex flex-col justify-center gap-y-1">
        {/* name  */}
        <View className="flex flex-row gap-x-20">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(2),
            }}>
            {data?.conversation[0]?.username}
          </Text>
          <Text
            className="text-color2"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            Online
          </Text>
        </View>
        {/* message  */}
        <View>
          <Text
            className="text-black "
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            {data?.conversation[0]?.title
              ? data?.conversation[0]?.title
              : 'Job Provider'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Conversation;
