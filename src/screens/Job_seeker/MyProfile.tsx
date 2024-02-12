import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IconIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Cards from '../GlobalComponents/Cards';
import {data} from './Home';
import {DrawerStackParamsListSeeker} from '../../navigation/DrawerStackSeeker';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MyProfileProps {
  navigation: DrawerNavigationProp<DrawerStackParamsListSeeker>;
}

const MyProfile = ({navigation}: MyProfileProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNextItemPress = () => {
    var nextIndex = (currentIndex + 1) % data.length;
    if (nextIndex === 5) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  return (
    <ScrollView className="bg-white">
      <View
        className="w-[95%] flex flex-col"
        style={{padding: responsiveHeight(2)}}>
        {/* back button */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View className="mb-2 flex flex-row items-center gap-x-2">
            <IconIcons name="arrow-back" size={30} color="gray" />
            <Text
              className="text-gray-500"
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: responsiveHeight(2),
              }}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
        {/* for profile pic and simple details */}
        <View className="flex flex-row gap-x-5 items-center">
          {/* profile pic  */}
          <View>
            <Image
              source={{uri: "https://randomuser.me/api/portraits/men/82.jpg"}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: '#79AC78',
              }}
            />
          </View>
          {/* simple details start */}
          <View
            className="flex flex-col gap-y-2"
            style={{width: responsiveWidth(60)}}>
            <View className="flex flex-row gap-x-2 items-center">
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveHeight(3),
                }}>
                Anil Bhandari
              </Text>
              <MaterialIcons name="verified" size={17} color={'green'} />
            </View>
            <View className="flex flex-row gap-x-1">
              {/* star  */}
              <IconIcons name="star" size={17} color="gray" />
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(2),
                }}>
                4.9
              </Text>
            </View>
            {/* bio */}
            <Text
              className="text-black tracking-wide leading-5"
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: responsiveHeight(1.75),
              }}>
              Creativity will help your dreams to be true!!!
            </Text>
            <View className="flex flex-row gap-x-1">
              <IconIcons name="location-outline" size={17} color="#79AC78" />
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveHeight(1.75),
                }}>
                Damak
              </Text>
            </View>
          </View>
          {/* simple details end  */}
        </View>
        {/* buttons  */}
        <View
          className="flex flex-row items-center justify-between gap-x-2"
          style={{marginTop: responsiveHeight(4)}}>
          <View className="py-2 px-5 bg-color2 rounded-md flex flex-row items-center gap-x-1">
            <FontAwesome name="edit" size={17} color="white" />
            <Text
              className=""
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: responsiveHeight(1.75),
                color: 'white',
              }}>
              Edit Profile
            </Text>
          </View>
          <View className="py-2 px-5 bg-color2 rounded-md flex flex-row items-center gap-x-1">
            {/* <FontAwesome name="share-square-o" size={17} color="white" /> */}
            <Text
              className=""
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: responsiveHeight(1.75),
                color: 'white',
              }}>
              Share Profile
            </Text>
          </View>
          <View className="py-2 px-3 bg-color2 rounded-md flex flex-row items-center gap-x-1">
            <IconIcons name="settings" size={17} color={'white'} />
          </View>
        </View>
        {/* other details */}
        <View className="mt-6">
          {/* about me  */}
          <View className="flex flex-col gap-y-2">
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveHeight(2),
              }}>
              About me
            </Text>
            <Text
              className="text-black tracking-wide"
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: responsiveHeight(1.75),
              }}>
              Hi! This is Mahfuj ahmed. 5 years experience in design. Graphic
              designer proficient using Adobe Illustrator and Adobe Photoshop. I
              enjoy creating print-based and web based projects such as Logo,
              Business cards, Flyer, Brochure, Poster, Banner Ads, and also
              UI/UX design. I look forward to working with you....
            </Text>
          </View>
          {/* skills  */}
          <View className="mt-6">
            <Text
              className="text-black"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: responsiveHeight(2),
              }}>
              Skills
            </Text>
            <View>
              <View style={{padding: responsiveHeight(1)}}>
                <FlatList
                  horizontal={true}
                  data={[
                    {key: 'Tokyo'},
                    {key: 'Delhi'},
                    {key: 'Shanghai'},
                    {key: 'Sao Paolo'},
                    {key: 'Mexico City'},
                  ]}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{marginBottom: responsiveHeight(1)}}
                        className="bg-gray-300 mr-2 py-1 px-2 rounded-md">
                        <Text
                          className="text-black"
                          style={{
                            fontSize: responsiveFontSize(1.75),
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          {item.key}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        {/* gigs show  */}
        <View className="flex flex-col gap-y-2">
          <Text
            className="text-black"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: responsiveHeight(2),
            }}>
            My Gigs
          </Text>
          <View>
            {/* gigs card start  */}
            <FlatList
              horizontal={true}
              keyExtractor={item => item.id.toString()}
              initialNumToRender={5}
              data={data.slice(currentIndex, currentIndex + 5)}
              renderItem={({item}) => (
                <View style={{width: responsiveWidth(90)}}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      // setSelectedData(item);
                      // handlePresentModalPress();
                    }}>
                    <Cards data={item} />
                  </TouchableWithoutFeedback>
                </View>
              )}
              contentContainerStyle={{
                paddingBottom: responsiveHeight(2),
                paddingTop: responsiveHeight(2),
              }}></FlatList>
            <TouchableOpacity
              className="bg-color2 py-2 flex items-center justify-center rounded-md mb-3"
              onPress={handleNextItemPress}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveHeight(2),
                  color: 'white',
                }}>
                Next
              </Text>
            </TouchableOpacity>
            {/* gits card end  */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyProfile;
