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
import Review from '../GlobalComponents/Review';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {systemFonts} from '../GlobalComponents/Cards';

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

const BottonSheetCardSeeker = ({bottomSheetModalRef, data}: any) => {
  // Convert the single data into an array
  const dataArray = data ? [data] : [];

  console.log(dataArray);

  const {width} = useWindowDimensions();

  const generateHtmlPreview = () => {
    let html = `<p style="color: black;">${data?.job_description}</p>`;
    html = html.replace(/\n/g, '<br/>');
    return html;
  };

  const renderItem = ({item}: any) => (
    <View>
      {/* main body starts  */}
      <View className="flex flex-col gap-y-4 p-8">
        {/* title  */}
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            {data?.title}
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

        {/* about the job  */}
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            About this Job
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

        {/* skills required */}
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            Skills Required
          </Text>

          <View style={{padding: responsiveHeight(1)}}>
            <FlatList
              horizontal={true}
              data={data?.skills_required}
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

        <View className="flex flex-col">
          <Text
            className="text-black mb-2"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            Payment
          </Text>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: responsiveFontSize(1.75),
            }}>
            Payment Starts from Rs.{' '}
            <Text className="text-black font-bold">{data?.price}</Text>
          </Text>
          <Text
            className="text-red-500 mt-2 leading-4"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            Payment varies based on experience, qualifications, and project
            scope. Contact the job provider for details before applying. Thank
            you for your proactive approach
          </Text>
        </View>

        {/* Payment method */}
        <View>
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            Payment Method
          </Text>

          <View style={{padding: responsiveHeight(1)}}>
            <FlatList
              horizontal={true}
              data={data?.payment_method}
              renderItem={({item}) => {
                return (
                  <View
                    style={{marginBottom: responsiveHeight(0.2)}}
                    className=" border-color2 border-solid border-[1px] mr-2 py-1 px-2 rounded-md">
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
            For more Details
          </Text>
          <View className="flex flex-row pt-2 items-center justify-around">
            <TouchableOpacity>
              <Text
                className="text-white py-2 px-5 bg-color2 rounded-md"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveFontSize(1.75),
                }}>
                Apply Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                className="text-white py-2 px-5 bg-color2 rounded-md"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveFontSize(1.75),
                }}>
                Get Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row gap-x-2">
          <Text
            className="text-black mt-2 leading-4"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            Time Remaining for this Job
          </Text>
          <Text
            className="text-red-500 mt-2 leading-4"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(2),
            }}>
            1d 2h 3m
          </Text>
        </View>

        {/* REview */}
        <View className="flex flex-col">
          <Text
            className="text-black mb-3"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(2),
            }}>
            Seller Reviews
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

export default BottonSheetCardSeeker;
