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
import Search from '../GlobalComponents/Search';
import Cards from '../GlobalComponents/Cards';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottonSheetCardSeeker from './BottonSheetCardSeeker';
import {DrawerStackParamsListSeeker} from '../../navigation/DrawerStackSeeker';
import {FetchJobStore} from './helper/FetchJobStore';
import CardLoader from '../GlobalComponents/CardLoader';
import Geolocation from 'react-native-geolocation-service';
import {ErrorToast} from '../../components/ErrorToast';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomStackParamsList} from '../../navigation/ButtonNavigatorSeeker';

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
  totalPages?: number;
  currentPage?: number;
  nearBy: JobDetails[];
  recommendJobsList?: JobDetails[];
}
export const data: dataProps[] = [
  {
    id: 1,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 2,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 3,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 4,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 5,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 6,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 7,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
  {
    id: 8,
    what: 'something',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nisi officiis culpa, vitae tenetur corrupti. Beatae necessitatibus unde facere sequi libero perspiciatis, hic recusandae nulla a quas nostrum quidem voluptate?',
  },
];

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
    requestLocationPermission();
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
          <View style={{marginTop: responsiveHeight(3)}}>
            <Search text={'Home'} user={user} />
          </View>
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
                keyExtractor={item => item._id.toString()}
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
                showsVerticalScrollIndicator={false}></FlatList>
            )}
            {/* Most Recent  */}
            {!isLoading && currentTab === 'Most Recent' && (
              <FlatList
                keyExtractor={item => item._id.toString()}
                data={jobDetails?.job}
                renderItem={({item}) => <Cards data={item} user={user} />}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(1),
                }}
                showsVerticalScrollIndicator={false}></FlatList>
            )}
            {/* Near by Work */}
            {!isLoading && currentTab === 'Nearby' && (
              <FlatList
                keyExtractor={item => item._id.toString()}
                initialNumToRender={5}
                data={nearByJobDetails?.nearBy?.slice(0, 5)}
                renderItem={({item}) => <Cards data={item} user={user} />}
                contentContainerStyle={{
                  paddingBottom: responsiveHeight(50),
                  paddingTop: responsiveHeight(1),
                }}
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
