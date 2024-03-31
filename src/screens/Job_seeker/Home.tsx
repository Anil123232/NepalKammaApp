import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useGlobalStore} from '../../global/store';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import TopNav from '../GlobalComponents/TopNav';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Cards from '../GlobalComponents/Cards';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottonSheetCardSeeker from './BottonSheetCardSeeker';
import {DrawerStackParamsListSeeker} from '../../navigation/DrawerStackSeeker';
import {FetchJobStore} from './helper/FetchJobStore';
import CardLoader from '../GlobalComponents/Loader/CardLoader';
import Geolocation from 'react-native-geolocation-service';
import {ErrorToast} from '../../components/ErrorToast';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigatorSeeker';
import {useSocket} from '../../contexts/SocketContext';
import {useMessageStore} from '../../global/MessageCount';
import {useIsFocused} from '@react-navigation/native';
import useLocationStore from '../../global/useLocationStore';
import HomeSearch from '../GlobalComponents/HomeSearch';

interface profileProps {
  navigation: DrawerNavigationProp<DrawerStackParamsListSeeker>;
  bottomNavigation: BottomTabNavigationProp<BottomStackParamsList>;
}

export type userStateProps = {
  __v: number;
  _id: string;
  email: string;
  isVerified: boolean;
  role: string;
  username: string;
  location: string;
  profilePic: any;
  title: string;
  skills: any[];
  isTick: boolean;
  bio: string;
  about_me: string;
  phoneNumber: string;
  isDocumentVerified: string;
};

type dataProps = {
  id: number;
  what: string;
  text: string;
};

export interface JobDetails {
  _id: string;
  category: string;
  createdAt: string;
  job_description: string;
  location: string;
  payment_method: any[];
  phoneNumber: string;
  postedBy: any;
  price: number;
  skills_required: any[];
  title: string;
  updatedAt: string;
  latitude: number;
  longitude: number;
}

export interface JobData {
  job: JobDetails[];
  totalJobs?: number;
  totalPages?: number;
  currentPage?: number;
  nearBy: JobDetails[];
  recommendJobsList?: JobDetails[];
}

export interface getJobProps {
  getJob: (page: number, limit: number) => Promise<JobData>;
  getNearbyJob: (latitude: number, longitude: number) => Promise<JobData>;
  getJobRecommendation: () => Promise<JobData>;
}

export const initialJobData: JobData = {
  job: [],
  totalPages: 1,
  currentPage: 1,
  nearBy: [],
  recommendJobsList: [],
};

export interface myLocationProps {
  latitude: number;
  longitude: number;
}

