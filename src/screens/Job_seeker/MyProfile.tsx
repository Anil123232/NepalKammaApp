import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
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
import {userStateProps} from './Home';
import {useGlobalStore} from '../../global/store';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import EditProfile from './EditProfile';
import {GigData, initialGigData, getJobProps} from '../Job_provider/Home';
import {FetchGigStore} from '../Job_provider/helper/FetchGigStore';
import CardLoader from '../GlobalComponents/CardLoader';
import DocumentVerify from '../GlobalComponents/DocumentVerify';
import {axios_auth} from '../../global/config';
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {SuccessToast} from '../../components/SuccessToast';
import {ErrorToast} from '../../components/ErrorToast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

interface MyProfileProps {
  navigation: DrawerNavigationProp<DrawerStackParamsListSeeker>;
}

const MyProfileComponent = ({navigation}: MyProfileProps) => {
  const {user, checkAuth} = useGlobalStore();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gigDetails, setgigDetails] = React.useState<GigData>(initialGigData);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [currentTab, setCurrentTab] = React.useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const handleNextItemPress = () => {
    var nextIndex = (currentIndex + 1) % data.length;
    if (nextIndex === 2) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  //get all job details
  const getGigDetails = async () => {
    const response = await (FetchGigStore.getState() as getJobProps).getGig();
    setgigDetails(response);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getGigDetails();
  }, []);

  const updateProfilePic = async (imageData: any) => {
    setIsUploadingImage(true);
    try {
      if (!imageData.uri) {
        throw new Error('No image URI provided');
      }

      const formData = new FormData();
      formData.append('file', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.fileName || 'photo.jpg',
      });

      const response = await axios_auth.put('/user/update-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        ErrorToast('Failed to update profile picture');
        // throw new Error('Failed to update profile picture');
      }

      checkAuth();
      SuccessToast(response.data.message);
      setIsUploadingImage(false);
    } catch (error) {
      // console.error('Error updating profile picture:', error);
      // throw error;
      ErrorToast('Failed to update profile picture');
    }
  };

  const handleImagePicker = () => {
    const options: any = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        console.log(response);
        updateProfilePic(response.assets[0]);
      }
    });
  };

  return (
    <React.Fragment>
      <View
        className="w-[100%] flex flex-col"
        style={{padding: responsiveHeight(2)}}>
        {/* back button */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View className="mb-2 flex flex-row items-center gap-x-2">
            <IconIcons name="chevron-back-sharp" size={30} color="gray" />
          </View>
        </TouchableOpacity>
        {/* for profile pic and simple details */}
        <View className="flex flex-row gap-x-5 items-center">
          {/* profile pic  */}
          <View>
            {isUploadingImage ? (
              <ShimmerPlaceHolder
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100 / 2,
                  overflow: 'hidden',
                  borderWidth: 2,
                  borderColor: '#79AC78',
                }}
              />
            ) : (
              <View className="relative">
                <Image
                  source={{uri: user?.profilePic.url}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100 / 2,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: '#79AC78',
                  }}
                />
                <TouchableOpacity
                  onPress={handleImagePicker}
                  style={{
                    position: 'absolute',
                    top: '80%',
                    left: '75%',
                  }}>
                  <MaterialCommunityIcons
                    name="image-edit"
                    size={20}
                    color="green"
                  />
                </TouchableOpacity>
              </View>
            )}
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
                {user?.username}
              </Text>
              <MaterialIcons name="verified" size={20} color={'green'} />
            </View>
            <View>
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveHeight(1.5),
                }}>
                {user?.title}
              </Text>
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
              {user?.bio}
            </Text>
            <View className="flex flex-row gap-x-1">
              <IconIcons name="location-outline" size={17} color="#79AC78" />
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveHeight(1.75),
                }}>
                {user?.location}
              </Text>
            </View>
          </View>
          {/* simple details end  */}
        </View>
        {/* buttons  */}
        <View
          className="flex flex-row items-center justify-between gap-x-2"
          style={{marginTop: responsiveHeight(4)}}>
          <TouchableOpacity
            onPress={() => {
              setCurrentTab('edit-profile');
              handlePresentModalPress();
            }}>
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
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => {
              setCurrentTab('other-tab');
              handlePresentModalPress();
            }}>
            <View className="py-2 px-3 bg-color2 rounded-md flex flex-row items-center gap-x-1">
              <IconIcons name="settings" size={17} color={'white'} />
            </View>
          </TouchableOpacity>
        </View>
        {/* other details */}
        <View className="mt-6 pr-[-3px]">
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
              className="text-black tracking-wide mb-3"
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: responsiveHeight(1.75),
              }}>
              {user?.about_me}
            </Text>
            <View className="border-red-500 border-solid border-[1px] mr-2 py-1 px-2 rounded-md items-center justify-center">
              <Text
                className="text-black tracking-wide"
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: responsiveHeight(1.75),
                }}>
                {user?.email}
              </Text>
            </View>
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
                  data={user?.skills}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{marginBottom: responsiveHeight(1)}}
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
            {isLoading && (
              <FlatList
                data={[1, 1]}
                renderItem={({item, index}) => <CardLoader />}
              />
            )}

            {!isLoading && (
              <FlatList
                horizontal={true}
                keyExtractor={item => item._id.toString()}
                // initialNumToRender={2}
                data={gigDetails?.gig?.slice(currentIndex, currentIndex + 1)}
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
                  paddingTop: responsiveHeight(0.2),
                }}></FlatList>
            )}
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        style={{
          backgroundColor: 'white',
          borderRadius: 24,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 20,
          },
          shadowOpacity: 0.8,
          shadowRadius: 24,
          elevation: 30,
          flex: 1,
          overflow: 'scroll',
        }}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        {/* <View className="flex flex-1 items-center rounded-t-2xl"> */}
        {currentTab === 'edit-profile' ? (
          <EditProfile bottomSheetModalRef={bottomSheetModalRef} />
        ) : (
          <DocumentVerify bottomSheetModalRef={bottomSheetModalRef} />
        )}
        {/* </View> */}
      </BottomSheetModal>
    </React.Fragment>
  );
};

const MyProfile = ({navigation}: MyProfileProps) => {
  return (
    <BottomSheetModalProvider>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={[
          {
            key: 'form-key',
            component: <MyProfileComponent navigation={navigation} />,
          },
        ]}
        renderItem={({item}) => item.component}
      />
    </BottomSheetModalProvider>
  );
};

export default MyProfile;
