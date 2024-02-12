import {View, Text, TouchableOpacity, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import Review from '../GlobalComponents/Review';

const userData = [
  {
    img: 'https://randomuser.me/api/portraits/men/81.jpg',
    name: 'Maurice Davis',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/20.jpg',
    name: 'Bernice Alvarez',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/19.jpg',
    name: 'Jennie Barnett',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/55.jpg',
    name: 'Matthew Wagner',
  },
  {
    img: 'https://randomuser.me/api/portraits/men/71.jpg',
    name: 'Christian Wilson',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/21.jpg',
    name: 'Sophia Fernandez',
  },
  {
    img: 'https://randomuser.me/api/portraits/women/42.jpg',
    name: 'Sylvia Lynch',
  },
];

const BottomSheetCard = ({bottomSheetModalRef, data}: any) => {
  // Convert the single data into an array
  const dataArray = data ? [data] : [];

  const renderItem = ({item}: any) => (
    <View>
      {/* main body starts  */}
      <View className="flex flex-col gap-y-5 p-8">
        {/* title  */}
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            I will do like this of the {data?.what} {data?.id}
          </Text>
        </View>
        {/* uploader images profiel */}
        <View className="flex flex-row gap-x-2">
          {/* profile pic  */}
          <View>
            <Image
              source={require('../../../assets/images/user-profile.jpg')}
              style={{height: 40, width: 40, borderRadius: 40}}
            />
          </View>
          {/* name  */}
          <View className="flex flex-col gap-y-1">
            <Text
              className="text-black"
              style={{fontFamily: 'Montserrat-Bold'}}>
              {' '}
              Anil Bhandari
            </Text>
            <View className="flex flex-row gap-x-1">
              <FontAwesome name="star" size={15} color="gray" />
              <Text
                className="text-black"
                style={{fontFamily: 'Montserrat-Bold'}}>
                {' '}
                5.0
              </Text>
            </View>
          </View>
        </View>
        {/* photo/banner */}
        <View style={{width: responsiveWidth(85), height: 200}}>
          <Swiper showsButtons={true}>
            {userData.map((user: any) => (
              <View
                style={{alignItems: 'center', backgroundColor: '#fff'}}
                key={user.img}>
                <Image
                  style={{width: responsiveWidth(85), height: 200}}
                  // source={require('../../../assets/images/user-profile.jpg')}
                  source={{uri: user.img}}
                />
                <Text className="text-black">Anil bhandari</Text>
              </View>
            ))}
          </Swiper>
        </View>
        {/* about the gig  */}
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            About this gig
          </Text>
          <Text
            className="text-black tracking-wider leading-5"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.75),
            }}>
            Good Day Warm Welcome to my gig "Thank You" is a simple word but The
            effectiveness is immense. I will provide amazing Thank You card
            design for You. This card will help your business to grow! MY
            EXCLUSIVE SERVICES... A attractive design. High Quality & Sharp 100%
            Satisfied 100% money back guarantee Editable source file YOU WILL
            GET.... Single side/Double Sided/ Bi-fold design Depended on price
            *Source file/ Pdf file Ready to print HQ JPG HQ PNG Feel Free to
            Contact with me if you have any Questions. Regards... Mahfuj ahmed
            Good Day Warm Welcome to my gig "Thank You" is a simple word but The
            effectiveness is immense.
          </Text>
        </View>
        {/* charging  */}
        <View className="flex flex-col gap-y-2">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            Pricing
          </Text>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.75),
            }}>
            I will start from Rs.500
          </Text>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            For more Details
          </Text>
          <View className="flex flex-row pt-2 items-center justify-between">
            <TouchableOpacity>
              <Text
                className="text-white py-2 px-5 bg-color2 rounded-md"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveFontSize(1.75),
                }}>
                Contact Me
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                className="text-white py-2 px-5 bg-color2 rounded-md"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveFontSize(1.75),
                }}>
                Get My Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* REview */}
        <View className="flex flex-col">
          <Text
            className="text-black mb-3"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            Reviews
          </Text>
          {/* make a line */}
          <View
            className="mb-3"
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}
          />
          <View className="flex flex-col gap-y-4">
            {/* for one card start  */}
            <View>
              <Review />
            </View>
            {/* for one card end  */}
            {/* make a line */}
            <View
              className="mb-3"
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />
            {/* for one card start  */}
            <Review />
            {/* for one card end  */}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View className="w-[100%] flex flex-row justify-between px-8 pb-4">
        <View className="flex flex-row items-center justify-center gap-x-2">
          <IonIcons
            name="home-outline"
            size={20}
            color="#79AC78"
            className="p-5"
          />
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color="gray"
            className="p-5"
          />
          <Text
            className="text-gray-500"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.75),
            }}>
            category
          </Text>
        </View>

        <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()}>
          <AntDesign name="closecircle" size={20} color="red" className="p-5" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataArray}
        // keyExtractor={(item) => item.id.toString()} // or item.whatever depending on your data structure
        // keyExtractor={item => item.id.toString()}
        // initialNumToRender={1}
        // data={""}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(10),
        }}></FlatList>
    </>
  );
};

export default BottomSheetCard;