const Home = ({navigation, bottomNavigation}: profileProps) => {
  const user: userStateProps = useGlobalStore((state: any) => state.user);
  const setLocation = useLocationStore((state: any) => state.setLocation);
  const isFocused = useIsFocused();
  const [currentTab, setCurrentTab] = React.useState<string>('Best Matches');
  const [selectedData, setSelectedData] = React.useState<any>(null);
  const [jobDetails, setJobDetails] = React.useState<JobData>(initialJobData);
  const [nearByJobDetails, setNearByJobDetails] =
    React.useState<JobData>(initialJobData);
  const [recommendedJob, setRecommendedJob] =
    React.useState<JobData>(initialJobData);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [myLocation, setMyLocation] = React.useState<myLocationProps>({
    latitude: 0,
    longitude: 0,
  });

  const socket = useSocket();

  const readUnreadMessage = async () => {
    await (useMessageStore.getState() as any).unreadMessageCount();
  };

  useEffect(() => {
    if (socket) {
      socket?.emit('addUser', {
        username: user?.username,
        userId: user?._id,
      });
    }
  }, [socket]);

  useEffect(() => {
    const messageListener = ({sender, message, conversationId}: any) => {
      useMessageStore.setState(state => ({
        messageCount: state.messageCount + 1,
      }));
      console.log('hello');
    };

    socket?.on('textMessageFromBack', messageListener);

    return () => {
      socket?.off('textMessageFromBack', messageListener);
    };
  }, [socket]);

  const Drawer = createDrawerNavigator();

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
  const getJobDetails = async () => {
    const response = await (FetchJobStore.getState() as getJobProps).getJob(
      1,
      5,
    );
    setJobDetails(response);
    // setIsLoading(false);
  };

  //get near by job
  const getNearbyJob = async (latitude: number, longitude: number) => {
    const response = await (
      FetchJobStore.getState() as getJobProps
    ).getNearbyJob(latitude, longitude);
    setNearByJobDetails(response);
  };

  //get recommended job
  const getRecommendedJob = async () => {
    const response = await (
      FetchJobStore.getState() as getJobProps
    ).getJobRecommendation();
    setRecommendedJob(response);
  };

  useEffect(() => {
    if (isFocused) {
      readUnreadMessage();
      requestLocationPermission();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'NepalKamma App Location Permission',
          message: 'NepalKamma App needs access to your Location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setMyLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLocation(position.coords.latitude, position.coords.longitude);
            getJobDetails();
            getNearbyJob(position.coords.latitude, position.coords.longitude);
            getRecommendedJob();
            setIsLoading(false);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err: any) {
      ErrorToast(err.message);
    }
  };

  return (
    <BottomSheetModalProvider>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          paddingTop: responsiveHeight(16),
        }}>
        <View className="w-[95%]" style={{padding: responsiveHeight(2)}}>
          {/* top nav  */}
          <TopNav props={navigation} user={user} />
          {/* description start */}
          <View
            className="flex flex-col gap-y-1"
            style={{marginTop: responsiveHeight(3)}}>
            <View>
              <Text
                className="text-gray-500"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: responsiveFontSize(2),
                }}>
                Discover
              </Text>
            </View>
            <View>
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: responsiveFontSize(2),
                }}>
                Job and earn money
              </Text>
            </View>
          </View>
          {/* description end  */}
          {/* search  */}
          <TouchableOpacity
            onPress={() =>
              bottomNavigation.navigate('explore', {
                id: 'explore',
              })
            }>
            <View style={{marginTop: responsiveHeight(3)}}>
              <HomeSearch text={'Home'} user={user} />
            </View>
          </TouchableOpacity>
          {/* body start */}
          <View style={{marginTop: responsiveHeight(3)}}>
            {/* text start */}
            <View className="flex flex-row items-center justify-between">
              {/* best matches */}
              <View
                className={`w-[33.33%] py-3 ${
                  currentTab === 'Best Matches' && 'border-b-2 border-color2'
                } items-center  `}>
                <TouchableOpacity onPress={() => setCurrentTab('Best Matches')}>
                  <Text
                    className={
                      currentTab === 'Best Matches'
                        ? 'text-color2'
                        : 'text-gray-500'
                    }
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    Best Matches
                  </Text>
                </TouchableOpacity>
              </View>
              {/* most recent  */}
              <View
                className={`w-[33.33%] py-3 ${
                  currentTab === 'Most Recent' && 'border-b-2 border-color2'
                } items-center `}>
                <TouchableOpacity onPress={() => setCurrentTab('Most Recent')}>
                  <Text
                    className={
                      currentTab === 'Most Recent'
                        ? 'text-color2'
                        : 'text-gray-500'
                    }
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    Most Recent
                  </Text>
                </TouchableOpacity>
              </View>
              {/* near by work  */}
              <View
                className={`w-[33.33%] items-center justify-center flex py-3 ${
                  currentTab === 'Nearby' && 'border-b-2 border-color2'
                } items-center `}>
                <TouchableOpacity onPress={() => setCurrentTab('Nearby')}>
                  <Text
                    className={
                      currentTab === 'Nearby' ? 'text-color2' : 'text-gray-500'
                    }
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    Nearby Jobs
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* text end  */}

            {/* Best Matches  */}
            {isLoading && (
              <FlatList
                data={[1, 1, 1, 1, 1]}
                renderItem={({item, index}) => <CardLoader />}
              />
            )}
            {!isLoading && currentTab === 'Best Matches' && (
              <FlatList
                keyExtractor={item => item._id?.toString() || ''}
                data={recommendedJob?.recommendJobsList?.slice(0, 5)}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedData(item);
                      handlePresentModalPress();
                    }}>
                    <Cards data={item} user={user} />
                  </TouchableWithoutFeedback>
                )}
                ListEmptyComponent={() => (
                  // Render this component when there's no data
                  <View style={{paddingBottom: responsiveHeight(25)}}>
                    <Text
                      className="text-red-500"
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: responsiveFontSize(1.75),
                      }}>
                      No recommended jobs available
                    </Text>
                    <Text
                      className="text-color2"
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: responsiveFontSize(1.75),
                      }}>
                      Complete your profile to get recommended jobs
                    </Text>
                  </View>
                )}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(1),
                }}
                ListFooterComponent={
                  <View style={{height: 50, backgroundColor: 'white'}} />
                }
                showsVerticalScrollIndicator={false}></FlatList>
            )}
            {/* Most Recent  */}
            {!isLoading && currentTab === 'Most Recent' && (
              <FlatList
                keyExtractor={item => item._id.toString()}
                data={jobDetails?.job}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedData(item);
                      handlePresentModalPress();
                    }}>
                    <Cards data={item} user={user} />
                  </TouchableWithoutFeedback>
                )}
                ListEmptyComponent={() => (
                  // Render this component when there's no data
                  <View style={{paddingBottom: responsiveHeight(25)}}>
                    <Text
                      className="text-red-500"
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: responsiveFontSize(1.75),
                      }}>
                      No jobs available
                    </Text>
                  </View>
                )}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(1),
                }}
                ListFooterComponent={
                  <View style={{height: 50, backgroundColor: 'white'}} />
                }
                showsVerticalScrollIndicator={false}></FlatList>
            )}
            {/* Near by Work */}
            {!isLoading && currentTab === 'Nearby' && (
              <FlatList
                keyExtractor={item => item._id.toString()}
                initialNumToRender={5}
                data={nearByJobDetails?.nearBy?.slice(0, 5)}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedData(item);
                      handlePresentModalPress();
                    }}>
                    <Cards data={item} user={user} />
                  </TouchableWithoutFeedback>
                )}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(1),
                }}
                ListFooterComponent={
                  <View style={{height: 50, backgroundColor: 'white'}} />
                }
                showsVerticalScrollIndicator={false}></FlatList>
            )}

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
              <BottonSheetCardSeeker
                bottomSheetModalRef={bottomSheetModalRef}
                data={selectedData}
                navigation={bottomNavigation}
              />
              {/* </View> */}
            </BottomSheetModal>
          </View>
          {/* body end  */}
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Home;
