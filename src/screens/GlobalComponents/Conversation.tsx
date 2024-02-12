import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const Conversation = ({data}: any) => {
  return (
    <View className="flex flex-row gap-x-5 py-2">
      {/* image  */}
      <View>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/11.jpg'}}
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
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(2),
            }}>
            {data?.sellerName}
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
            {data?.sellerDescription}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Conversation;
