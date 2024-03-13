import {View, Text, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IonIcons from 'react-native-vector-icons/Ionicons';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
export const systemFonts = [
  ...defaultSystemFonts,
  'Montserrat-Regular',
  'Montserrat-SemiBold',
  'Montserrat-Bold',
  'Montserrat-Medium',
];

const Cards = ({data, user}: any) => {
  const {width} = useWindowDimensions();

  const generateHtmlPreview = () => {
    let html = `<p style="color: black;">${
      user && user?.role === 'job_seeker'
        ? data?.job_description
        : data?.gig_description
    }</p>`;
    html = html.replace(/\n/g, '<br/>');
    return html;
  };

  return (
    <View className="p-4 shadow-2xl flex flex-col bg-white">
      <View className="flex flex-row gap-x-4">
        {/* image  */}
        <View>
          {data && data?.postedBy?.profilePic?.url && (
            <Image
              // source={require('../../../assets/images/user-profile.jpg')}
              source={{uri: data?.postedBy?.profilePic.url}}
              style={{height: 40, width: 40, borderRadius: 40}}
            />
          )}
        </View>
        {/* text  */}
        <View className="flex flex-col gap-y-1">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveFontSize(1.75),
            }}>
            {data?.title}
          </Text>
          <Text
            className="text-black ml-1"
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: responsiveFontSize(1.5),
            }}>
            {data?.postedBy?.username}
          </Text>
          {user && user?.role === 'job_seeker' ? (
            <>
              <View className="flex flex-row gap-x-1 mt-2">
                <IonIcons name="location-outline" size={15} color="#79AC78" />
                <Text
                  className="text-color2"
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: responsiveFontSize(1.5),
                  }}>
                  {data?.location}
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
      <View
        className=""
        style={{
          width: responsiveWidth(82.75),
        }}>
        <RenderHtml
          contentWidth={width}
          source={{html: generateHtmlPreview()}}
          baseStyle={{
            color: 'black',
            fontFamily: 'Montserrat-Regular',
            fontSize: responsiveFontSize(1.5),
            lineHeight: 18.5,
            height: responsiveHeight(21.85),
          }}
          // tagsStyles={{
          //   p: {color: 'red', fontFamily: 'Montserrat-Bold'},
          // }}
          systemFonts={systemFonts}
        />
      </View>
      <View></View>
    </View>
  );
};

export default Cards;
