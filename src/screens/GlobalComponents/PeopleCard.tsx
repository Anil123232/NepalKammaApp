import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PeopleCard = ({data, navigation, route}: any) => {
  return (
    <View
      className="flex flex-row items-center justify-between"
      style={{marginTop: responsiveHeight(2)}}>
      <View className="flex flex-row items-center">
        {data && data?.profilePic?.url && (
          <Image
            source={{uri: data?.profilePic.url}}
            style={{
              width: responsiveHeight(8),
              height: responsiveHeight(8),
              borderRadius: responsiveHeight(8) / 2,
            }}
          />
        )}

        <View className="flex flex-col ml-3">
          <View className='flex flex-row gap-x-2 items-center'>
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveHeight(2),
              }}>
              {data?.username}
            </Text>
            <MaterialIcons name="verified" size={20} color={'green'} />
          </View>
          <View>
            <Text
              className="text-gray-500"
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: responsiveHeight(1.5),
              }}>
              {data?.title || 'Freelancer'}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Other_Profile', {
              id: data?._id,
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
