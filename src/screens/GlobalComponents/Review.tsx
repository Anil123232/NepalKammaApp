import {View, Text, Image} from 'react-native';
import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons';

const Review = () => {
  return (
    <>
      {/* for one card start  */}
      <View className="flex flex-row gap-x-3">
        {/* profile  */}
        <View>
          <Image
            source={require('../../../assets/images/user-profile.jpg')}
            style={{height: 40, width: 40, borderRadius: 40}}
          />
        </View>
        {/* detials */}
        <View className="flex flex-col gap-y-1 pr-10">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            cambile123
          </Text>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.75),
            }}>
            Kathmandu
          </Text>
          <View className="flex flex-row gap-x-1">
            <IonIcons name="star" size={15} color="gray" />
            <IonIcons name="star" size={15} color="gray" />
            <IonIcons name="star" size={15} color="gray" />
            <IonIcons name="star" size={15} color="gray" />
            <IonIcons name="star" size={15} color="gray" />
            <Text className="text-black pl-2 font-bold">(4)</Text>
            <Text
              className="text-color2 pl-4"
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: responsiveFontSize(1.75),
              }}>
              2 weeks ago
            </Text>
          </View>
          <Text
            className="text-black tracking-wider leading-5"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.65),
            }}>
            This is an amazing and talented designer. He has been my designer
            since I meet him. I highly recommend him. Thank you seller.
          </Text>
        </View>
      </View>
      {/* for one card end  */}
    </>
  );
};

export default Review;
