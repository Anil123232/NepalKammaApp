import {View, Text, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const Cards = () => {
  return (
    <View className="p-4 shadow-2xl flex flex-col gap-y-2">
      <View className="flex flex-row gap-x-4">
        {/* image  */}
        <View>
          <Image
            source={require('../../../assets/images/user-profile.jpg')}
            style={{height: 40, width: 40, borderRadius: 40}}
          />
        </View>
        {/* text  */}
        <View className="flex flex-col gap-y-1">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            {' '}
            I will something something
          </Text>
          <Text
            className="text-black ml-1"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            Anil bhandari
          </Text>
          <View className="flex flex-row gap-x-2">
            <FontAwesome name="star" size={15} color="#E2EA3B" />
            <FontAwesome name="star" size={15} color="#E2EA3B" />
            <FontAwesome name="star" size={15} color="#E2EA3B" />
            <FontAwesome name="star" size={15} color="gray" />
            <FontAwesome name="star" size={15} color="gray" />
          </View>
        </View>
      </View>
      <View>
        <Text
          className="text-black tracking-wide"
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: responsiveFontSize(1.75),
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi
          officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde
          facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum
          quidem voluptate?
        </Text>
      </View>
      <View></View>
    </View>
  );
};

export default Cards;
