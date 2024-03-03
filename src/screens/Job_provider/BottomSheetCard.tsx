import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
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
import RenderHTML from 'react-native-render-html';
import {systemFonts} from '../GlobalComponents/Cards';


const BottomSheetCard = ({bottomSheetModalRef, data, navigation}: any) => {
  // Convert the single data into an array
  const dataArray = data ? [data] : [];
  console.log(data);

  const {width} = useWindowDimensions();

  const generateHtmlPreview = () => {
    let html = `<p style="color: black;">${data?.gig_description}</p>`;
    html = html.replace(/\n/g, '<br/>');
    return html;
  };

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
            I will do {data?.title}
          </Text>
        </View>
        {/* uploader images profiel */}
        <View className="flex flex-row gap-x-2">
          {/* profile pic  */}
          <View>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/women/22.jpg'}}
              style={{height: 40, width: 40, borderRadius: 40}}
            />
          </View>
          {/* name  */}
          <View className="flex flex-col gap-y-1">
            <Text
              className="text-black"
              style={{fontFamily: 'Montserrat-Bold'}}>
              {' '}
              {data?.postedBy?.username}
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
            {data?.images?.map((image: any) => (
              <View
                style={{alignItems: 'center', backgroundColor: '#fff'}}
                key={image?.url}>
                <Image
                  style={{width: responsiveWidth(85), height: 200}}
                  // source={require('../../../assets/images/user-profile.jpg')}
                  source={{uri: image?.url}}
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
          <RenderHTML
            contentWidth={width}
            source={{html: generateHtmlPreview()}}
            baseStyle={{
              color: 'black',
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.75),
              lineHeight: 18.5,
            }}
            systemFonts={systemFonts}
          />
        </View>
        {/* skills required  */}
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            Skills
          </Text>

          <View style={{padding: responsiveHeight(1)}}>
            <FlatList
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              data={[
                'Plumbing Repair',
                'Teaching',
                'Pipe Fitting',
                'Troubleshooting',
                'Customer Service',
              ]}
              renderItem={({item}) => {
                return (
                  <View
                    style={{marginBottom: responsiveHeight(0.2)}}
                    className="border-color2 border-solid border-[1px] mr-2 py-1 px-2 rounded-md">
                    <Text
                      className="text-black"
                      style={{
                        fontSize: responsiveFontSize(1.75),
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
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
            I will start from Rs.{''}
            <Text className="text-black font-bold"> {data?.price}</Text> for
            this gig.
          </Text>
          <Text
            className="text-red-500 mt-2 leading-4"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            Please be aware that pricing may vary depending on the complexity
            and scale of the job. However, we believe in transparent pricing and
            ensuring that you receive the best value for your investment
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
      <View className="w-[100%] flex flex-row justify-between px-8 pb-2">
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
            {data?.category}
          </Text>
        </View>

        <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()}>
          <AntDesign name="closecircle" size={20} color="red" className="p-5" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataArray}
        keyExtractor={(item, index) => index.toString()}
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
