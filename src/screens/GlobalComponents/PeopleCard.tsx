import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const PeopleCard = ({data, navigation, route}: any) => {
  return (
    <View
      className="flex flex-row items-center justify-between"
      style={{marginTop: responsiveHeight(2)}}>
      <View className="flex flex-row items-center">
        <View className="w-[50px] h-[50px] rounded-full bg-gray-300"></View>
        <View className="flex flex-col ml-3">
          <View>
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveHeight(2),
              }}>
              {data?.sellerName}
            </Text>
          </View>
          <View>
            <Text
              className="text-gray-500"
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: responsiveHeight(1.5),
              }}>
              {data?.sellerDescription}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Other_Profile', {
              id: data?.id,
            });
          }}>
          <Text
            className="text-color2"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveHeight(2),
            }}>
            View
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PeopleCard;
