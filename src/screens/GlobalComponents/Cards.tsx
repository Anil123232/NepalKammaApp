import {View, Text, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons';

const Cards = ({data, user}: any) => {
  return (
    <View className="p-4 shadow-2xl flex flex-col gap-y-2">
      <View className="flex flex-row gap-x-4">
        {/* image  */}
        <View>
          <Image
            // source={require('../../../assets/images/user-profile.jpg')}
            source={{uri: 'https://randomuser.me/api/portraits/men/81.jpg'}}
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
            I will something something {data?.id}
          </Text>
          <Text
            className="text-black ml-1"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            Anil bhandari
          </Text>
          {user && user?.role === 'job_seeker' ? (
            <>
              <View className="flex flex-row gap-x-1 mt-2">
                <IonIcons name="location-outline" size={15} color="#79AC78" />
                <Text
                className='text-color2'
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  Salakpur
                </Text>
              </View>
            </>
          ) : (
            <View className="flex flex-row gap-x-2">
              <FontAwesome name="star" size={15} color="#E2EA3B" />
              <FontAwesome name="star" size={15} color="#E2EA3B" />
              <FontAwesome name="star" size={15} color="#E2EA3B" />
              <FontAwesome name="star" size={15} color="gray" />
              <FontAwesome name="star" size={15} color="gray" />
            </View>
          )}
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
